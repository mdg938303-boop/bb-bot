/*CMD
  command: send_broadcast_to_all
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

// ১. আবার সিকিউরিটি চেক (নিরাপত্তার জন্য)
let admin_id = Bot.getProperty("setup_owner_id", "");
if (!admin_id || user.telegramid.toString() !== admin_id) { return; }

// ২. অ্যাডমিন যে নোটিফিকেশনটি লিখেছেন তা ভেরিয়েবলে নেওয়া
let adminNotice = message; 

if (!adminNotice) {
    Bot.sendMessage("❌ মেসেজটি খালি রাখা যাবে না! আবার চেষ্টা করুন।");
    return;
}

// ৩. ডাটাবেজ থেকে সব ইউজারের লিস্ট তুলে আনা (আপনার /start কমান্ডের অল ইউজার লিস্ট)
let userList = Bot.getProperty("all_users_list", []);

if (userList.length === 0) {
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

// 👑 কাজ শেষে অ্যাডমিনকে কনফার্মেশন রিপোর্ট পাঠানো
let reportMsg = "┌───────────────────┐\n" +
                "✅     *BROADCAST COMPLETED* \n" +
                "└───────────────────┘\n\n" +
                "🚀 *ব্রডকাস্ট সফলভাবে সম্পন্ন হয়েছে!*\n\n" +
                "📊 *মোট ডেলিভারি:* `" + successCount + " জন ইউজারের কাছে।`";

Bot.sendMessage(reportMsg);

