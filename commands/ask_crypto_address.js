/*CMD
  command: ask_crypto_address
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let input = message.trim();

// ক্রিপ্টো ওয়ালেট অ্যাড্রেস ভ্যালিডেশন (0x দিয়ে শুরু এবং দৈর্ঘ্য চেক)
if (!input.startsWith("0x") || input.length < 40) {
    Bot.sendMessage("❌ *ভুল ওয়ালেট অ্যাড্রেস!*\n\n⚠️ সঠিক *BSC (BEP-20)* অ্যাড্রেসটি (0x দিয়ে শুরু) আবার পাঠান।");
    Bot.run({ command: "ask_crypto_address", options: { mode: "text" } });
    return;
}

User.setProperty("wd_number", input, "string");
let method = User.getProperty("wd_method");

let msg = "┌───────────────────┐\n" +
          "💰    *ENTER AMOUNT* \n" +
          "└───────────────────┘\n\n" +
          "💳 মেথড: `" + method + "`\n" +
          "🔑 অ্যাড্রেস: `" + input + "`\n\n" +
          "👉 কত USDT তুলতে চান সংখ্যায় লিখুন:";

Bot.run({
    command: "ask_wd_amount", // আপনার আগের অ্যামাউন্ট নেওয়ার কমান্ড
    options: { mode: "text" }
});

Bot.sendMessage(msg);

