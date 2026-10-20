/*CMD
  command: /start
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

// ⚡ ইউজারের নাম ও ইউজারনেম অটো-সেভ লজিক (নিখুঁত ডাটাবেজের জন্য)
Bot.setProperty("first_name_" + user.telegramid, user.first_name, "string");
Bot.setProperty("username_" + user.telegramid, user.username, "string");



// 👥 ১. ব্রডকাস্টের জন্য ইউজার আইডি ডাটাবেজে সেভ করার লজিক
let userList = Bot.getProperty("all_users_list", []);
if (!userList.includes(user.telegramid)) {
    userList.push(user.telegramid);
    Bot.setProperty("all_users_list", userList, "json");
    Bot.setProperty("total_users_count", userList.length, "integer");
}

// 🔗 ২. ২-লেভেল রেফারেল বোনাস লজিক (USDT)
let refUser = message.split(" ")[1];
let rate = parseFloat(Bot.getProperty("global_dollar_rate", 120)) || 120;
let knownUsers = Bot.getProperty("all_users_list", []);
if (!Array.isArray(knownUsers)) { knownUsers = []; }
knownUsers = knownUsers.map(String);

if (refUser && /^\d+$/.test(refUser) && refUser !== user.telegramid.toString() && knownUsers.includes(refUser)) {
    let hasRef = Bot.getProperty("ref_" + user.telegramid);
    
    if (!hasRef) {
        Bot.setProperty("ref_" + user.telegramid, refUser, "string");
        
        // 🥇 লেভেল ১ বোনাস (সরাসরি রেফার - 0.005 USDT)
        let currentRefCount = Bot.getProperty("total_ref_" + refUser, 0);
        Bot.setProperty("total_ref_" + refUser, currentRefCount + 1, "integer");
        
        let refBal = Bot.getProperty("bal_" + refUser, 0);
        Bot.setProperty("bal_" + refUser, (parseFloat(refBal) || 0) + (0.005 * rate), "float");
        
        let refBonusMsg = "🎉━━━━━━━━━━━━━━━━━━🎉\n" +
                          "   ✨ 𝗥𝗘𝗙𝗘𝗥𝗥𝗔𝗟 𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟 ✨\n" +
                          "🎉━━━━━━━━━━━━━━━━━━🎉\n\n" +
                          "🚀 *গ্রেট জব!* 🙌 আপনার আমন্ত্রণ গ্রহণ করে একজন 🆕 নতুন মেম্বার যুক্ত হয়েছে।\n\n" +
                          "💎 *বোনাস রিওয়ার্ড:* 🟢 `+0.005 USDT` 🟢\n" +
                          "✅ আপনার ব্যালেন্সে সফলভাবে রিওয়ার্ড ক্রেডিট করা হয়েছে। 💰\n\n" +
                          "🔥 আরও রেফার করুন, আরও ইনকাম করুন! 🔥";
        Bot.sendMessageToChatWithId(refUser, refBonusMsg);
        
        // 🥈 লেভেল ২ বোনাস (টিম রেফার - 0.002 USDT)
        let level2User = Bot.getProperty("ref_" + refUser); 
        
        if (level2User && level2User !== "undefined") {
            let L2RefCount = Bot.getProperty("total_l2_ref_" + level2User, 0);
            Bot.setProperty("total_l2_ref_" + level2User, L2RefCount + 1, "integer");
            
            let l2Bal = Bot.getProperty("bal_" + level2User, 0);
            Bot.setProperty("bal_" + level2User, (parseFloat(l2Bal) || 0) + (0.002 * rate), "float");
            
            let l2BonusMsg = "💫━━━━━━━━━━━━━━━━━━💫\n" +
                             "   💎 𝗣𝗔𝗦𝗦𝗜𝗩𝗘 𝗜𝗡𝗖𝗢𝗠𝗘 𝗕𝗢𝗢𝗦𝗧 💎\n" +
                             "💫━━━━━━━━━━━━━━━━━━💫\n\n" +
                             "🛡️ *টিম সাকসেস!* 🎊 আপনার রেফার করা মেম্বার নতুন একজন 🆕 মেম্বার জয়েন করিয়েছে।\n\n" +
                             "📈 *প্যাসিভ রিওয়ার্ড:* 🟣 `+0.002 USDT` 🟣\n" +
                             "✨ টিম মেম্বারদের সক্রিয়তায় আপনার ইনকাম বাড়ছে! 🚀\n\n" +
                             "🌟 নিষ্ক্রিয় থাকুন, তবু ইনকাম করুন! 🌟";
            Bot.sendMessageToChatWithId(level2User, l2BonusMsg);
        }
    }
}

// 🎨 ৩. মেইন মেনু কীবোর্ড ইন্টারফেস ও প্রিমিয়াম ওয়েলকাম মেসেজ
let welcomeMsg = "🌈━━━━━━━━━━━━━━━━━━🌈\n" +
                 "  🚀 𝗔𝗨𝗧𝗢𝗠𝗔𝗧𝗘𝗗 𝗘𝗔𝗥𝗡𝗜𝗡𝗚 𝗛𝗨𝗕 🚀\n" +
                 "🌈━━━━━━━━━━━━━━━━━━🌈\n\n" +
                 "👋 স্বাগতম *" + user.first_name + "*! 🎊 আমাদের প্ল্যাটফর্মে আপনাকে স্বাগতম। আমরা আপনাকে দিচ্ছি দ্রুত ⚡ এবং সহজভাবে কাজ করে আয় করার সেরা মাধ্যম।\n\n" +
                 "🛡️ *প্ল্যাটফর্মের সুবিধা:*\n" +
                 "🔹 ✅ সহজ টাস্ক ও ইনস্ট্যান্ট ভেরিফিকেশন।\n" +
                 "🔹 🔗 লেভেল ২ পর্যন্ত রেফারেল ইনকাম।\n" +
                 "🔹 💳 নিরবচ্ছিন্ন উইথড্রল সুবিধা।\n\n" +
                 "🌐 *আপনার যাত্রা শুরু করতে মেনু ব্যবহার করুন:* 👇";

Bot.sendKeyboard("👤 My Account, 🔗 Refer\n💼 Work Panel,\n,💳 Withdraw, 📞 Support", welcomeMsg);

