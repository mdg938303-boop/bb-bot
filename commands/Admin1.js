/*CMD
  command: Admin1
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

// 🛠 ১. মাল্টি-অ্যাডমিন ভেরিফিকেশন (আপনার ও আপনার পার্টনারের আইডি)
let admin_id = Bot.getProperty("setup_owner_id", "");
if (!admin_id || user.telegramid.toString() !== admin_id) { return; }

// ২. ডাটাবেজ থেকে গ্লোবাল লাইভ রেট ও মেম্বার ডাটা তুলে আনা
let rate = 120; // আপনার কনভার্সন রেট
let totalUsers = Bot.getProperty("total_users_count", 0); 

// 💰 [সংশোধিত অংশ] কনফার্ম বাটন থেকে সেভ হওয়া আসল ডলার ডাটা তুলে আনা হলো
let totalPaidUSDT = Bot.getProperty("global_total_paid", 0); 

// যদি ডাটা টাইপ স্ট্রিং হয়ে থাকে তবে নিরাপদ করতে parseFloat করা হলো
totalPaidUSDT = parseFloat(totalPaidUSDT) || 0;

// ডলারকে ১২০ দিয়ে গুণ করে মোট কত টাকা (BDT) পেইড হয়েছে তা বের করা হলো
let totalPaidTk = totalPaidUSDT * rate;

// 🔄 ৩. গ্লোবাল কাউন্টার থেকে সরাসরি ফেসবুক ও জিমেইল ডাটা তুলে আনা
let fb_app = Bot.getProperty("global_fb_approved", 0);
let fb_rej = Bot.getProperty("global_fb_rejected", 0);
let fb_sub = fb_app + fb_rej; // মোট সাবমিট = এপ্রুভ + রিজেক্ট

let gm_app = Bot.getProperty("global_gm_approved", 0);
let gm_rej = Bot.getProperty("global_gm_rejected", 0);
let gm_sub = gm_app + gm_rej; // মোট সাবমিট = এপ্রুভ + রিজেক্ট

// 🎨 ৪. প্রিমিয়াম অল-ইন-ওয়ান স্ট্যাটাসカード ডিজাইন
let statusMsg = "┌───────────────────┐\n" +
                "📊       *BOT LIVE STATISTICS (Admin1)* \n" +
                "└───────────────────┘\n\n" +
                "👥 *মোট মেম্বার (Total Users):*\n" +
                "└ `" + totalUsers + " জন`\n\n" +
                "💸 *মোট সফল পেমেন্ট (Total Paid):*\n" +
                "└ `" + totalPaidTk.toFixed(2) + " BDT`\n" +
                "└ `" + totalPaidUSDT.toFixed(4) + " USDT`\n\n" +
                "───────────────────────\n" +
                "🔵 *ফেসবুক টাস্ক রিপোর্ট (Facebook Stats):*\n" +
                "📝 মোট সাবমিট : `" + fb_sub + " টি`\n" +
                "✅ মোট অ্যাপ্রুভ : `" + fb_app + " টি`\n" +
                "❌ মোট রিজেক্ট  : `" + fb_rej + " টি`\n\n" +
                "🔴 *জিমেইল টাস্ক রিপোর্ট (Gmail Stats):*\n" +
                "📝 মোট সাবমিট : `" + gm_sub + " টি`\n" +
                "✅ মোট অ্যাপ্রুভ : `" + gm_app + " টি`\n" +
                "❌ মোট রিজেক্ট  : `" + gm_rej + " টি`\n" +
                "───────────────────────\n" +
                "⚙️ *সার্ভার স্ট্যাটাস:* `🟢 Online & Smooth`\n" +
                "⏰ *সর্বশেষ আপডেট:* " + new Date().toLocaleString('en-US', {timeZone: 'Asia/Dhaka'}) + " (BD Time)";

// অ্যাডমিনকে মেসেজটি পাঠানো হলো
Bot.sendMessage(statusMsg);

