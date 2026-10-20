/*CMD
  command: /setrate
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

// ইউজার যে রেটটি ইনপুট দিবে (যেমন: /setrate 120) সেটি সংগ্রহ করা
let newRate = parseFloat(message.replace("/setrate", "").trim());

// ইনপুট ভ্যালিডেশন (রেট সংখ্যা হতে হবে এবং ০ এর বেশি হতে হবে)
if (isNaN(newRate) || newRate <= 0) {
    Bot.sendMessage("❌ *ভুল ফরম্যাট!* দয়া করে এভাবে লিখুন: `/setrate 120` (যার মানে ১ ডলার = ১২০ টাকা)");
    return;
}

// ডাটাবেজে গ্লোবাল ডলার রেট পার্মানেন্টলি সেভ করা হলো
Bot.setProperty("global_dollar_rate", newRate, "float");

// কনফার্মেশন মেসেজ
Bot.sendMessage("✅ *ডলারের কনভার্সন রেট সফলভাবে আপডেট করা হয়েছে!*\n\n📈 *নতুন রেট:* `১ ডলার = " + newRate + " BDT`\n\n💡 এখন থেকে সমস্ত রিওয়ার্ড ক্যালকুলেশন এই নতুন রেট অনুযায়ী হবে।");

