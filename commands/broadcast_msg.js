/*CMD
  command: broadcast_msg
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

let admin_id = Bot.getProperty("setup_owner_id", ""); // আপনার এডমিন আইডি
if (!admin_id || user.telegramid.toString() !== admin_id) { return; }

let broadcastText = message; // অ্যাডমিন যে মেসেজটি পাঠালেন
let userList = Bot.getProperty("all_users_list", []);

if (!userList || userList.length == 0) {
    Bot.sendMessage("❌ আপনার বটে এখনো কোনো ইউজার ডাটাবেজ তৈরি হয়নি বা কোনো ইউজার নেই।");
    return;
}

Bot.sendMessage("⏳ ব্রডকাস্ট শুরু হয়েছে... মোট " + userList.length + " জন ইউজারের কাছে মেসেজ পাঠানো হচ্ছে।");

let successCount = 0;

// লুপ চালিয়ে সবার কাছে মেসেজ পাঠানো হচ্ছে
for (let i = 0; i < userList.length; i++) {
    let targetUser = userList[i];
    
    // বট বিজনেস এর মাধ্যমে নির্দিষ্ট আইডিতে মেসেজ পাঠানো
    Bot.sendMessageToChatWithId(targetUser, "📢 *[ADMIN NOTICE]*\n\n" + broadcastText);
    successCount++;
}

// কাজ শেষ হলে অ্যাডমিনকে রিপোর্ট দেওয়া
Bot.sendMessage("✅ *ব্রডকাস্ট সফলভাবে সম্পন্ন হয়েছে!*\n🎯 মোট " + successCount + " জন ইউজারের ইনবক্সে মেসেজটি পৌঁছে গেছে।");

