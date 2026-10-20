/*CMD
  command: reply_to_user
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

let admin_id = Bot.getProperty("setup_owner_id", "");
if (!admin_id || user.telegramid.toString() !== admin_id) { return; }

let targetUser = params.trim(); // আইডিটি ক্লিন করে নেওয়া হলো

// গ্লোবাল প্রপার্টিতে সেভ করা হলো যাতে সেশন চেঞ্জ হলেও আইডি ডিলিট না হয়
Bot.setProperty("current_reply_target_" + admin_id, targetUser, "string");

Bot.sendMessage("⌨️ ইউজার আইডি `" + targetUser + "` এর জন্য আপনার রিপ্লাই মেসেজটি লিখুন:");
Bot.runCommand("send_reply_to_user");

