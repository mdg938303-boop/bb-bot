/*CMD
  command: ask_wd_number
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
let method = User.getProperty("wd_method", "Wallet");

// 📱 মোবাইল নাম্বারের লজিক (শুধুমাত্র ১১ বা ১২ ডিজিটের সংখ্যা গ্রহণ করবে)
if (isNaN(input) || input.length < 11 || input.length > 12) {
    Bot.sendMessage("❌ *ভুল মোবাইল নাম্বার!*\n\n⚠️ দয়া করে একটি সঠিক ১১ বা ১২ ডিজিটের সচল নম্বর টাইপ করে আবার পাঠান।");
    return;
}

// ইনপুটটি সঠিক হলে তা ডাটাবেজে সেভ করা হলো
User.setProperty("wd_number", input, "string");

// 💰 ইউজারের কাছ থেকে উইথড্রর পরিমাণ (Amount) চাওয়ার মেসেজ
let msg = "┌───────────────────┐\n" +
          "💰        *ENTER WITHDRAW AMOUNT* \n" +
          "└───────────────────┘\n\n" +
          "💵 মেথড: `" + method + "`\n" +
          "🔑 নম্বর: `" + input + "`\n" +
          "───────────────────────\n\n" +
          "👉 আপনি কত **USDT** উত্তোলন করতে চান, তা সংখ্যায় টাইপ করে পাঠান:\n" +
          "ℹ️ (যেমন: `0.50` অথবা `1.25` অথবা `5`)";

// পরবর্তী কমান্ড হিসেবে ask_wd_amount লক করা হলো
Bot.run({
    command: "ask_wd_amount",
    options: { mode: "text" }
});

Bot.sendMessage(msg);
