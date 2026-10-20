/*CMD
  command: /addbal
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

// ১. সিকিউরিটি চেক
let admin_id = Bot.getProperty("setup_owner_id", "");
if (!admin_id || user.telegramid.toString() !== admin_id) { return; }

let data = message.split(" ");
let targetUser = data[1];
let amountTk = parseFloat(data[2]);
let rate = parseFloat(Bot.getProperty("global_dollar_rate", 120)) || 120; // কনভার্সন রেট

if (!targetUser || isNaN(amountTk) || amountTk <= 0) {
    Bot.sendMessage("❌ ভুল ফরম্যাট! সঠিক নিয়ম: `/addbal <ইউজার_আইডি> <টাকা>`");
    return;
}

// ডাটাবেজ থেকে বর্তমান ব্যালেন্স আনা ও আপডেট করা
let currentBalTk = Bot.getProperty("bal_" + targetUser, 0);
let newBalTk = parseFloat(currentBalTk) + amountTk;
Bot.setProperty("bal_" + targetUser, newBalTk, "float");

let amountUSDT = amountTk / rate;

// ইউজারের জন্য সাকসেস মেসেজ পাঠানো
let userNotification = "┌───────────────────┐\n" +
                        "💰        *BALANCE CREDITED* \n" +
                        "└───────────────────┘\n\n" +
                        "🎉 *আপনার অ্যাকাউন্টে ব্যালেন্স যোগ করা হয়েছে!*\n\n" +
                        "💵 *যোগকৃত পরিমাণ:* `+" + amountTk.toFixed(2) + " BDT` (~" + amountUSDT.toFixed(4) + " USDT)\n" +
                        "💰 *বর্তমান মোট ব্যালেন্স:* `" + (newBalTk / rate).toFixed(4) + " USDT`";
Bot.sendMessageToChatWithId(targetUser, userNotification);

// অ্যাডমিনকে কনফার্মেশন পাঠানো
Bot.sendMessage("✅ সফলভাবে ইউজার `" + targetUser + "` এর অ্যাকাউন্টে `" + amountTk + " টাকা` যোগ করা হয়েছে।");

