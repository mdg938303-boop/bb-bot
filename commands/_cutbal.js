/*CMD
  command: /cutbal
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
let rate = parseFloat(Bot.getProperty("global_dollar_rate", 120)) || 120;

if (!targetUser || isNaN(amountTk) || amountTk <= 0) {
    Bot.sendMessage("❌ ভুল ফরম্যাট! সঠিক নিয়ম: `/cutbal <ইউজার_আইডি> <টাকা>`");
    return;
}

// ডাটাবেজ থেকে বর্তমান ব্যালেন্স আনা ও মাইনাস করা
let currentBalTk = Bot.getProperty("bal_" + targetUser, 0);
let newBalTk = parseFloat(currentBalTk) - amountTk;
if (newBalTk < 0) { newBalTk = 0; } // ব্যালেন্স মাইনাসের নিচে যাবে না
Bot.setProperty("bal_" + targetUser, newBalTk, "float");

let amountUSDT = amountTk / rate;

// ইউজারের জন্য নোটিফিকেশন
let userNotification = "┌───────────────────┐\n" +
                        "📉         *BALANCE DEDUCTED* \n" +
                        "└───────────────────┘\n\n" +
                        "⚠️ *আপনার অ্যাকাউন্ট থেকে ব্যালেন্স কর্তন করা হয়েছে।*\n\n" +
                        "💵 *কেটে নেওয়া পরিমাণ:* `-" + amountTk.toFixed(2) + " BDT` (~" + amountUSDT.toFixed(4) + " USDT)\n" +
                        "💰 *বর্তমান মোট ব্যালেন্স:* `" + (newBalTk / rate).toFixed(4) + " USDT`";
Bot.sendMessageToChatWithId(targetUser, userNotification);

// অ্যাডমিনকে কনফার্মেশন পাঠানো
Bot.sendMessage("📉 সফলভাবে ইউজার `" + targetUser + "` এর অ্যাকাউন্ট থেকে `" + amountTk + " টাকা` কেটে নেওয়া হয়েছে।");

