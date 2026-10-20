/*CMD
  command: 💳 Withdraw
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

let bal_tk = parseFloat(Bot.getProperty("bal_" + user.telegramid, 0)); // ডাটাবেজ থেকে মূল টাকা আনা হলো

// 💡 ডাটাবেজ থেকে লেটেস্ট ডলার রেট নেওয়া (সেট করা না থাকলে ১২০ ধরবে)
let rate = parseFloat(Bot.getProperty("global_dollar_rate", 120)); 

let bal = bal_tk / rate; // টাকাকে নিখুঁতভাবে USDT ডলারে রূপান্তর করা হলো

// সর্বনিম্ন উইথড্র লিমিট ০.২০ USDT
if (bal < 0.20) {
    // ⚠️ পর্যাপ্ত ব্যালেন্স না থাকলে প্রিমিয়াম অ্যালার্ট কার্ড
    let alertMsg = "┌───────────────────┐\n" +
                   "⚠️      *INSUFFICIENT BALANCE* \n" +
                   "└───────────────────┘\n\n" +
                   "🛑 *দুঃখিত! আপনার অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স নেই।*\n\n" +
                   "💵 *সর্বনিম্ন উত্তোলন :* `0.2000 USDT`\n" +
                   "💰 *আপনার বর্তমান ব্যালেন্স :* `" + bal.toFixed(4) + " USDT`\n\n" +
                   "💡 আরও টাস্ক কমপ্লিট করুন অথবা বন্ধুদের রেফার করে ব্যালেন্স বাড়িয়ে নিন।";
                   
    Bot.sendMessage(alertMsg);
} else {
    // 💳 পর্যাপ্ত ব্যালেন্স থাকলে পেমেন্ট গেটওয়ে কার্ড
    let successMsg = "┌───────────────────┐\n" +
                     "💳     *SECURE PAYMENT GATEWAY* \n" +
                     "└───────────────────┘\n\n" +
                     "🎉 *অভিনন্দন! আপনার অ্যাকাউন্ট ব্যালেন্স উত্তোলনের জন্য প্রস্তুত।*\n\n" +
                     "💰 *উত্তোলনযোগ্য ব্যালেন্স :* `" + bal.toFixed(4) + " USDT`\n\n" +
                     "👇 নিচে দেওয়া মেনু থেকে আপনার প্রিয় *পেমেন্ট মেথডটি* সিলেক্ট করুন:";
                     
    Bot.sendKeyboard("Bkash, Nagad\nBSC (BEP-20)\n🔙 Back to home", successMsg);
}

