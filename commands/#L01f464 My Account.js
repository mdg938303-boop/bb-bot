/*CMD
  command: 👤 My Account
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

let bal = Bot.getProperty("bal_" + user.telegramid, 0);

// 📊 গ্লোবাল কাউন্টারসমূহ
let approved = Bot.getProperty("app_task_" + user.telegramid, 0);
let pending = Bot.getProperty("pen_task_" + user.telegramid, 0);
let total = Bot.getProperty("total_task_" + user.telegramid, 0);
if (total == 0) { total = approved + pending; }

// 💡 ডাটাবেজ থেকে লেটেস্ট ডলার রেট নেওয়া (সেট করা না থাকলে ১২০ ধরবে)
let rate = parseFloat(Bot.getProperty("global_dollar_rate", 120)); 

// ব্যালেন্স ক্যালকুলেশন
let balInTk = bal; // আপনার ডাটাবেজে ব্যালেন্স যেহেতু টাকায় সেভ হয়
let balInUsdt = bal / rate; // এটি এখন ডাইনামিক রেট অনুযায়ী আপডেট হবে

let date = new Date().toLocaleString("en-US", {timeZone: "Asia/Dhaka"});

let msg = "┌───────────────────┐\n" +
          "👤       *USER ACCOUNT PROFILE* \n" +
          "└───────────────────┘\n\n" +
          "👋 *হ্যালো,* " + user.first_name + "\n" +
          "🆔 *ইউজার আইডি:* `" + user.telegramid + "`\n" +
          "───────────────────────\n" +
          "💰 *বর্তমান ব্যালেন্স :*\n" +
          "└ `💵 " + balInTk.toFixed(2) + " BDT`\n" +
          "└ `💎 " + balInUsdt.toFixed(4) + " USDT`\n" +
          "───────────────────────\n\n" +
          "📊 *আপনার কাজের পরিসংখ্যান :*\n" +
          "📝 মোট জমা দেওয়া টাস্ক : `" + total + "` টি\n" +
          "✅ অ্যাপ্রুভড (সফল) টাস্ক : `" + approved + "` টি\n" +
          "⏳ পেন্ডিং (রিভিউ) টাস্ক : `" + pending + "` টি\n" +
          "───────────────────────\n" +
          "🕒 *শেষ আপডেট (BD Time) :*\n" +
          "└ `" + date + "`";

Bot.sendMessage(msg);

