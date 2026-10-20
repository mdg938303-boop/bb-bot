/*CMD
  command: BSC (BEP-20)
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

User.setProperty("wd_method", "BSC (BEP-20)", "string"); 

let msg = "┌───────────────────┐\n" +
          "🪙    *BSC (BEP-20) WALLET* \n" +
          "└───────────────────┘\n\n" +
          "👉 আপনার *Trust Wallet* অথবা *Binance* থেকে **USDT (BEP-20)** রিসিভ অ্যাড্রেসটি কপি করে নিচে পাঠান:\n\n" +
          "⚠️ *সতর্কতা:* ভুল অ্যাড্রেস দিলে পেমেন্ট পাবেন না।";

Bot.run({
    command: "ask_crypto_address",
    options: { mode: "text" }
});

Bot.sendMessage(msg);

