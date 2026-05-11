

async function test() {
  const res = await fetch("http://localhost:5003/api/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "sk_test"
    },
    body: JSON.stringify({
      patientName: "Test",
      phone: "123",
      date: "2026-05-03",
      time: "10:00 AM",
      service: "Consultation",
      sessionId: "abc"
    })
  });
  console.log(res.status);
  const text = await res.text();
  console.log(text);
}
test();
