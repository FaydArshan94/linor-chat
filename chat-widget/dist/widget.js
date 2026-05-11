var ft=Object.defineProperty,bt=Object.defineProperties;var mt=Object.getOwnPropertyDescriptors;var me=Object.getOwnPropertySymbols;var ht=Object.prototype.hasOwnProperty,yt=Object.prototype.propertyIsEnumerable;var he=(H,B,W)=>B in H?ft(H,B,{enumerable:!0,configurable:!0,writable:!0,value:W}):H[B]=W,$=(H,B)=>{for(var W in B||(B={}))ht.call(B,W)&&he(H,W,B[W]);if(me)for(var W of me(B))yt.call(B,W)&&he(H,W,B[W]);return H},V=(H,B)=>bt(H,mt(B));(function(){"use strict";const H={botName:"Assistant",primaryColor:"#6366f1",welcomeMessage:"Hi! How can I help you today?",position:"bottom-right",offsetX:24,offsetY:24,zIndex:2147483647,buttonSize:56,windowWidth:380,windowHeight:580,hideAttribution:!1,avatarUrl:null,apiKey:null,apiUrl:null,sessionTtlHours:24,maxRetries:3,requestTimeoutMs:3e4,defaultSuggestions:["Book an appointment","Working hours","Services offered","Contact info"],enableVoice:!0,enableTTS:!0,ttsDefaultOn:!1,voiceLang:"en-US",enableSounds:!0,soundVolume:.18};function B(t){const e=t.replace("#",""),a=e.length===3?e.split("").map(n=>n+n).join(""):e,r=/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return r?[parseInt(r[1],16),parseInt(r[2],16),parseInt(r[3],16)].join(", "):"99, 102, 241"}function W(t){const e=typeof window!="undefined"&&window.__AI_WIDGET_CONFIG__?window.__AI_WIDGET_CONFIG__:{},a=typeof window!="undefined"&&window.LinorConfig?window.LinorConfig:{},r={};if(t){const o=_=>t.getAttribute(`data-${_}`),c=_=>{const S=parseInt(o(_),10);return isNaN(S)?void 0:S};o("api-key")&&(r.apiKey=o("api-key")),o("api-url")&&(r.apiUrl=o("api-url")),o("bot-name")&&(r.botName=o("bot-name")),o("primary-color")&&(r.primaryColor=o("primary-color")),o("welcome-message")&&(r.welcomeMessage=o("welcome-message")),o("position")&&(r.position=o("position")),o("avatar-url")&&(r.avatarUrl=o("avatar-url")),o("hide-attribution")&&(r.hideAttribution=o("hide-attribution")!=="false");const x=c("offset-x");x!==void 0&&(r.offsetX=x);const p=c("offset-y");p!==void 0&&(r.offsetY=p);const b=c("z-index");b!==void 0&&(r.zIndex=b);const i=c("button-size");i!==void 0&&(r.buttonSize=i);const u=c("window-width");u!==void 0&&(r.windowWidth=u);const h=c("window-height");h!==void 0&&(r.windowHeight=h);const g=c("session-ttl-hours");g!==void 0&&(r.sessionTtlHours=g);const w=c("max-retries");w!==void 0&&(r.maxRetries=w);const k=c("request-timeout-ms");k!==void 0&&(r.requestTimeoutMs=k);const A=o("default-suggestions");A!=null&&(r.defaultSuggestions=A.split("|").map(_=>_.trim()).filter(Boolean).slice(0,4)),o("enable-voice")!=null&&(r.enableVoice=o("enable-voice")!=="false"),o("enable-tts")!=null&&(r.enableTTS=o("enable-tts")!=="false"),o("tts-default-on")!=null&&(r.ttsDefaultOn=o("tts-default-on")!=="false"),o("enable-sounds")!=null&&(r.enableSounds=o("enable-sounds")!=="false"),o("voice-lang")&&(r.voiceLang=o("voice-lang"))}const n=$($($($({},H),e),a),r);return["bottom-right","bottom-left","top-right","top-left"].includes(n.position)||(console.warn(`[AI Widget] Invalid position "${n.position}". Falling back to "bottom-right".`),n.position="bottom-right"),n.primaryRgb=B(n.primaryColor),n.apiKey||console.warn("[AI Widget] Missing api-key. Widget will be disabled. Set data-api-key on the script tag or window.LinorConfig.apiKey."),n.apiUrl||console.warn("[AI Widget] Missing api-url. Widget will be disabled. Set data-api-url on the script tag or window.LinorConfig.apiUrl."),n}function ye(t){let e=$({},t);const a=new Set;return{getState(){return e},setState(r){const n=e,s=typeof r=="function"?r(e):r;e=$($({},e),s),a.forEach(o=>o(e,n))},subscribe(r){return a.add(r),()=>a.delete(r)}}}function xe(t,e=[],a={}){return $({isOpen:!1,messages:e,status:"idle",error:null,sessionId:t,unreadCount:0,voiceState:"idle",ttsEnabled:!1,interimTranscript:"",sttSupported:!1,ttsSupported:!1,online:!0,transferState:"none",agentName:null},a)}const X={get(t){try{const e=localStorage.getItem(t);return e!==null?JSON.parse(e):null}catch(e){return null}},set(t,e){try{return localStorage.setItem(t,JSON.stringify(e)),!0}catch(a){return!1}},remove(t){try{localStorage.removeItem(t)}catch(e){}},isAvailable(){try{const t="__ai_widget_test__";return localStorage.setItem(t,"1"),localStorage.removeItem(t),!0}catch(t){return!1}}};function q(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`}function we(){return`sess_${q()}`}function ve(t,e){const a=`ai_widget_session_${t}`,r=e*60*60*1e3;function n(s){return Date.now()-s>r}return{load(){const s=X.get(a);return s?n(s.lastActive)?(X.remove(a),null):{sessionId:s.sessionId,messages:Array.isArray(s.messages)?s.messages:[]}:null},save(s,o){X.set(a,{sessionId:s,messages:o,lastActive:Date.now()})},clear(){X.remove(a)},createNew(){return we()}}}const Se=2500,ke=/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F2FF}*_`~#>]/gu;function _e(){return typeof window=="undefined"?null:window.SpeechRecognition||window.webkitSpeechRecognition||null}function Ae(){return typeof window!="undefined"&&"speechSynthesis"in window&&typeof window.SpeechSynthesisUtterance=="function"}function Ce(t,e){if(!Array.isArray(t)||t.length===0)return null;const a=(e||"").split("-")[0].toLowerCase(),r=t.filter(s=>{const o=(s.lang||"").toLowerCase();return o===e.toLowerCase()||o.startsWith(a)});if(r.length===0)return t[0]||null;const n=s=>{let o=0;s.localService&&(o+=4);const c=(s.name||"").toLowerCase();return/natural|neural|premium|enhanced|online/.test(c)&&(o+=3),/google|microsoft|samantha|alex/.test(c)&&(o+=2),(s.lang||"").toLowerCase()===e.toLowerCase()&&(o+=1),o};return r.sort((s,o)=>n(o)-n(s))[0]}function Ee({lang:t="en-US",onResult:e=()=>{},onError:a=()=>{},onStateChange:r=()=>{}}={}){const n=_e(),s=!!n,o=Ae();let c=null,x=!1,p=!1,b=null,i=null;function u(y){try{r(y)}catch(v){console.error("[AI Widget] voice onStateChange error",v)}}function h(){const y=new n;return y.lang=t,y.interimResults=!0,y.continuous=!1,y.maxAlternatives=1,y.onstart=()=>{x=!0,u("listening"),g()},y.onresult=v=>{var E;let l="",m="";for(let R=v.resultIndex;R<v.results.length;R++){const P=v.results[R],N=((E=P[0])==null?void 0:E.transcript)||"";P.isFinal?m+=N:l+=N}g(),m?e({text:m.trim(),isFinal:!0}):l&&e({text:l.trim(),isFinal:!1})},y.onerror=v=>{if(w(),x=!1,v.error==="aborted"||v.error==="no-speech"){u("idle");return}u("error");const l={"not-allowed":"Microphone access was denied.","service-not-allowed":"Speech service is unavailable.","audio-capture":"No microphone found.",network:"Network issue — voice input needs a connection."}[v.error]||`Voice input failed (${v.error||"unknown"}).`;try{a(new Error(l))}catch(m){}setTimeout(()=>u("idle"),50)},y.onend=()=>{w(),x=!1,u("idle")},y}function g(){w(),b=setTimeout(()=>{if(x&&c)try{c.stop()}catch(y){}},Se)}function w(){b&&(clearTimeout(b),b=null)}function k(){if(!s)return a(new Error("Voice input is not supported in this browser.")),!1;if(x)return!0;z();try{return c=h(),c.start(),!0}catch(y){return u("error"),a(y instanceof Error?y:new Error("Could not start voice input.")),setTimeout(()=>u("idle"),50),!1}}function A(){if(w(),c&&x)try{c.stop()}catch(y){}}function _(){if(!o)return null;if(i)return i;const y=window.speechSynthesis.getVoices()||[];return i=Ce(y,t),i}o&&"onvoiceschanged"in window.speechSynthesis&&window.speechSynthesis.addEventListener("voiceschanged",()=>{i=null,_()});function S(y){if(!o||p||!y)return;const v=String(y).replace(ke,"").trim();if(!v)return;z();const l=new window.SpeechSynthesisUtterance(v);l.lang=t,l.rate=1.02,l.pitch=1,l.volume=1;const m=_();m&&(l.voice=m),l.onstart=()=>u("speaking"),l.onend=()=>{u("idle")},l.onerror=()=>{u("idle")};try{window.speechSynthesis.speak(l)}catch(E){u("idle")}}function z(){if(o)try{window.speechSynthesis.cancel()}catch(y){}}function M(y){p=!!y,p&&z()}function D(){return p}function C(){A(),z(),c=null}return{sttSupported:s,ttsSupported:o,startListening:k,stopListening:A,speak:S,cancelSpeaking:z,setMuted:M,isMuted:D,isListening:()=>x,destroy:C}}function Te({enabled:t=!1,volume:e=.18}={}){let a=null,r=!t,n=!1;function s(){if(a||r)return a;const i=typeof window!="undefined"?window.AudioContext||window.webkitAudioContext:null;if(!i)return null;try{a=new i,n=!0}catch(u){a=null}return a}function o(i,u,h,g,w){i.gain.setValueAtTime(0,w),i.gain.linearRampToValueAtTime(u,w+h),i.gain.exponentialRampToValueAtTime(1e-4,w+h+g)}function c({freq:i,type:u="sine",duration:h=.12,peak:g=e,glideTo:w=null}){if(s())try{const k=a.createOscillator(),A=a.createGain();k.type=u;const _=a.currentTime+.015;k.frequency.setValueAtTime(i,_),typeof w=="number"&&k.frequency.exponentialRampToValueAtTime(w,_+h),o(A,g,.01,h,_),k.connect(A).connect(a.destination),k.start(_),k.stop(_+h+.05)}catch(k){console.error("[sounds] tone error:",k)}}function x(i){if(!r&&s())switch(a.state==="suspended"&&a.resume().catch(()=>{}),i){case"send":c({freq:620,glideTo:880,duration:.13,peak:e*.8});break;case"receive":c({freq:880,type:"sine",duration:.08,peak:e*.7}),setTimeout(()=>c({freq:1174,type:"sine",duration:.12,peak:e*.85}),70);break;case"error":c({freq:240,glideTo:140,type:"triangle",duration:.22,peak:e*.9});break}}function p(i){r=!!i}function b(){if(a&&n)try{a.close()}catch(i){}a=null}return{play:x,setMuted:p,isMuted:()=>r,destroy:b}}function Ie(){const t=new Set,e=typeof window!="undefined",a=()=>e&&typeof navigator!="undefined"?navigator.onLine!==!1:!0;let r=a();function n(){const s=a();s!==r&&(r=s,t.forEach(o=>{try{o(r)}catch(c){console.error("[AI Widget] network listener error",c)}}))}return e&&(window.addEventListener("online",n),window.addEventListener("offline",n)),{isOnline:()=>r,subscribe(s){t.add(s);try{s(r)}catch(o){}return()=>t.delete(s)},destroy(){e&&(window.removeEventListener("online",n),window.removeEventListener("offline",n)),t.clear()}}}class te extends Error{constructor(e){super(e),this.name="NetworkError"}}class re extends Error{constructor(e){super(`Request timed out after ${e}ms`),this.name="TimeoutError"}}class G extends Error{constructor(e,a){super(e),this.name="ApiError",this.status=a}}async function ne(t,e,a){const r=new AbortController,n=setTimeout(()=>r.abort(),a);try{return await fetch(t,V($({},e),{signal:r.signal}))}catch(s){throw s.name==="AbortError"?new re(a):new te(s.message||"Network request failed")}finally{clearTimeout(n)}}async function Le(t,e=3,a=600){let r;for(let n=0;n<=e;n++)try{return await t()}catch(s){if(r=s,s instanceof G&&s.status>=400&&s.status<500)throw s;if(n<e){const o=a*Math.pow(2,n),c=Math.random()*200;await new Promise(x=>setTimeout(x,o+c))}}throw r}function Ne(t){return t instanceof re?{message:"The request took too long. Please try again.",retryable:!0}:t instanceof te?{message:"No internet connection. Please check your network.",retryable:!0}:t instanceof G?t.status===401||t.status===403?{message:"Authentication failed. Please check your API key.",retryable:!1}:t.status>=500?{message:"Server error. We're working on it — please try again.",retryable:!0}:{message:"Something went wrong. Please try again.",retryable:!0}:{message:"An unexpected error occurred. Please try again.",retryable:!0}}async function ze(t,e){const{apiKey:a,apiUrl:r,sessionId:n,maxRetries:s,requestTimeoutMs:o}=e;return Le(async()=>{var h,g,w,k;const x=t[t.length-1],p=t.slice(0,-1).map(({role:A,content:_})=>({role:A,content:_})),b=await ne(r,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":a,Authorization:`Bearer ${a}`,"X-Widget-Session":n||"","X-Widget-Version":"1.0.0"},body:JSON.stringify({message:x.content,sessionId:n,history:p})},o);if(!b.ok){let A="";try{const _=await b.json();A=_.error||_.message||JSON.stringify(_)}catch(_){A=await b.text().catch(()=>`HTTP ${b.status}`)}throw new G(A||`HTTP ${b.status}`,b.status)}let i;try{i=await b.json()}catch(A){throw new G("Invalid JSON in API response",200)}const u=(k=(w=(g=(h=i.reply)!=null?h:i.message)!=null?g:i.content)!=null?w:i.text)!=null?k:i.answer;if(typeof u!="string"||u.trim()==="")throw new G("Unrecognised response format from API",200);return{reply:u.trim(),suggestions:Me(i.suggestions)}},s)}async function Oe(t){const{apiKey:e,apiUrl:a,sessionId:r,requestTimeoutMs:n}=t,o=`${a.replace(/\/[^/]*$/,"")}/transfer`,c=await ne(o,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":e,Authorization:`Bearer ${e}`},body:JSON.stringify({sessionId:r})},n);if(!c.ok){let x=`HTTP ${c.status}`;try{x=(await c.json()).message||x}catch(p){}throw new Error(x)}return c.json()}function Me(t){if(!Array.isArray(t))return[];const e=new Set,a=[];for(const r of t){if(typeof r!="string")continue;const n=r.trim();if(!n)continue;const s=n.length>60?n.slice(0,60).trim():n,o=s.toLowerCase();if(!e.has(o)&&(e.add(o),a.push(s),a.length>=4))break}return a}function $e(){const t=new Map;return{on(e,a){return t.has(e)||t.set(e,new Set),t.get(e).add(a),()=>this.off(e,a)},off(e,a){var r;(r=t.get(e))==null||r.delete(a)},emit(e,a){var r;(r=t.get(e))==null||r.forEach(n=>{try{n(a)}catch(s){console.error(`[AI Widget] EventBus error in handler for "${e}":`,s)}})},clear(){t.clear()}}}const Re=["button:not([disabled])","textarea:not([disabled])","input:not([disabled])","a[href]",'[tabindex]:not([tabindex="-1"])'].join(", ");function ie(t){return Array.from(t.querySelectorAll(Re)).filter(e=>!e.closest("[hidden]")&&e.offsetParent!==null)}function Be(t){let e=!1;function a(r){if(!e||r.key!=="Tab")return;const n=ie(t);if(n.length===0){r.preventDefault();return}const s=n[0],o=n[n.length-1],c=r.target;r.shiftKey?c===s&&(r.preventDefault(),o.focus()):c===o&&(r.preventDefault(),s.focus())}return{activate(r){e=!0,t.addEventListener("keydown",a);const n=r||ie(t)[0];n&&requestAnimationFrame(()=>n.focus())},deactivate(r){e=!1,t.removeEventListener("keydown",a),r&&requestAnimationFrame(()=>r.focus())}}}function Ue(t,e){t.textContent="",requestAnimationFrame(()=>{requestAnimationFrame(()=>{t.textContent=e})})}function We(t){return`
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :host {
      /* === Brand === */
      --primary:          ${t.primaryColor};
      --primary-rgb:      ${t.primaryRgb};
      --primary-light:    rgba(${t.primaryRgb}, 0.12);
      --primary-hover:    rgba(${t.primaryRgb}, 0.88);

      /* === Surface === */
      --surface:          #ffffff;
      --surface-alt:      #f7f8fa;
      --surface-raised:   #ffffff;
      --border:           #e5e7eb;
      --border-light:     #f3f4f6;

      /* === Text === */
      --text-primary:     #111827;
      --text-secondary:   #6b7280;
      --text-tertiary:    #9ca3af;
      --text-inverse:     #ffffff;

      /* === Semantic === */
      --error:            #ef4444;
      --error-rgb:        239, 68, 68;
      --error-bg:         #fef2f2;
      --success:          #10b981;
      --warning:          #f59e0b;

      /* === Shadows === */
      --shadow-sm:        0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.1);
      --shadow-md:        0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
      --shadow-lg:        0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
      --shadow-xl:        0 20px 40px -8px rgba(0,0,0,0.18), 0 8px 16px -4px rgba(0,0,0,0.08);

      /* === Radius === */
      --radius-xs:        4px;
      --radius-sm:        6px;
      --radius-md:        12px;
      --radius-lg:        16px;
      --radius-xl:        20px;
      --radius-full:      9999px;

      /* === Typography === */
      --font:             -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                          'Helvetica Neue', Arial, sans-serif;
      --font-size-2xs:    10px;
      --font-size-xs:     11px;
      --font-size-sm:     13px;
      --font-size-md:     14px;
      --font-size-lg:     15px;
      --font-size-xl:     18px;

      /* === Motion === */
      --transition-fast:  0.15s ease;
      --transition-base:  0.2s ease;
      --transition-spring: 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

      /* === Z-index === */
      --z-widget:         ${t.zIndex};

      /* === Layout === */
      font-family:        var(--font);
      font-size:          var(--font-size-md);
      line-height:        1.5;
      color:              var(--text-primary);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Screen-reader only utility */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
  `}function De(t){const e=t.position||"bottom-right",a=e.includes("left"),r=e.includes("top"),n=typeof t.offsetX=="number"?t.offsetX:24,s=typeof t.offsetY=="number"?t.offsetY:24,o=typeof t.buttonSize=="number"?t.buttonSize:56,c=typeof t.windowWidth=="number"?t.windowWidth:380,x=typeof t.windowHeight=="number"?t.windowHeight:580,p=12,b=s+o+p,i=a?"left":"right",u=r?"top":"bottom",h=r?"-14px":"14px",g=`${r?"top":"bottom"} ${a?"left":"right"}`,w=Math.max(o-4,44);return`
    /* ===================================================
       LAUNCHER BUTTON
    =================================================== */

    .launcher {
      position: fixed;
      ${u}: ${s}px;
      ${i}: ${n}px;
      z-index: var(--z-widget);
      width: ${o}px;
      height: ${o}px;
      border-radius: var(--radius-full);
      background: linear-gradient(135deg,
        var(--primary) 0%,
        rgba(var(--primary-rgb), 0.82) 100%);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-inverse);
      box-shadow: 0 4px 16px rgba(var(--primary-rgb), 0.45),
                  0 2px 6px rgba(0,0,0,0.12);
      transition: transform var(--transition-spring),
                  box-shadow var(--transition-base),
                  background var(--transition-base);
      outline: none;
      pointer-events: all;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      /* Gentle entrance — the button scales in from 0 on mount */
      animation: launcherIn 520ms cubic-bezier(0.22, 1.2, 0.36, 1) both,
                 launcherAttention 3.2s ease-in-out 1.2s 2;
    }

    @keyframes launcherIn {
      from { opacity: 0; transform: scale(0.2); }
      to   { opacity: 1; transform: scale(1);   }
    }

    /* Gentle two-pulse attention — plays twice after mount, then stops */
    @keyframes launcherAttention {
      0%, 100% { box-shadow: 0 4px 16px rgba(var(--primary-rgb), 0.45),
                             0 2px 6px rgba(0,0,0,0.12),
                             0 0 0 0 rgba(var(--primary-rgb), 0.35); }
      50%       { box-shadow: 0 4px 16px rgba(var(--primary-rgb), 0.45),
                              0 2px 6px rgba(0,0,0,0.12),
                              0 0 0 12px rgba(var(--primary-rgb), 0); }
    }

    .launcher:hover {
      transform: scale(1.07);
      box-shadow: 0 6px 22px rgba(var(--primary-rgb), 0.55),
                  0 3px 8px rgba(0,0,0,0.15);
    }

    .launcher:active {
      transform: scale(0.94);
    }

    .launcher:focus-visible {
      box-shadow: 0 0 0 3px var(--surface),
                  0 0 0 5px var(--primary);
    }

    /* Icon swap animation */
    .launcher__icon {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.2s ease, transform 0.25s ease;
      will-change: transform, opacity;
    }

    .launcher__icon--chat {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }

    .launcher__icon--close {
      opacity: 0;
      transform: scale(0.4) rotate(-90deg);
    }

    .launcher.is-open .launcher__icon--chat {
      opacity: 0;
      transform: scale(0.4) rotate(90deg);
    }

    .launcher.is-open .launcher__icon--close {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }

    /* Unread badge */
    .launcher__badge {
      position: absolute;
      top: -3px;
      right: -3px;
      min-width: 20px;
      height: 20px;
      border-radius: var(--radius-full);
      background: var(--error);
      color: var(--text-inverse);
      font-size: var(--font-size-xs);
      font-weight: 700;
      font-family: var(--font);
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 5px;
      border: 2px solid var(--surface);
      transform: scale(1);
      transition: transform var(--transition-spring), opacity var(--transition-base);
      pointer-events: none;
    }

    .launcher__badge[hidden] {
      transform: scale(0);
      opacity: 0;
      display: flex; /* override hidden so we can animate out */
    }

    /* ===================================================
       CHAT WINDOW
    =================================================== */

    .widget-window {
      position: fixed;
      ${u}: ${b}px;
      ${i}: ${n}px;
      z-index: var(--z-widget);
      width: ${c}px;
      height: ${x}px;
      max-height: calc(100dvh - ${b+16}px);
      background: var(--surface);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-xl);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      pointer-events: none;
      /* Animation start state */
      opacity: 0;
      transform: scale(0.93) translateY(${h});
      transform-origin: ${g};
      transition: opacity 0.2s ease,
                  transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
      will-change: transform, opacity;
    }

    .widget-window.is-open {
      opacity: 1;
      transform: scale(1) translateY(0);
      pointer-events: all;
    }

    /* ===================================================
       RESPONSIVE — mobile
    =================================================== */

    @media (max-width: 480px) {
      .widget-window {
        width: calc(100vw - 16px);
        height: calc(100dvh - ${w+s+p+16}px);
        max-height: calc(100dvh - ${w+s+p+16}px);
        ${u}: ${w+s+p}px;
        ${i}: 8px;
        ${a?"right: 8px;":"left: 8px;"}
        border-radius: var(--radius-lg) var(--radius-lg) var(--radius-md) var(--radius-md);
        transform-origin: ${r?"top":"bottom"} center;
      }

      .launcher {
        ${u}: ${Math.max(s-10,8)}px;
        ${i}: ${Math.max(n-10,8)}px;
        width: ${w}px;
        height: ${w}px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .launcher { animation: launcherIn 280ms ease both !important; }
      .widget-window {
        transition: opacity 150ms ease !important;
        transform: none !important;
      }
    }
  `}function je(){return`
    /* ===================================================
       HEADER
    =================================================== */

    .header {
      display: flex;
      align-items: center;
      gap: 11px;
      padding: 13px 16px;
      border-bottom: 1px solid var(--border);
      background: var(--surface);
      flex-shrink: 0;
    }

    .header__avatar {
      position: relative;
      flex-shrink: 0;
    }

    .header__avatar-img {
      width: 38px;
      height: 38px;
      border-radius: var(--radius-full);
      object-fit: cover;
      display: block;
    }

    .header__avatar-fallback {
      width: 38px;
      height: 38px;
      border-radius: var(--radius-full);
      background: var(--primary);
      color: var(--text-inverse);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--font-size-md);
      font-weight: 700;
      letter-spacing: -0.3px;
      flex-shrink: 0;
    }

    .header__status-dot {
      position: absolute;
      bottom: 1px;
      right: 1px;
      width: 10px;
      height: 10px;
      border-radius: var(--radius-full);
      background: var(--success);
      border: 2px solid var(--surface);
    }

    .header__info {
      flex: 1;
      min-width: 0;
    }

    .header__name {
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.3;
    }

    .header__subtitle {
      font-size: var(--font-size-xs);
      color: var(--success);
      font-weight: 500;
      margin-top: 2px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .header__actions {
      display: flex;
      align-items: center;
      gap: 2px;
      flex-shrink: 0;
    }

    .header__btn {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-full);
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      transition: background var(--transition-fast), color var(--transition-fast);
      padding: 0;
    }

    .header__btn:hover {
      background: var(--surface-alt);
      color: var(--text-primary);
    }

    .header__btn:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 1px;
    }

    .header__btn--transfer {
      color: var(--text-secondary);
    }
    .header__btn--transfer:hover:not(:disabled) {
      color: var(--primary);
      background: rgba(var(--primary-rgb), 0.1);
    }
    .header__btn--transfer.is-active {
      color: var(--primary);
      background: rgba(var(--primary-rgb), 0.12);
    }
    .header__btn--transfer:disabled {
      opacity: 0.5;
      cursor: default;
    }

    /* ===================================================
       MESSAGES AREA
    =================================================== */

    .messages-area {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 12px 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      background: var(--surface-alt);
      scroll-behavior: smooth;
      overscroll-behavior: contain;
    }

    .messages-area::-webkit-scrollbar {
      width: 4px;
    }

    .messages-area::-webkit-scrollbar-track {
      background: transparent;
    }

    .messages-area::-webkit-scrollbar-thumb {
      background: rgba(0,0,0,0.12);
      border-radius: 2px;
    }

    .messages-area::-webkit-scrollbar-thumb:hover {
      background: rgba(0,0,0,0.22);
    }

    /* Welcome / empty state */
    .messages-welcome {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 20px 12px 12px;
      gap: 8px;
    }

    .messages-welcome__avatar {
      width: 52px;
      height: 52px;
      border-radius: var(--radius-full);
      background: var(--primary-light);
      border: 2px solid rgba(var(--primary-rgb), 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 4px;
    }

    .messages-welcome__text {
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
      line-height: 1.6;
      max-width: 260px;
    }

    /* Date / time separator between message groups */
    .date-separator {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 10px 0 4px;
      padding: 0 2px;
    }

    .date-separator__line {
      flex: 1;
      height: 1px;
      background: var(--border);
    }

    .date-separator__text {
      font-size: var(--font-size-2xs);
      color: var(--text-tertiary);
      font-weight: 500;
      white-space: nowrap;
      letter-spacing: 0.3px;
    }

    /* ===================================================
       MESSAGE BUBBLE
    =================================================== */

    .bubble-wrapper {
      display: flex;
      align-items: flex-end;
      gap: 7px;
      max-width: 86%;
      margin-top: 2px;
    }

    .bubble-wrapper--user {
      margin-left: auto;
      flex-direction: row-reverse;
    }

    .bubble-wrapper--assistant {
      margin-right: auto;
    }

    /* Small bot avatar beside each assistant message */
    .bubble-avatar {
      width: 26px;
      height: 26px;
      border-radius: var(--radius-full);
      background: var(--primary);
      color: var(--text-inverse);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
      flex-shrink: 0;
      margin-bottom: 2px;
      overflow: hidden;
    }

    .bubble-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .bubble-avatar--hidden {
      visibility: hidden;
    }

    .bubble-content {
      display: flex;
      flex-direction: column;
    }

    .bubble {
      padding: 9px 13px;
      border-radius: var(--radius-md);
      font-size: var(--font-size-md);
      line-height: 1.55;
      word-break: break-word;
      overflow-wrap: break-word;
      transition: opacity var(--transition-base);
    }

    .bubble--user {
      background: var(--primary);
      color: var(--text-inverse);
      border-radius: var(--radius-md) var(--radius-md) var(--radius-sm) var(--radius-md);
    }

    .bubble--assistant {
      background: var(--surface);
      color: var(--text-primary);
      border: 1px solid var(--border);
      border-radius: var(--radius-md) var(--radius-md) var(--radius-md) var(--radius-sm);
    }

    /* Failed message state */
    .bubble--failed {
      background: var(--error-bg);
      border: 1.5px solid rgba(var(--error-rgb), 0.35);
      color: var(--text-primary);
      opacity: 0.9;
    }

    .bubble-retry-row {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 5px;
    }

    /* Critical: the 'hidden' attribute must actually hide the row —
       otherwise "Failed to send" bleeds into every successful message. */
    .bubble-retry-row[hidden] {
      display: none !important;
    }

    .bubble-retry-row__text {
      font-size: var(--font-size-xs);
      color: var(--error);
    }

    .bubble-retry-btn {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      background: none;
      border: none;
      padding: 2px 6px;
      font-size: var(--font-size-xs);
      font-family: var(--font);
      font-weight: 600;
      color: var(--error);
      cursor: pointer;
      border-radius: var(--radius-xs);
      transition: background var(--transition-fast);
    }

    .bubble-retry-btn:hover {
      background: rgba(var(--error-rgb), 0.1);
    }

    .bubble-retry-btn:focus-visible {
      outline: 2px solid var(--error);
      outline-offset: 1px;
    }

    /* Timestamp below each bubble */
    .bubble-meta {
      font-size: var(--font-size-2xs);
      color: var(--text-tertiary);
      margin-top: 3px;
      display: flex;
      align-items: center;
      gap: 3px;
    }

    .bubble-meta--user {
      justify-content: flex-end;
    }

    .bubble-meta--assistant {
      justify-content: flex-start;
      padding-left: 1px;
    }

    /* Sending state: subtle pulse on user message */
    .bubble--sending {
      opacity: 0.7;
    }

    /* ===================================================
       SUGGESTION CHIPS
    =================================================== */

    /* Row container — horizontal, wraps on very narrow screens */
    .suggestions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }

    .suggestions[hidden] {
      display: none;
    }

    /* Welcome-state chips: centered so they sit nicely under the greeting */
    .messages-welcome .suggestions {
      justify-content: center;
      margin-top: 12px;
    }

    .suggestion-chip {
      display: inline-flex;
      align-items: center;
      height: 30px;
      padding: 0 12px;
      background: var(--surface);
      border: 1.5px solid rgba(var(--primary-rgb), 0.35);
      border-radius: 100px;           /* pill */
      font-size: var(--font-size-xs);
      font-family: var(--font);
      font-weight: 500;
      color: var(--primary);
      cursor: pointer;
      white-space: nowrap;
      line-height: 1;
      user-select: none;
      -webkit-user-select: none;
      transition:
        background var(--transition-fast),
        border-color var(--transition-fast),
        color var(--transition-fast),
        transform 80ms ease,
        box-shadow var(--transition-fast),
        opacity var(--transition-fast);
      /* Entrance: fade + slight vertical drift */
      animation: chipIn 220ms ease both;
    }

    @keyframes chipIn {
      from { opacity: 0; transform: translateY(4px); }
      to   { opacity: 1; transform: translateY(0);   }
    }

    /* Stagger entrance for each chip */
    .suggestion-chip:nth-child(1) { animation-delay: 0ms;   }
    .suggestion-chip:nth-child(2) { animation-delay: 50ms;  }
    .suggestion-chip:nth-child(3) { animation-delay: 100ms; }
    .suggestion-chip:nth-child(4) { animation-delay: 150ms; }

    .suggestion-chip:hover {
      background: rgba(var(--primary-rgb), 0.08);
      border-color: var(--primary);
      box-shadow: 0 1px 4px rgba(var(--primary-rgb), 0.18);
    }

    .suggestion-chip:active {
      transform: scale(0.95);
      background: rgba(var(--primary-rgb), 0.14);
      box-shadow: none;
    }

    .suggestion-chip:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }

    .suggestion-chip:disabled,
    .suggestions--disabled .suggestion-chip {
      opacity: 0.45;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ===================================================
       TYPING INDICATOR
    =================================================== */

    .typing-indicator {
      display: flex;
      align-items: flex-end;
      gap: 7px;
      margin-top: 4px;
      margin-right: auto;
    }

    .typing-indicator[hidden] {
      display: none;
    }

    .typing-bubble {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md) var(--radius-md) var(--radius-md) var(--radius-sm);
      padding: 10px 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Dots wrapper (class renamed from typing-bubble to typing-dots) */
    .typing-dots {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }

    .typing-dot {
      width: 6px;
      height: 6px;
      border-radius: var(--radius-full);
      background: var(--text-tertiary);
      animation: typingBounce 1.3s infinite ease-in-out both;
    }

    .typing-dot:nth-child(1) { animation-delay: 0ms;   }
    .typing-dot:nth-child(2) { animation-delay: 160ms; }
    .typing-dot:nth-child(3) { animation-delay: 320ms; }

    @keyframes typingBounce {
      0%, 60%, 100% { transform: translateY(0);   opacity: 0.4; }
      30%            { transform: translateY(-5px); opacity: 1;   }
    }

    /* Progress stage label — fades in when text is set */
    .typing-label {
      font-size: var(--font-size-xs);
      color: var(--text-tertiary);
      font-weight: 500;
      white-space: nowrap;
      opacity: 0;
      max-width: 0;
      overflow: hidden;
      transition:
        opacity 350ms ease,
        max-width 350ms ease;
    }

    .typing-label--visible {
      opacity: 1;
      max-width: 120px; /* generous cap; actual text is short */
    }

    /* ===================================================
       ERROR BANNER
    =================================================== */

    .error-banner {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 9px 14px;
      background: var(--error-bg);
      border-top: 1px solid rgba(var(--error-rgb), 0.2);
      border-bottom: 1px solid rgba(var(--error-rgb), 0.2);
      font-size: var(--font-size-sm);
      color: #991b1b;
      flex-shrink: 0;
    }

    .error-banner[hidden] {
      display: none;
    }

    .error-banner__icon {
      color: var(--error);
      flex-shrink: 0;
      display: flex;
      align-items: center;
    }

    .error-banner__text {
      flex: 1;
      line-height: 1.4;
    }

    .error-banner__retry {
      flex-shrink: 0;
      background: none;
      border: 1px solid rgba(var(--error-rgb), 0.4);
      border-radius: var(--radius-xs);
      padding: 3px 10px;
      font-size: var(--font-size-xs);
      font-family: var(--font);
      font-weight: 600;
      color: var(--error);
      cursor: pointer;
      white-space: nowrap;
      transition: background var(--transition-fast);
    }

    .error-banner__retry:hover {
      background: rgba(var(--error-rgb), 0.1);
    }

    .error-banner__retry:focus-visible {
      outline: 2px solid var(--error);
      outline-offset: 1px;
    }

    .error-banner__dismiss {
      flex-shrink: 0;
      background: none;
      border: none;
      padding: 2px;
      cursor: pointer;
      color: rgba(var(--error-rgb), 0.7);
      display: flex;
      align-items: center;
      border-radius: var(--radius-xs);
      transition: color var(--transition-fast);
    }

    .error-banner__dismiss:hover {
      color: var(--error);
    }

    .error-banner__dismiss:focus-visible {
      outline: 2px solid var(--error);
      outline-offset: 1px;
    }

    /* ===================================================
       BUBBLE ENTRANCE ANIMATION
    =================================================== */

    .bubble-wrapper {
      animation: bubbleIn 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    @keyframes bubbleIn {
      from {
        opacity: 0;
        transform: translateY(8px) scale(0.985);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .bubble-wrapper--user .bubble {
      background: linear-gradient(135deg,
        var(--primary) 0%,
        rgba(var(--primary-rgb), 0.88) 100%);
      box-shadow: 0 1px 2px rgba(var(--primary-rgb), 0.3),
                  0 4px 12px rgba(var(--primary-rgb), 0.18);
    }

    /* ===================================================
       READ RECEIPTS (inline with timestamp)
    =================================================== */

    .bubble-meta__status {
      display: inline-flex;
      align-items: center;
      color: var(--text-tertiary);
      transition: color var(--transition-base);
    }

    .bubble-meta__status--sent {
      color: var(--text-tertiary);
    }

    .bubble-meta__status--delivered {
      color: var(--primary);
    }

    .bubble-meta__status[hidden] { display: none !important; }

    /* ===================================================
       HEADER — refined avatar + extra actions
    =================================================== */

    .header {
      background: linear-gradient(180deg,
        var(--surface) 0%,
        rgba(var(--primary-rgb), 0.015) 100%);
    }

    .header__avatar-fallback {
      background: linear-gradient(135deg,
        var(--primary) 0%,
        rgba(var(--primary-rgb), 0.78) 100%);
      box-shadow: 0 2px 6px rgba(var(--primary-rgb), 0.28);
    }

    .header__status-dot {
      animation: statusPulse 2.4s ease-in-out infinite;
    }

    @keyframes statusPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.45); }
      50%       { box-shadow: 0 0 0 5px rgba(16, 185, 129, 0); }
    }

    .header__btn[aria-pressed="true"] {
      background: rgba(var(--primary-rgb), 0.12);
      color: var(--primary);
    }

    /* ===================================================
       WELCOME CARD — richer starter screen
    =================================================== */

    .messages-welcome {
      padding: 28px 16px 16px;
      gap: 10px;
    }

    .messages-welcome__avatar {
      background: linear-gradient(135deg,
        rgba(var(--primary-rgb), 0.14) 0%,
        rgba(var(--primary-rgb), 0.28) 100%);
      border-color: rgba(var(--primary-rgb), 0.28);
      box-shadow: 0 4px 14px rgba(var(--primary-rgb), 0.18);
      animation: welcomeAvatarIn 420ms cubic-bezier(0.22, 1.2, 0.36, 1) both;
    }

    @keyframes welcomeAvatarIn {
      from { opacity: 0; transform: scale(0.6); }
      to   { opacity: 1; transform: scale(1);   }
    }

    .messages-welcome__title {
      font-size: var(--font-size-xl);
      font-weight: 700;
      color: var(--text-primary);
      letter-spacing: -0.3px;
      margin-top: 2px;
    }

    .messages-welcome__text {
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
      line-height: 1.55;
      max-width: 280px;
    }

    .messages-welcome__hint {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 10px;
      margin-top: 4px;
      font-size: var(--font-size-2xs);
      font-weight: 600;
      letter-spacing: 0.4px;
      text-transform: uppercase;
      color: var(--primary);
      background: rgba(var(--primary-rgb), 0.1);
      border-radius: var(--radius-full);
    }

    .messages-welcome__hint svg { flex-shrink: 0; }

    /* ===================================================
       SCROLL-TO-BOTTOM FLOATING PILL
    =================================================== */

    .scroll-to-bottom {
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%) translateY(8px);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px 5px 10px;
      background: var(--surface);
      color: var(--text-primary);
      border: 1px solid var(--border);
      border-radius: var(--radius-full);
      font-size: var(--font-size-xs);
      font-family: var(--font);
      font-weight: 600;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
      cursor: pointer;
      opacity: 0;
      pointer-events: none;
      transition: opacity 180ms ease, transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1);
      z-index: 3;
    }

    .scroll-to-bottom.is-visible {
      opacity: 1;
      pointer-events: all;
      transform: translateX(-50%) translateY(0);
    }

    .scroll-to-bottom:hover {
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.16);
      border-color: rgba(var(--primary-rgb), 0.3);
      color: var(--primary);
    }

    .scroll-to-bottom__count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      background: var(--primary);
      color: var(--text-inverse);
      border-radius: var(--radius-full);
      font-size: 9px;
      font-weight: 700;
    }

    .scroll-to-bottom__count[hidden] { display: none !important; }

    /* Messages area needs to be positioning context for the pill */
    .messages-area {
      position: relative;
    }

    /* ===================================================
       OFFLINE BANNER
    =================================================== */

    .offline-banner {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 7px 14px;
      background: #fef3c7;
      color: #92400e;
      border-bottom: 1px solid rgba(245, 158, 11, 0.3);
      font-size: var(--font-size-xs);
      font-weight: 600;
      flex-shrink: 0;
      animation: bannerSlideIn 240ms ease both;
    }

    .offline-banner[hidden] { display: none !important; }

    @keyframes bannerSlideIn {
      from { opacity: 0; transform: translateY(-100%); }
      to   { opacity: 1; transform: translateY(0);    }
    }

    /* ===================================================
       TYPING INDICATOR — enhanced
    =================================================== */

    .typing-bubble {
      background: linear-gradient(135deg,
        var(--surface) 0%,
        var(--surface-alt) 100%);
      animation: bubbleIn 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    .typing-dot {
      background: linear-gradient(135deg,
        var(--primary) 0%,
        rgba(var(--primary-rgb), 0.7) 100%);
    }

    .typing-label--visible {
      color: var(--primary);
    }

    /* ===================================================
       RESPECT REDUCED MOTION
    =================================================== */

    @media (prefers-reduced-motion: reduce) {
      .bubble-wrapper,
      .typing-bubble,
      .messages-welcome__avatar,
      .offline-banner,
      .suggestion-chip {
        animation: none !important;
      }
      .header__status-dot { animation: none !important; }
    }
  `}function He(){return`
    /* ===================================================
       INPUT CONTAINER (outer wrapper — stacks input row + footer)
    =================================================== */

    .input-container {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      background: var(--surface);
    }

    /* ===================================================
       INPUT AREA
    =================================================== */

    .input-area {
      padding: 10px 12px 12px;
      background: var(--surface);
      border-top: 1px solid var(--border);
      display: flex;
      align-items: flex-end;
      gap: 8px;
      flex-shrink: 0;
    }

    .input-wrapper {
      flex: 1;
      background: var(--surface-alt);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-md);
      display: flex;
      align-items: flex-end;
      overflow: hidden;
      transition: border-color var(--transition-fast),
                  box-shadow var(--transition-fast);
    }

    .input-wrapper:focus-within {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.15);
      background: var(--surface);
    }

    .input-wrapper.is-disabled {
      opacity: 0.55;
      pointer-events: none;
      /* Subtle animated border shows the request is in-flight */
      border-color: rgba(var(--primary-rgb), 0.4);
      animation: inputPulse 1.8s ease-in-out infinite;
    }

    @keyframes inputPulse {
      0%, 100% { box-shadow: 0 0 0 0px rgba(var(--primary-rgb), 0); }
      50%       { box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.12); }
    }

    .input-textarea {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      padding: 8px 10px 8px 12px;
      font-family: var(--font);
      font-size: var(--font-size-md);
      color: var(--text-primary);
      resize: none;
      min-height: 36px;
      max-height: 116px;
      line-height: 1.5;
      display: block;
      width: 100%;
      overflow-y: auto;
      scrollbar-width: thin;
    }

    .input-textarea::placeholder {
      color: var(--text-tertiary);
    }

    .input-textarea::-webkit-scrollbar {
      width: 3px;
    }

    .input-textarea::-webkit-scrollbar-thumb {
      background: var(--border);
      border-radius: 2px;
    }

    /* Send button */
    .send-btn {
      flex-shrink: 0;
      width: 36px;
      height: 36px;
      border-radius: var(--radius-sm);
      border: none;
      background: var(--primary);
      color: var(--text-inverse);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background var(--transition-fast),
                  opacity var(--transition-fast),
                  transform var(--transition-spring);
    }

    .send-btn:disabled {
      background: var(--border);
      color: var(--text-tertiary);
      cursor: not-allowed;
      transform: none;
    }

    .send-btn:not(:disabled):hover {
      filter: brightness(0.87);
      transform: scale(1.06);
    }

    .send-btn:not(:disabled):active {
      transform: scale(0.93);
    }

    .send-btn:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }

    /* Footer attribution */
    .input-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px 0 0;
    }

    .input-footer__text {
      font-size: var(--font-size-2xs);
      color: var(--text-tertiary);
      letter-spacing: 0.2px;
    }

    .input-footer__text a {
      color: var(--text-tertiary);
      text-decoration: none;
    }

    .input-footer__text a:hover {
      text-decoration: underline;
    }

    /* ===================================================
       VOICE INPUT — mic button + listening pulse
    =================================================== */

    .voice-btn {
      flex-shrink: 0;
      width: 36px;
      height: 36px;
      border-radius: var(--radius-sm);
      border: none;
      background: transparent;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      transition:
        background var(--transition-fast),
        color var(--transition-fast),
        transform 120ms ease;
    }

    .voice-btn:hover {
      background: var(--surface-alt);
      color: var(--text-primary);
    }

    .voice-btn:active { transform: scale(0.92); }

    .voice-btn:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }

    .voice-btn[hidden] { display: none !important; }

    /* Active "listening" state — red mic + animated rings */
    .voice-btn.is-listening {
      background: rgba(239, 68, 68, 0.1);
      color: var(--error);
    }

    .voice-btn.is-listening::before,
    .voice-btn.is-listening::after {
      content: '';
      position: absolute;
      inset: 4px;
      border-radius: var(--radius-sm);
      border: 2px solid rgba(239, 68, 68, 0.55);
      pointer-events: none;
      animation: voicePulse 1.4s ease-out infinite;
    }

    .voice-btn.is-listening::after {
      animation-delay: 0.7s;
    }

    @keyframes voicePulse {
      0%   { transform: scale(0.92); opacity: 0.8; }
      100% { transform: scale(1.55); opacity: 0;   }
    }

    /* Interim transcript chip appearing above the input */
    .interim-transcript {
      margin: 0 12px 6px;
      padding: 7px 11px;
      background: rgba(var(--primary-rgb), 0.08);
      border: 1px dashed rgba(var(--primary-rgb), 0.4);
      border-radius: var(--radius-sm);
      font-size: var(--font-size-xs);
      color: var(--primary);
      font-style: italic;
      line-height: 1.4;
      display: flex;
      align-items: center;
      gap: 6px;
      animation: bannerSlideIn 220ms ease both;
    }

    .interim-transcript[hidden] { display: none !important; }

    .interim-transcript__dot {
      flex-shrink: 0;
      width: 6px;
      height: 6px;
      border-radius: var(--radius-full);
      background: var(--error);
      animation: blink 1s ease-in-out infinite;
    }

    @keyframes blink {
      0%, 100% { opacity: 1;   }
      50%       { opacity: 0.3; }
    }

    /* ===================================================
       CHARACTER COUNTER
    =================================================== */

    .input-counter {
      font-size: 10px;
      color: var(--text-tertiary);
      font-weight: 500;
      padding: 0 8px 4px 0;
      text-align: right;
      opacity: 0;
      transition: opacity var(--transition-base), color var(--transition-fast);
    }

    .input-counter.is-visible { opacity: 1; }
    .input-counter.is-warn    { color: var(--warning); }
    .input-counter.is-limit   { color: var(--error); }

    /* ===================================================
       REDUCED MOTION
    =================================================== */

    @media (prefers-reduced-motion: reduce) {
      .voice-btn.is-listening::before,
      .voice-btn.is-listening::after,
      .interim-transcript__dot,
      .input-wrapper.is-disabled {
        animation: none !important;
      }
    }
  `}function d(t,e={},...a){const r=document.createElement(t);e=e||{};for(const[n,s]of Object.entries(e))if(s!=null)if(n==="class")r.className=s;else if(n==="style"&&typeof s=="string")r.style.cssText=s;else if(n==="html")r.innerHTML=s;else if(n.startsWith("on")&&typeof s=="function"){const o=n.slice(2).toLowerCase();r.addEventListener(o,s)}else r.setAttribute(n,s);for(const n of a.flat(1/0))n!=null&&(typeof n=="string"||typeof n=="number"?r.appendChild(document.createTextNode(String(n))):n instanceof Node&&r.appendChild(n));return r}function ae(t){const a=Date.now()-t,r=Math.floor(a/6e4);return r<1?"just now":r<60?`${r} min ago`:new Date(t).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}function K(t){const e=t.trim().split(/\s+/);return e.length===1?e[0][0].toUpperCase():(e[0][0]+e[e.length-1][0]).toUpperCase()}const Pe=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
  <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z"/>
  <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.124-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z"/>
</svg>`,se=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true">
  <line x1="18" y1="6" x2="6" y2="18"/>
  <line x1="6" y1="6" x2="18" y2="18"/>
</svg>`,Fe=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"/>
</svg>`,Ve=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true">
  <polyline points="6 9 12 15 18 9"/>
</svg>`,qe=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
  <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/>
</svg>`,Ye=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13" aria-hidden="true">
  <polyline points="1 4 1 10 7 10"/>
  <path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
</svg>`,Ke=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true">
  <rect x="9" y="3" width="6" height="12" rx="3"/>
  <path d="M5 11a7 7 0 0 0 14 0"/>
  <line x1="12" y1="18" x2="12" y2="22"/>
  <line x1="8" y1="22" x2="16" y2="22"/>
</svg>`,Ge=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="17" height="17" aria-hidden="true">
  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
</svg>`,oe=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="17" height="17" aria-hidden="true">
  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
  <line x1="23" y1="9" x2="17" y2="15"/>
  <line x1="17" y1="9" x2="23" y2="15"/>
</svg>`,Xe=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true">
  <line x1="12" y1="5" x2="12" y2="19"/>
  <polyline points="19 12 12 19 5 12"/>
</svg>`,Je=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
  <path d="M12 2l1.9 5.1L19 9l-5.1 1.9L12 16l-1.9-5.1L5 9l5.1-1.9L12 2z"/>
  <path d="M19 14l.9 2.4L22 17l-2.1.6L19 20l-.9-2.4L16 17l2.1-.6L19 14z"/>
  <path d="M5 14l.9 2.4L8 17l-2.1.6L5 20l-.9-2.4L2 17l2.1-.6L5 14z"/>
</svg>`,le=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="11" height="11" aria-hidden="true">
  <polyline points="20 6 9 17 4 12"/>
</svg>`,Qe=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="13" height="11" aria-hidden="true">
  <polyline points="1 12 6 17 15 7"/>
  <polyline points="9 12 14 17 23 7"/>
</svg>`,Ze=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true">
  <line x1="2" y1="2" x2="22" y2="22"/>
  <path d="M8.5 16.5a5 5 0 0 1 7 0"/>
  <path d="M2 8.82a15 15 0 0 1 4.17-2.65"/>
  <path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76"/>
  <path d="M16.85 11.25a10 10 0 0 1 2.22 1.68"/>
  <path d="M5 13a10 10 0 0 1 5.24-2.76"/>
  <line x1="12" y1="20" x2="12.01" y2="20"/>
</svg>`,et=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true">
  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
  <circle cx="12" cy="7" r="4"/>
</svg>`;function tt(t,e,a){const r=d("span",{class:"launcher__icon launcher__icon--chat",html:Pe}),n=d("span",{class:"launcher__icon launcher__icon--close",html:se}),s=d("span",{class:"launcher__badge","aria-label":"unread messages",role:"status"});s.setAttribute("hidden","");const o=d("button",{class:"launcher",type:"button","aria-label":`Open chat with ${a.botName}`,"aria-expanded":"false","aria-haspopup":"dialog"},r,n,s),c=()=>e.emit("toggle");o.addEventListener("click",c);function x(i,u){const h=i.isOpen!==(u==null?void 0:u.isOpen),g=i.unreadCount!==(u==null?void 0:u.unreadCount);if(h&&(o.classList.toggle("is-open",i.isOpen),o.setAttribute("aria-expanded",String(i.isOpen)),o.setAttribute("aria-label",i.isOpen?"Close chat":`Open chat with ${a.botName}`)),g||h){const w=i.unreadCount;w>0&&!i.isOpen?(s.textContent=w>99?"99+":String(w),s.removeAttribute("hidden"),s.setAttribute("aria-label",`${w} unread message${w!==1?"s":""}`)):s.setAttribute("hidden","")}}const p=t.subscribe(x);function b(){p(),o.removeEventListener("click",c)}return{el:o,destroy:b}}function rt(t,e,a){let r;if(a.avatarUrl){const C=d("img",{class:"header__avatar-img",src:a.avatarUrl,alt:`${a.botName} avatar`});C.addEventListener("error",()=>{C.replaceWith(n())}),r=C}else r=n();function n(){return d("span",{class:"header__avatar-fallback","aria-hidden":"true"},K(a.botName))}const s=d("span",{class:"header__status-dot",title:"Online","aria-hidden":"true"}),o=d("div",{class:"header__avatar"},r,s),c=d("div",{class:"header__name"},a.botName),x=d("div",{class:"header__subtitle"},"Active now"),p=d("div",{class:"header__info"},c,x),b=d("button",{class:"header__btn",type:"button","aria-label":"Turn on voice responses","aria-pressed":"false",title:"Voice responses",html:oe});b.setAttribute("hidden","");const i=()=>e.emit("tts-toggle");b.addEventListener("click",i);function u(C){const y=C.ttsSupported&&a.enableTTS!==!1;b.toggleAttribute("hidden",!y);const v=!!C.ttsEnabled;b.innerHTML=v?Ge:oe,b.setAttribute("aria-pressed",String(v)),b.setAttribute("aria-label",v?"Turn off voice responses":"Turn on voice responses"),b.title=v?"Voice responses: on":"Voice responses: off"}const h=d("button",{class:"header__btn header__btn--transfer",type:"button","aria-label":"Talk to a human agent",title:"Talk to a human",html:et}),g=()=>e.emit("request-transfer");h.addEventListener("click",g);function w(C){const y=C.transferState==="requested",v=C.transferState==="connected",l=C.transferState==="ended";h.classList.toggle("is-active",y||v),h.disabled=y||v||l,h.title=y?"Connecting to agent…":v?"Agent is connected":"Talk to a human"}const k=d("button",{class:"header__btn",type:"button","aria-label":"Close chat",html:Ve}),A=()=>e.emit("close");k.addEventListener("click",A);const _=d("div",{class:"header__actions"},b,h,k),S=d("header",{class:"header",role:"banner"},o,p,_);function z(C,y){(C.ttsEnabled!==(y==null?void 0:y.ttsEnabled)||C.ttsSupported!==(y==null?void 0:y.ttsSupported))&&u(C),C.transferState!==(y==null?void 0:y.transferState)&&w(C),C.agentName!==(y==null?void 0:y.agentName)&&C.agentName?x.textContent=`${C.agentName} (Human)`:C.agentName||(x.textContent=C.transferState==="requested"?"Connecting to agent…":"Active now")}const M=t.subscribe(z);u(t.getState()),w(t.getState());function D(){k.removeEventListener("click",A),b.removeEventListener("click",i),h.removeEventListener("click",g),M()}return{el:S,destroy:D}}function ce({suggestions:t=[],bus:e,messageId:a=null,ariaLabel:r="Suggested replies"}){const n=d("div",{class:"suggestions",role:"group","aria-label":r});let s=a,o=!1;function c(i){if(n.textContent="",!Array.isArray(i)||i.length===0){n.setAttribute("hidden","");return}n.removeAttribute("hidden"),i.forEach(u=>{const h=d("button",{type:"button",class:"suggestion-chip","aria-label":`Send: ${u}`});h.textContent=u,h.addEventListener("click",()=>{o||(p(!0),e.emit("suggestion-click",{text:u,messageId:s}))}),n.appendChild(h)})}function x({suggestions:i=[],messageId:u=s}={}){s=u,o=!1,c(i)}function p(i){o=!!i,n.classList.toggle("suggestions--disabled",o);for(const u of n.querySelectorAll(".suggestion-chip"))u.disabled=o,u.setAttribute("aria-disabled",String(o))}function b(){n.textContent=""}return c(t),{el:n,update:x,setDisabled:p,destroy:b}}function nt(t,e,a,r=!0){const n=t.role==="user";let s=null;if(!n)if(e.avatarUrl){const S=document.createElement("img");S.src=e.avatarUrl,S.alt="",s=d("div",{class:"bubble-avatar"},S),S.addEventListener("error",()=>{S.replaceWith(document.createTextNode(K(e.botName)))})}else s=d("div",{class:`bubble-avatar${r?"":" bubble-avatar--hidden"}`,"aria-hidden":"true"},K(e.botName));const o=d("div",{class:`bubble bubble--${n?"user":"assistant"}`});o.textContent=t.content;let c=null;if(n){c=d("div",{class:"bubble-retry-row","aria-live":"polite"}),c.setAttribute("hidden","");const S=d("button",{class:"bubble-retry-btn",type:"button","aria-label":"Retry sending this message",html:`${Ye} Retry`});S.addEventListener("click",()=>{a.emit("retry-message",{messageId:t.id,content:t.content})});const z=d("span",{class:"bubble-retry-row__text"},"Failed to send.");c.appendChild(z),c.appendChild(S)}const x=d("span",{class:"bubble-meta__time"},ae(t.timestamp));let p=null;n&&(p=d("span",{class:"bubble-meta__status","aria-hidden":"true",html:le}),p.setAttribute("hidden",""));const b=d("div",{class:`bubble-meta bubble-meta--${n?"user":"assistant"}`,"aria-label":new Date(t.timestamp).toLocaleTimeString()},x,p);let i=null;n||(i=ce({suggestions:Array.isArray(t.suggestions)?t.suggestions:[],bus:a,messageId:t.id}));const u=[o];i&&u.push(i.el),c&&u.push(c),u.push(b);const h=d("div",{class:"bubble-content"},...u),g=n?[h]:[s,h],w=d("div",{class:`bubble-wrapper bubble-wrapper--${n?"user":"assistant"}`,role:"listitem","data-message-id":t.id},...g);k(t.status);function k(S){o.classList.remove("bubble--sending","bubble--failed"),S==="sending"?(o.classList.add("bubble--sending"),c&&c.setAttribute("hidden",""),p&&p.setAttribute("hidden","")):S==="failed"?(o.classList.add("bubble--failed"),c&&c.removeAttribute("hidden"),p&&p.setAttribute("hidden","")):(c&&c.setAttribute("hidden",""),p&&(p.innerHTML=S==="delivered"?Qe:le,p.classList.toggle("bubble-meta__status--delivered",S==="delivered"),p.classList.toggle("bubble-meta__status--sent",S!=="delivered"),p.removeAttribute("hidden")))}function A(S){if(S.content!==t.content&&(o.textContent=S.content,t.content=S.content),S.status!==t.status&&(t.status=S.status,k(S.status)),S.timestamp!==t.timestamp&&(t.timestamp=S.timestamp,x.textContent=ae(S.timestamp),b.setAttribute("aria-label",new Date(S.timestamp).toLocaleTimeString())),i){const z=Array.isArray(S.suggestions)?S.suggestions:[],M=Array.isArray(t.suggestions)?t.suggestions:[];(z.length!==M.length||z.some((D,C)=>D!==M[C]))&&(t.suggestions=z,i.update({suggestions:z,messageId:t.id}))}}function _(S){s&&s.classList.toggle("bubble-avatar--hidden",!S)}return{el:w,update:A,setAvatarVisible:_}}const it=[{delayMs:1500,text:"Thinking…"},{delayMs:5e3,text:"Processing…"},{delayMs:1e4,text:"Almost ready…"}];function at(t,e){let a;if(e.avatarUrl){a=d("div",{class:"bubble-avatar"});const h=document.createElement("img");h.src=e.avatarUrl,h.alt="",h.addEventListener("error",()=>{h.replaceWith(document.createTextNode(K(e.botName)))}),a.appendChild(h)}else a=d("div",{class:"bubble-avatar","aria-hidden":"true"},K(e.botName));const r=d("div",{class:"typing-dots","aria-hidden":"true"},d("span",{class:"typing-dot"}),d("span",{class:"typing-dot"}),d("span",{class:"typing-dot"})),n=d("span",{class:"typing-label","aria-live":"polite"}),s=d("div",{class:"typing-bubble"},r,n),o=d("div",{class:"typing-indicator",role:"status","aria-label":`${e.botName} is thinking`},a,s);o.setAttribute("hidden","");let c=[];function x(){n.textContent="",n.classList.remove("typing-label--visible"),c=it.map(({delayMs:h,text:g})=>setTimeout(()=>{n.textContent=g,n.classList.add("typing-label--visible"),o.setAttribute("aria-label",`${e.botName}: ${g}`)},h))}function p(){c.forEach(clearTimeout),c=[],n.textContent="",n.classList.remove("typing-label--visible"),o.setAttribute("aria-label",`${e.botName} is thinking`)}function b(h,g){h.status!==(g==null?void 0:g.status)&&(h.status==="loading"?(o.removeAttribute("hidden"),x()):(o.setAttribute("hidden",""),p()))}const i=t.subscribe(b);function u(){p(),i()}return{el:o,destroy:u}}function st(t,e,a){const r=d("div",{class:"sr-only","aria-live":"polite","aria-atomic":"false",role:"log"});let n;if(a.avatarUrl){const l=document.createElement("img");l.src=a.avatarUrl,l.alt="",l.style.cssText="width:100%;height:100%;object-fit:cover;border-radius:50%",n=d("div",{class:"messages-welcome__avatar"},l)}else n=d("div",{class:"messages-welcome__avatar"},K(a.botName));const s=ce({suggestions:Array.isArray(a.defaultSuggestions)?a.defaultSuggestions:[],bus:e,messageId:null,ariaLabel:"Quick start options"}),o=d("div",{class:"messages-welcome__title"},`Hi, I'm ${a.botName}`),c=d("div",{class:"messages-welcome__hint"},d("span",{class:"messages-welcome__hint-icon",html:Je}),"AI Assistant"),x=d("div",{class:"messages-welcome","aria-hidden":"true"},n,c,o,d("p",{class:"messages-welcome__text"},a.welcomeMessage),s.el),{el:p,destroy:b}=at(t,a),i=d("div",{role:"list","aria-label":"Chat messages"}),u=d("span",{class:"scroll-to-bottom__count"});u.setAttribute("hidden","");const h=d("button",{type:"button",class:"scroll-to-bottom","aria-label":"Jump to latest message"},d("span",{class:"scroll-to-bottom__icon",html:Xe,"aria-hidden":"true"}),d("span",{class:"scroll-to-bottom__label"},"Latest"),u),g=d("div",{class:"messages-area","aria-label":"Messages",tabindex:"0"},x,i,p,h,r),w=new Map;let k=!1,A=0,_=0;function S(){const l=k;h.classList.toggle("is-visible",l),l||(_=0),z()}function z(){_>0?(u.textContent=_>99?"99+":String(_),u.removeAttribute("hidden")):u.setAttribute("hidden","")}g.addEventListener("scroll",()=>{const l=g.scrollHeight-g.scrollTop-g.clientHeight,m=k;k=l>60,m!==k&&S()},{passive:!0}),h.addEventListener("click",()=>{k=!1,_=0,M(!0),S()});function M(l=!1){(!k||l)&&requestAnimationFrame(()=>{g.scrollTop=g.scrollHeight})}function D(l){const m=new Set(l.map(E=>E.id));for(const[E,R]of w)m.has(E)||(R.el.remove(),w.delete(E));l.forEach((E,R)=>{var N;const P=R===l.length-1||((N=l[R+1])==null?void 0:N.role)!==E.role;if(w.has(E.id)){const{handle:Y}=w.get(E.id);Y.update(E),Y.setAvatarVisible(E.role==="assistant"&&P)}else{const Y=E.role==="assistant"&&P,F=nt(E,a,e,Y);i.appendChild(F.el),w.set(E.id,{el:F.el,handle:F}),E.role==="assistant"&&Ue(r,`${a.botName}: ${E.content}`)}})}function C(l,m){const E=l.messages!==(m==null?void 0:m.messages),R=l.status!==(m==null?void 0:m.status);if(E){const P=l.messages.length>0;if(x.setAttribute("aria-hidden",String(P)),x.style.display=P?"none":"",D(l.messages),l.messages.length>A)if(k){const F=l.messages.slice(A).filter(Q=>Q.role==="assistant").length;_+=F,z()}else M(!0);A=l.messages.length}R&&l.status==="loading"&&M(),g.setAttribute("aria-busy",String(l.status==="loading"))}const y=t.subscribe(C);C(t.getState(),null);function v(){y(),b(),s.destroy(),w.clear()}return{el:g,scrollToBottom:M,destroy:v}}const J=2e3,de=1700;function ot(t,e,a){const r=document.createElement("textarea");r.className="input-textarea",r.placeholder=`Message ${a.botName}…`,r.setAttribute("aria-label","Type a message"),r.setAttribute("rows","1"),r.setAttribute("maxlength",String(J)),r.setAttribute("autocomplete","off"),r.setAttribute("spellcheck","true");const n=d("button",{class:"send-btn",type:"button","aria-label":"Send message",html:Fe,disabled:""}),s=d("button",{class:"voice-btn",type:"button","aria-label":"Start voice input","aria-pressed":"false",html:Ke});s.setAttribute("hidden",""),s.addEventListener("click",()=>{A()||e.emit("voice-toggle")});const o=d("div",{class:"input-wrapper"},r),c=d("span",{class:"interim-transcript__dot","aria-hidden":"true"}),x=d("span",{class:"interim-transcript__text"}),p=d("div",{class:"interim-transcript",role:"status","aria-live":"polite"},c,x);p.setAttribute("hidden","");const b=d("div",{class:"input-counter","aria-live":"polite"}),i=d("div",{class:"input-area",role:"form","aria-label":"Message input"},o,s,n),u=d("div",{class:"input-container"},p,i,b);a.hideAttribution||u.appendChild(d("div",{class:"input-footer"},d("span",{class:"input-footer__text"},"Powered by AI Receptionist")));function h(){r.style.height="auto",r.style.height=`${r.scrollHeight}px`}r.addEventListener("input",()=>{h(),g(),w()});function g(){const l=r.value.trim().length>0;n.disabled=!l||A()}function w(){const l=r.value.length,m=J-l;b.classList.toggle("is-visible",l>=de),b.classList.toggle("is-warn",l>=de&&l<J),b.classList.toggle("is-limit",l>=J),b.textContent=`${m} left`}function k(){const l=r.value.trim();!l||A()||(e.emit("send",l),r.value="",r.style.height="auto",n.disabled=!0,w(),r.focus())}n.addEventListener("click",k),r.addEventListener("keydown",l=>{if((l.ctrlKey||l.metaKey)&&l.key.toLowerCase()==="m"){!s.hasAttribute("hidden")&&!A()&&(l.preventDefault(),e.emit("voice-toggle"));return}l.key==="Enter"&&!l.shiftKey&&(l.preventDefault(),k())});function A(){const l=t.getState();return l.status==="loading"||l.online===!1}function _(l){r.disabled=l,o.classList.toggle("is-disabled",l),l?n.disabled=!0:g()}function S(l){l.online===!1?r.placeholder="You are offline — messages will resume once reconnected":l.voiceState==="listening"?r.placeholder="Listening… speak now or click mic to stop":l.status==="loading"?r.placeholder=`${a.botName} is thinking…`:r.placeholder=`Message ${a.botName}…`}function z(l){const m=l.sttSupported&&a.enableVoice!==!1;s.toggleAttribute("hidden",!m);const E=l.voiceState==="listening";s.classList.toggle("is-listening",E),s.setAttribute("aria-pressed",String(E)),s.setAttribute("aria-label",E?"Stop voice input":"Start voice input")}function M(l){const m=l.voiceState==="listening"&&typeof l.interimTranscript=="string"&&l.interimTranscript.trim().length>0;p.toggleAttribute("hidden",!m),m&&(x.textContent=l.interimTranscript)}function D(l,m){(l.status!==(m==null?void 0:m.status)||l.online!==(m==null?void 0:m.online))&&_(A()),(l.status!==(m==null?void 0:m.status)||l.online!==(m==null?void 0:m.online)||l.voiceState!==(m==null?void 0:m.voiceState))&&S(l),(l.voiceState!==(m==null?void 0:m.voiceState)||l.sttSupported!==(m==null?void 0:m.sttSupported))&&z(l),(l.interimTranscript!==(m==null?void 0:m.interimTranscript)||l.voiceState!==(m==null?void 0:m.voiceState))&&M(l)}const C=t.subscribe(D);D(t.getState(),null),w();function y(){requestAnimationFrame(()=>r.focus())}function v(){C()}return{el:u,focus:y,destroy:v}}function lt(t,e){const a=d("span",{class:"error-banner__icon",html:qe,"aria-hidden":"true"}),r=d("span",{class:"error-banner__text"}),n=d("button",{class:"error-banner__retry",type:"button","aria-label":"Retry"},"Retry"),s=d("button",{class:"error-banner__dismiss",type:"button","aria-label":"Dismiss error",html:se}),o=d("div",{class:"error-banner",role:"alert","aria-live":"assertive"},a,r,n,s);o.setAttribute("hidden",""),n.addEventListener("click",()=>{e.emit("retry-last")}),s.addEventListener("click",()=>{e.emit("dismiss-error")});function c(b,i){b.error!==(i==null?void 0:i.error)&&(b.error?(r.textContent=b.error.message,n.style.display=b.error.retryable?"":"none",o.removeAttribute("hidden")):o.setAttribute("hidden",""))}const x=t.subscribe(c);function p(){x()}return{el:o,destroy:p}}function ct(t){const e=d("div",{class:"offline-banner",role:"status","aria-live":"polite"},d("span",{html:Ze,"aria-hidden":"true"}),d("span",null,"You are offline — we will reconnect automatically"));e.setAttribute("hidden","");function a(n,s){n.online!==(s==null?void 0:s.online)&&e.toggleAttribute("hidden",n.online!==!1)}const r=t.subscribe(a);return{el:e,destroy(){r()}}}function dt(t,e,{onDestroy:a}={}){var fe,be;const r=document.createElement("style");r.textContent=[We(e),De(e),je(),He()].join(`
`),t.appendChild(r);const n=ve(e.apiKey,e.sessionTtlHours),s=n.load(),o=(fe=s==null?void 0:s.sessionId)!=null?fe:n.createNew(),c=(be=s==null?void 0:s.messages)!=null?be:[];e.sessionId=o;const x=Ie(),p=Ee({lang:e.voiceLang||"en-US",onResult:({text:f,isFinal:I})=>{I?(i.setState({interimTranscript:""}),f&&g.emit("send",f)):i.setState({interimTranscript:f})},onError:f=>{i.setState({voiceState:"idle",interimTranscript:"",error:{message:f.message,retryable:!1,failedMessageId:null}})},onStateChange:f=>{f!=="listening"?i.setState({voiceState:f,interimTranscript:""}):i.setState({voiceState:f})}}),b=Te({enabled:!!e.enableSounds,volume:typeof e.soundVolume=="number"?e.soundVolume:.18}),i=ye(xe(o,c,{sttSupported:p.sttSupported,ttsSupported:p.ttsSupported,ttsEnabled:p.ttsSupported&&e.enableTTS!==!1&&!!e.ttsDefaultOn,online:x.isOnline()}));p.setMuted(!i.getState().ttsEnabled);let u=null;i.subscribe(f=>{clearTimeout(u),u=setTimeout(()=>{n.save(f.sessionId,f.messages)},300)});const h=x.subscribe(f=>{i.setState({online:f})}),g=$e(),{el:w}=tt(i,g,e),{el:k,destroy:A}=rt(i,g,e),{el:_,destroy:S}=ct(i),{el:z,scrollToBottom:M}=st(i,g,e),{el:D}=lt(i,g),{el:C,focus:y}=ot(i,g,e),v=document.createElement("div");v.className="widget-window",v.setAttribute("role","dialog"),v.setAttribute("aria-modal","true"),v.setAttribute("aria-label",`Chat with ${e.botName}`),v.setAttribute("aria-hidden","true"),v.appendChild(k),v.appendChild(_),v.appendChild(z),v.appendChild(D),v.appendChild(C),t.appendChild(v),t.appendChild(w);const l=Be(v);let m=w;g.on("toggle",()=>{const{isOpen:f}=i.getState();f?R():E()}),g.on("close",()=>{R(),n.clear();const f=n.createNew();e.sessionId=f,i.setState({sessionId:f,messages:[],status:"idle",error:null,transferState:"none",agentName:null,unreadCount:0})}),g.on("send",f=>{F(f)}),g.on("retry-last",()=>{const{messages:f}=i.getState(),I=[...f].reverse().find(T=>T.role==="user"&&T.status==="failed");I&&Q(I)}),g.on("retry-message",({messageId:f,content:I})=>{const{messages:T}=i.getState(),L=T.find(O=>O.id===f);L&&Q(L)}),g.on("dismiss-error",()=>{i.setState({error:null})}),g.on("suggestion-click",({text:f,messageId:I})=>{I&&i.setState(T=>({messages:T.messages.map(L=>L.id===I?V($({},L),{suggestions:[]}):L)})),F(f)}),g.on("voice-toggle",()=>{const f=i.getState();f.status!=="loading"&&(f.voiceState==="listening"?p.stopListening():(p.cancelSpeaking(),p.startListening()))}),g.on("tts-toggle",()=>{const f=!i.getState().ttsEnabled;i.setState({ttsEnabled:f}),p.setMuted(!f),f||p.cancelSpeaking()}),g.on("request-transfer",()=>{Y()});function E(){i.setState({isOpen:!0,unreadCount:0}),v.classList.add("is-open"),v.removeAttribute("aria-hidden"),l.activate(null),y(),M(!0),v.setAttribute("aria-label",`Chat with ${e.botName} — dialog`)}function R(){i.setState({isOpen:!1}),v.classList.remove("is-open"),v.setAttribute("aria-hidden","true"),l.deactivate(m),p.stopListening(),p.cancelSpeaking()}const P=f=>{f.key==="Escape"&&i.getState().isOpen&&R()};document.addEventListener("keydown",P);let N=null;async function Y(){if(i.getState().transferState!=="none"||!e.apiKey||!e.apiUrl)return;i.setState({transferState:"requested",status:"loading"});const I={id:q(),role:"assistant",content:"🔄 Connecting you to a human agent. Please hold on…",timestamp:Date.now(),status:"sent",isSystem:!0};i.setState(L=>({messages:[...L.messages,I],status:"idle"}));try{await Oe(e)}catch(L){i.setState({transferState:"none",error:{message:"Could not connect to a human agent right now. Please try again.",retryable:!0,failedMessageId:null},status:"error"});return}const T=e.apiUrl.replace(/\/api\/chat.*$/,"");try{let L=typeof window!="undefined"&&window.io;L||(await new Promise((O,U)=>{const j=document.createElement("script");j.src=`${T}/socket.io/socket.io.js`,j.onload=O,j.onerror=U,document.head.appendChild(j)}),L=window.io),L&&(N=L(T,{transports:["websocket","polling"]}),N.on("connect",()=>{N.emit("join-session",{sessionId:e.sessionId,tenantId:e.apiKey})}),N.on("agent-joined",({agentName:O})=>{i.setState({transferState:"connected",agentName:O});const U={id:q(),role:"assistant",content:`✅ ${O} has joined the conversation.`,timestamp:Date.now(),status:"sent",isSystem:!0};i.setState(j=>({messages:[...j.messages,U]})),M(!0)}),N.on("new-message",({content:O,isHuman:U,agentName:j})=>{if(!U)return;const Z={id:q(),role:"assistant",content:O,timestamp:Date.now(),status:"sent"};i.setState(ee=>({messages:[...ee.messages,Z]})),b.play("receive"),i.getState().isOpen||i.setState(ee=>({unreadCount:ee.unreadCount+1})),M(!0)}),N.on("session-ended",()=>{i.setState({transferState:"ended",agentName:null});const O={id:q(),role:"assistant",content:"The conversation has been closed by the agent.",timestamp:Date.now(),status:"sent",isSystem:!0};i.setState(U=>({messages:[...U.messages,O]})),N&&N.disconnect(),N=null}))}catch(L){console.warn("[AI Widget] Socket.IO unavailable; transfer request sent via REST.",L)}}async function F(f){const I=i.getState();if(I.status==="loading")return;const T={id:q(),role:"user",content:f,timestamp:Date.now(),status:"sending"};if(i.setState(L=>({messages:[...L.messages,T],status:"idle",error:null})),b.play("send"),I.transferState==="connected"&&(N!=null&&N.connected)){N.emit("patient-message",{sessionId:e.sessionId,content:f}),i.setState(L=>({messages:L.messages.map(O=>O.id===T.id?V($({},O),{status:"sent"}):O)}));return}i.setState({status:"loading"}),await ge(T)}async function Q(f){i.setState(I=>({messages:I.messages.map(T=>T.id===f.id?V($({},T),{status:"sending"}):T),status:"loading",error:null})),await ge(f)}async function ge(f){i.setState(I=>({messages:I.messages.map(T=>T.id===f.id?V($({},T),{status:"sent"}):T)}));try{const I=i.getState().messages.filter(U=>U.status!=="failed"),{reply:T,suggestions:L}=await ze(I,e),O={id:q(),role:"assistant",content:T,timestamp:Date.now(),status:"sent",suggestions:L};i.setState(U=>({messages:[...U.messages.map(j=>{var Z;return j.role==="assistant"&&((Z=j.suggestions)!=null&&Z.length)?V($({},j),{suggestions:[]}):j}),O],status:"idle",error:null})),i.getState().isOpen||i.setState(U=>({unreadCount:U.unreadCount+1})),b.play("receive"),i.getState().ttsEnabled&&p.speak(T)}catch(I){const T=Ne(I);i.setState(L=>({messages:L.messages.map(O=>O.id===f.id?V($({},O),{status:"failed"}):O),status:"error",error:{message:T.message,retryable:T.retryable,failedMessageId:f.id}})),b.play("error"),console.error("[AI Widget] API call failed:",I)}}function gt(){document.removeEventListener("keydown",P),g.clear(),u&&clearTimeout(u);try{h()}catch(f){}try{x.destroy()}catch(f){}try{p.destroy()}catch(f){}try{b.destroy()}catch(f){}try{A()}catch(f){}try{S()}catch(f){}try{N&&N.disconnect()}catch(f){}try{a==null||a()}catch(f){}}return{open:E,close:R,toggle:()=>i.getState().isOpen?R():E(),destroy:gt,on:(f,I)=>g.on(f,I),off:(f,I)=>g.off(f,I),getState:()=>$({},i.getState())}}const ue="ai-receptionist-widget-host";function ut(t){if(document.getElementById(ue))return console.warn("[AI Widget] Already initialized. Call window.LinorWidget.destroy() first to re-mount."),typeof window!="undefined"&&window.LinorWidget||null;const e=document.createElement("div");e.id=ue,e.style.cssText=["position: fixed","z-index: 2147483647","top: 0","left: 0","width: 0","height: 0","overflow: visible","pointer-events: none"].join("; ");const a=e.attachShadow({mode:"closed"});document.body.appendChild(e);const r=dt(a,t,{onDestroy:()=>{e.remove(),typeof window!="undefined"&&window.LinorWidget===r&&delete window.LinorWidget}});return r}const pt=typeof document!="undefined"?document.currentScript:null;function pe(){const t=W(pt);if(!t.apiKey||!t.apiUrl)return;const e=ut(t);e&&typeof window!="undefined"&&(window.LinorWidget=e)}typeof document!="undefined"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",pe,{once:!0}):pe())})();
//# sourceMappingURL=widget.js.map
