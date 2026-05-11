/**
 * sounds.js
 * Tiny WebAudio sound-effect generator — no external assets.
 *
 * Why WebAudio instead of bundled mp3s?
 *  - Zero bytes in the bundle (keeps widget.js small)
 *  - Perfect pitch / volume tuning per event
 *  - No CORS / autoplay restrictions once an AudioContext is resumed
 *
 * Events:
 *   play('send')    — short ascending blip (user sent a message)
 *   play('receive') — soft two-tone ping (assistant reply arrived)
 *   play('error')   — low descending buzz (failure)
 *
 * The controller is fully no-op when muted, when WebAudio is unavailable, or
 * before the first user gesture (required by autoplay policy — it will
 * gracefully start working after the first click, which in our UX always
 * happens when the user opens the widget).
 */

export function createSoundController({ enabled = false, volume = 0.18 } = {}) {
  let ctx = null;
  let muted = !enabled;
  let initialized = false;

  function ensureCtx() {
    if (ctx || muted) return ctx;
    const AC = typeof window !== 'undefined'
      ? (window.AudioContext || window.webkitAudioContext)
      : null;
    if (!AC) return null;
    try {
      ctx = new AC();
      initialized = true;
    } catch {
      ctx = null;
    }
    return ctx;
  }

  function envelope(node, peak, attack, decay, startTime) {
    node.gain.setValueAtTime(0, startTime);
    node.gain.linearRampToValueAtTime(peak, startTime + attack);
    node.gain.exponentialRampToValueAtTime(0.0001, startTime + attack + decay);
  }

  function tone({ freq, type = 'sine', duration = 0.12, peak = volume, glideTo = null }) {
    if (!ensureCtx()) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      
      const t0 = ctx.currentTime + 0.015; // Schedule slightly ahead

      osc.frequency.setValueAtTime(freq, t0);
      if (typeof glideTo === 'number') {
        osc.frequency.exponentialRampToValueAtTime(glideTo, t0 + duration);
      }
      
      envelope(gain, peak, 0.01, duration, t0);
      
      osc.connect(gain).connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + duration + 0.05);
    } catch (e) {
      console.error('[sounds] tone error:', e);
      // Silent — sound is a nice-to-have, never break the UX.
    }
  }

  function play(kind) {
    if (muted) return;
    if (!ensureCtx()) return;
    // Resume if suspended (some browsers suspend the ctx between tabs)
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    switch (kind) {
      case 'send':
        tone({ freq: 620, glideTo: 880, duration: 0.13, peak: volume * 0.8 });
        break;
      case 'receive':
        tone({ freq: 880, type: 'sine', duration: 0.08, peak: volume * 0.7 });
        setTimeout(() => tone({ freq: 1174, type: 'sine', duration: 0.12, peak: volume * 0.85 }), 70);
        break;
      case 'error':
        tone({ freq: 240, glideTo: 140, type: 'triangle', duration: 0.22, peak: volume * 0.9 });
        break;
    }
  }

  function setMuted(flag) {
    muted = !!flag;
  }

  function destroy() {
    if (ctx && initialized) {
      try { ctx.close(); } catch {}
    }
    ctx = null;
  }

  return { play, setMuted, isMuted: () => muted, destroy };
}
