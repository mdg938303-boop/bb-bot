/*CMD
  command: /checkrate
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

// শুধুমাত্র অ্যাডমিনরা দেখতে পারবে
let admin_id = Bot.getProperty("setup_owner_id", "");
if (!admin_id || user.telegramid.toString() !== admin_id) { return; }

// ডাটাবেজ থেকে ডাটাগুলো তুলে আনা
let fbRate = Bot.getProperty("global_fb_rate", 4.00);
let gmRate = Bot.getProperty("global_gm_rate", 16.00);
let dollarRate = Bot.getProperty("global_dollar_rate", 120);

// মেসেজ ফরম্যাট
let checkMsg = "📊 *বর্তমান রেট সেটিং রিপোর্ট :*\n\n" +
               "💵 *ফেসবুক টাস্ক রেট :* `" + fbRate + " BDT`\n" +
               "📧 *জিমেইল টাস্ক রেট :* `" + gmRate + " BDT`\n" +
               "🌐 *ডলার কনভার্সন রেট :* `১$ = " + dollarRate + " BDT`\n\n" +
               "💡 *পরিবর্তন করতে চাইলে ব্যবহার করুন :*\n" +
               "`/setfb`, `/setgm`, `/setrate`";

Bot.sendMessage(checkMsg);

