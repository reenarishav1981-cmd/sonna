// Notification stub — logs only for now. Swap the body of notify() for a real
// SMS/WhatsApp/email provider (e.g. Twilio, MSG91, Nodemailer) when ready.
// Kept as a single choke point so that swap is a one-file change.
export async function notify(event, payload) {
  console.log(`[notify] ${event}`, JSON.stringify(payload));
  // TODO: integrate real provider here, e.g.:
  // if (event === "lead.created") await smsClient.send(payload.mobile, "...");
  return { sent: false, simulated: true };
}
