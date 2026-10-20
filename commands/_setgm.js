/*CMD
  command: /setgm
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

let newPrice = parseFloat(message.replace("/setgm", "").trim());

if (isNaN(newPrice) || newPrice <= 0) {
    Bot.sendMessage("❌ *ভুল ফরম্যাট!* এভাবে লিখুন: `/setgm 6` (যদি ৬ টাকা করতে চান)");
    return;
}

Bot.setProperty("global_gm_rate", newPrice, "float");
Bot.sendMessage("✅ *জিমেইল টাস্কের দাম সফলভাবে পরিবর্তন করা হয়েছে!*\n💰 বর্তমান রেট: `" + newPrice.toFixed(2) + " BDT`");

