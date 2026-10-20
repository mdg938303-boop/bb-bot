/*CMD
  command: Admin3
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

let userManageMsg = "┌───────────────────┐\n" +
                    "⚙️    *USER MANAGEMENT (Admin3)* \n" +
                    "└───────────────────┘\n\n" +
                    "🛠 *যেকোনো ইউজারের ব্যালেন্স ম্যানেজ করার গাইড:*\n\n" +
                    "💵 *ব্যালেন্স যোগ করতে (টাকায়):* \n" +
                    "`/addbal <ইউজার_আইডি> <টাকার_পরিমাণ>`\n" +
                    "👉 _উদাহরণ:_ `/addbal 12345678 120`\n\n" +
                    "📉 *ব্যালেন্স কাটতে (টাকায়):* \n" +
                    "`/cutbal <ইউজার_আইডি> <টাকার_পরিমাণ>`\n" +
                    "👉 _উদাহরণ:_ `/cutbal 12345678 50`\n\n" +
                    "🔍 *ইউজারের লাইভ ব্যালেন্স চেক করতে:* \n" +
                    "`/check <ইউজার_আইডি>`\n" +
                    "👉 _উদাহরণ:_ `/check 12345678`\n\n" +
                    "───────────────────────\n" +
                    "💡 _নিচের যেকোনো একটি কমান্ড কপি করে আইডি ও অ্যামাউন্ট বসিয়ে চ্যাটে সেন্ড করুন।_";

Bot.sendMessage(userManageMsg);

