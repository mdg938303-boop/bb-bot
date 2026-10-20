/*CMD
  command: send_reply_to_user
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

let admin_id = Bot.getProperty("setup_owner_id", "");
if (!admin_id || user.telegramid.toString() !== admin_id) { return; }

// গ্লোবাল প্রপার্টি থেকে আইডিটি তুলে আনা হলো
let targetUser = Bot.getProperty("current_reply_target_" + admin_id);
let adminReply = message;

if (!targetUser) {
    Bot.sendMessage("❌ দুঃখিত! কোনো কারণে ইউজার আইডিটি খুঁজে পাওয়া যায়নি। দয়া করে আবার বাটনে ক্লিক করে চেষ্টা করুন।");
    return;
}

// ইউজারের কাছে রিপ্লাই পাঠানো (নিরাপদ লজিক)
Bot.sendMessageToChatWithId(targetUser, "🔔 *[SUPPORT REPLY]*\n───────────────────────\n" + adminReply + "\n───────────────────────");

// অ্যাডমিনকে (আপনাকে) কনফার্মেশন দেওয়া
Bot.sendMessage("✅ ইউজার আইডি `" + targetUser + "` এর কাছে আপনার রিপ্লাইটি সফলভাবে পাঠানো হয়েছে।");

// কাজ শেষে মেমোরি ক্লিন করা
Bot.setProperty("current_reply_target_" + admin_id, null);

