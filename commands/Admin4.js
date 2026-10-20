/*CMD
  command: Admin4
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

let currentRate = Bot.getProperty("conversion_rate", 120);
let taskStatus = Bot.getProperty("task_status", "✅ Active (ON)");

let settingMsg = "┌───────────────────┐\n" +
                 "🔒       *SYSTEM SETTINGS (Admin4)* \n" +
                 "└───────────────────┘\n\n" +
                 "⚙️ *বটের গ্লোবাল কনফিগারেশন:*\n\n" +
                 "💵 *বর্তমান USDT রেট:* `" + currentRate + " BDT`\n" +
                 "👉 _রেট পরিবর্তন করতে টাইপ করুন:_ `/setrate <নতুন_রেট>`\n\n" +
                 "🛑 *টাস্ক সিস্টেমের অবস্থা:* `" + taskStatus + "`\n\n" +
                 "📉 *নিচের বাটন থেকে সিস্টেম কন্ট্রোল করুন:*";

let settingsButtons = [
    [
        { title: "🛑 টাস্ক অফ করুন", command: "task_off" },
        { title: "🟢 টাস্ক অন করুন", command: "task_on" }
    ]
];

Bot.sendInlineKeyboard(settingsButtons, settingMsg);

