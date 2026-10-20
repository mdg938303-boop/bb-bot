/*CMD
  command: 🔗 Refer
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

let botName = bot.name; 
let refLink = "https://t.me/" + botName + "?start=" + user.telegramid;
let rate = parseFloat(Bot.getProperty("global_dollar_rate", 120)) || 120; // ডলার রেট

let l1_ref = Bot.getProperty("total_ref_" + user.telegramid, 0);
let l2_ref = Bot.getProperty("total_l2_ref_" + user.telegramid, 0);

// বোনাস কনভার্সন
let l1_bonus = (0.005).toFixed(4); // সরাসরি রেফারেল বোনাস USDT
let l2_bonus = (0.002).toFixed(4); // দ্বিতীয় স্তরের রেফারেল বোনাস USDT

let refMsg = "┌───────────────────┐\n" +
             "🤝   *REFER & EARN NETWORK* \n" +
             "└───────────────────┘\n\n" +
             "🔥 *সুখবর! ২-লেভেল রেফারেল নেটওয়ার্ক তৈরি করে আয় করুন আনলিমিটেড প্যাসিভ ইনকাম!*\n\n" +
             "🥇 *লেভেল ১ (সরাসরি রেফার) :* `" + l1_ref + " জন` \n" +
             "🎁 *ইনস্ট্যান্ট বোনাস :* প্রতি সফল রেফারে পাবেন `" + l1_bonus + " USDT`\n\n" +
             "🥈 *লেভেল ২ (টিম মেম্বার রেফার) :* `" + l2_ref + " জন` \n" +
             "🎁 *প্যাসিভ বোনাস :* আপনার মেম্বার রেফার করলে পাবেন `" + l2_bonus + " USDT`\n" +
             "───────────────────────\n\n" +
             "🔗 *আপনার ইউনিক রেফারেল লিংক:* \n" +
             "👉 `" + refLink + "` 👈";

let shareText ="আসসালামু আলাইকুম,\n ঘরে বসে জিমেইল এবং ফেসবুক একাউন্ট খুলে সরাসরি ডলার (USDT) ইনকাম করার দারুণ একটি প্ল্যাটফর্ম। এখানে ২-লেভেল রেফারেল বোনাসসহ ইনস্ট্যান্ট পেমেন্টের সুবিধা রয়েছে। আপনিও ফ্রিতে কাজ শুরু করতে পারেন।\n জয়েন করার লিংক: 👇";
let buttons = [[{ title: "📢 SHARE WITH FRIENDS", url: "https://t.me/share/url?url=" + encodeURIComponent(refLink) + "&text=" + encodeURIComponent(shareText) }]];

Bot.sendInlineKeyboard(buttons, refMsg);

