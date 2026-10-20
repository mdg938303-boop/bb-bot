/*CMD
  command: /setup
  help: Claim admin access for a newly deployed bot
  need_reply: false
  auto_retry_time:
  folder:
CMD*/

// First-run setup: only the first Telegram user can claim ownership.
let ownerId = Bot.getProperty("setup_owner_id", "");
let currentId = user.telegramid.toString();

if (ownerId) {
  if (ownerId === currentId) {
    Bot.sendMessage("✅ এই বটের অ্যাডমিন ইতিমধ্যে আপনি।\n\nঅ্যাডমিন প্যানেল খুলতে /admin0 লিখুন।");
  } else {
    Bot.sendMessage("🔒 এই বটের অ্যাডমিন সেটআপ ইতিমধ্যে সম্পন্ন হয়েছে।");
  }
  return;
}

Bot.setProperty("setup_owner_id", currentId, "string");
Bot.setProperty("setup_owner_name", user.first_name || "Admin", "string");
Bot.setProperty("setup_completed", true, "boolean");
Bot.sendMessage("🎉 *Admin setup successful!*\n\nএই Telegram ID-টি বটের একমাত্র অ্যাডমিন হিসেবে সেট হয়েছে: `" + currentId + "`\n\nএখন /admin0 দিয়ে অ্যাডমিন প্যানেল খুলুন। অন্য কেউ পরে /setup চালিয়ে অ্যাডমিন হতে পারবে না।", {parse_mode: "Markdown"});
