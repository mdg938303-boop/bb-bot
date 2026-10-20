/*CMD
  command: 📢
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

// ২. ইমোজি বাদে বাকি টেক্সটটুকু নোটিফিকেশন হিসেবে নেওয়া
let adminNotice = message.replace("📢", "").trim(); 

if (!adminNotice || adminNotice === "") {
    Bot.sendMessage("❌ মাইক ইমোজির পর আপনার নোটিফিকেশন মেসেজটি লিখুন!");
    return;
}

// ৩. ডাটাবেজ থেকে অল ইউজার লিস্ট নিয়ে আসা
let userList = Bot.getProperty("all_users_list", []);

if (!userList || userList.length === 0) {
    Bot.sendMessage("❌ ডাটাবেজে কোনো ইউজার খুঁজে পাওয়া যায়নি!");
    return;
}

// 🎨 ব্রডকাস্ট মেসেজের প্রিমিয়াম ডিজাইন
let finalNoticeMsg = "┌───────────────────┐\n" +
                     "📢      *OFFICIAL ANNOUNCEMENT* \n" +
                     "└───────────────────┘\n\n" +
                     adminNotice + "\n\n" +
                     "───────────────────────\n" +
                     "🤖 _ADMIN MESSAGE_";

// 🔄 লুপ চালিয়ে সবার ইনবক্সে মেসেজ পাঠানো
let successCount = 0;
for (let i = 0; i < userList.length; i++) {
    let targetUser = userList[i];
    if (targetUser) {
        Bot.sendMessageToChatWithId(targetUser, finalNoticeMsg);
        successCount++;
    }
}

// 👑 অ্যাডমিনকে সাকসেস রিপোর্ট পাঠানো
let reportMsg = "┌───────────────────┐\n" +
                "✅     *BROADCAST COMPLETED* \n" +
                "└───────────────────┘\n\n" +
                "🚀 *ব্রডকাস্ট সফলভাবে সম্পন্ন হয়েছে!*\n\n" +
                "📊 *মোট ডেলিভারি:* `" + successCount + " জন ইউজারের কাছে।`";

Bot.sendMessage(reportMsg);

