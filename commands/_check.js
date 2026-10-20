/*CMD
  command: /check
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
let rate = 120;

if (!targetUser) {
    Bot.sendMessage("❌ ভুল ফরম্যাট! সঠিক নিয়ম: `/check <ইউজার_আইডি>`");
    return;
}

// ডাটাবেজ থেকে ইউজারের সমস্ত স্ট্যাটাস তুলে আনা
let userBalTk = Bot.getProperty("bal_" + targetUser, 0);
let userBalUSDT = userBalTk / rate;

let totalApproved = Bot.getProperty("app_task_" + targetUser, 0);
let totalPending = Bot.getProperty("pen_task_" + targetUser, 0);
let totalRejected = Bot.getProperty("rej_task_" + targetUser, 0);

let checkMsg = "┌───────────────────┐\n" +
               "🔍        *USER LIVE INFO CARD* \n" +
               "└───────────────────┘\n\n" +
               "🆔 *ইউজার আইডি:* `" + targetUser + "`\n" +
               "───────────────────────\n" +
               "💰 *বর্তমান ওয়ালেট ব্যালেন্স:*\n" +
               "└ `" + parseFloat(userBalTk).toFixed(2) + " BDT`\n" +
               "└ `" + userBalUSDT.toFixed(4) + " USDT`\n\n" +
               "📊 *টাস্ক পরিসংখ্যান (Task Stats):*\n" +
               "✅ *Approved :* `" + totalApproved + "`\n" +
               "⏳ *Pending  :* `" + totalPending + "`\n" +
               "❌ *Rejected :* `" + totalRejected + "`";

Bot.sendMessage(checkMsg);

