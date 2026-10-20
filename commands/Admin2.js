/*CMD
  command: Admin2
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

// ১. মাল্টি-অ্যাডমিন ভেরিফিকেশন (আপনার ও আপনার পার্টনারের আইডি)
let admin_id = Bot.getProperty("setup_owner_id", "");
if (!admin_id || user.telegramid.toString() !== admin_id) { return; }

// ২. ব্রডকাস্ট প্যানেল মেসেজ
let broadcastMsg = "┌───────────────────┐\n" +
                   "📢       *BROADCAST PANEL (Admin2)* \n" +
                   "└───────────────────┘\n\n" +
                   "👋 অ্যাডমিন ভাই,\n" +
                   "বটের সকল মেম্বারদের উদ্দেশ্যে আপনার নোটিফিকেশন বা মেসেজটি লিখুন।\n\n" +
                   "⚠️ *নির্দেশনা:* আপনার নোটিফিকেশন মেসেজের শুরুতে অবশ্যই `📢` (মাইক ইমোজি) দিয়ে তারপর স্পেস দিয়ে মেসেজটি লিখুন।\n\n" +
                   "👉 *উদাহরণ:* `📢 আজ রাত ১০টায় নতুন কাজ আসবে।`";

Bot.sendMessage(broadcastMsg);

