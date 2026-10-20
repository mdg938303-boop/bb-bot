/*CMD
  command: live_support_send
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

let userMsg = message;
let admin_id = Bot.getProperty("setup_owner_id", "");
if (!admin_id || user.telegramid.toString() !== admin_id) { return; }

Bot.sendMessage("✅ *আপনার মেসেজটি অ্যাডমিনের কাছে পাঠানো হয়েছে!* অনুগ্রহ করে লাইভ চ্যাটে অপেক্ষা করুন, অ্যাডমিন রিপ্লাই দিলে আপনি এখানে নোটিফিকেশন পাবেন।");

// অ্যাডমিনের কাছে নোটিফিকেশন পাঠানো
let ticketMsg = "🎫 *[NEW SUPPORT TICKET]*\n" +
                "───────────────────────\n" +
                "👤 *User:* " + user.first_name + "\n" +
                "🆔 *ID:* `" + user.telegramid + "`\n\n" +
                "💬 *Message:* \n" + userMsg + "\n" +
                "───────────────────────\n" +
                "👇 *রিপ্লাই দিতে নিচের বাটনে চাপুন:*";

let buttons = [
    [{title: "✍️ REPLY TO USER", command: "reply_to_user " + user.telegramid}]
];

Bot.sendInlineKeyboardToChatWithId(admin_id, buttons, ticketMsg);

