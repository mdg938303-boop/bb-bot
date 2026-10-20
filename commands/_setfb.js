/*CMD
  command: /setfb
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

// শুধুমাত্র আপনারা দুজন অ্যাডমিন এটি পরিবর্তন করতে পারবেন
let admin_id = Bot.getProperty("setup_owner_id", "");
if (!admin_id || user.telegramid.toString() !== admin_id) { return; }

// অ্যাডমিন যা ইনপুট দিবে (যেমন: /setfb 5) সেটি সংখ্যায় রূপান্তর করা হবে
let newPrice = parseFloat(message.replace("/setfb", "").trim());

if (isNaN(newPrice) || newPrice <= 0) {
    Bot.sendMessage("❌ *ভুল ফরম্যাট!* দয়া করে এভাবে লিখুন: `/setfb 5` অথবা `/setfb 4.50`");
    return;
}

// ডাটাবেজে নতুন দামটি পার্মানেন্টলি সেভ করা হলো
Bot.setProperty("global_fb_rate", newPrice, "float");

Bot.sendMessage("✅ *ফেসবুক টাস্কের দাম সফলভাবে পরিবর্তন করা হয়েছে!*\n💰 বর্তমান রেট: `" + newPrice.toFixed(2) + " BDT`। এখন থেকে ইউজাররা এই রেটেই পেমেন্ট পাবে।");

