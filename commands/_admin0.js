/*CMD
  command: /admin0
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
if (!admin_id || user.telegramid.toString() !== admin_id) { Bot.sendMessage("🔒 আগে বট ডিপ্লয় করে /setup চালিয়ে অ্যাডমিন সেট করুন।"); return; }

// /admin কমান্ডের ইনলাইন বাটন ডিজাইন
let mainAdminButtons = [
    [{ title: "📊 Admin1 (Statistics)", command: "Admin1" }],
    [{ title: "📢 Admin2 (Broadcast)", command: "Admin2" }],
    [{ title: "⚙️ Admin3 (User Edit)", command: "Admin3" }],
    [{ title: "🔒 Admin4 (Settings)", command: "Admin4" }]
];
Bot.sendInlineKeyboard(mainAdminButtons, "👋 *হ্যালো এডমিন! কোন প্যানেলটি ওপেন করতে চান সিলেক্ট করুন:*");

