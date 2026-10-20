/*CMD
  command: /Leaderboard
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

// ১. ডাটাবেজ থেকে অল ইউজার লিস্ট এবং কনভার্সন রেট তুলে আনা
let userList = Bot.getProperty("all_users_list", []);
let rate = 120; // আপনার বটের কনভার্সন রেট

if (!userList || userList.length === 0) {
    Bot.sendMessage("📊 এখনো লিডারবোর্ডে কোনো ডাটা পাওয়া যায়নি। ইউজাররা কাজ শুরু করলে এখানে তালিকা দেখাবে।");
    return;
}

let tempArray = [];

// ২. লুপ চালিয়ে প্রতিটি ইউজারের ফুল আইডি এবং টোটাল আর্নিং নেওয়া
for (let i = 0; i < userList.length; i++) {
    let uId = userList[i];
    if (uId) {
        // টোটাল আর্নিং হিসাব (জিমেইল টাস্ক ১৬ টাকা + ফেসবুক টাস্ক ৪ টাকা)
        let gmAppCount = parseInt(Bot.getProperty("app_task_" + uId, 0)) || 0;
        let fbAppCount = parseInt(Bot.getProperty("app_fb_task_" + uId, 0)) || 0;
        
        let totalEarnedTk = (gmAppCount * 16) + (fbAppCount * 4);
        
        // যাদের টোটাল আর্নিং ০ এর বেশি, তাদের তালিকায় নেওয়া হচ্ছে
        if (totalEarnedTk > 0) {
            tempArray.push({
                id: uId,
                totalEarn: totalEarnedTk
            });
        }
    }
}

// ৩. টোটাল আর্নিং অনুযায়ী সাজানো (সবার উপরে সর্বোচ্চ উপার্জনকারী)
tempArray.sort(function(a, b) {
    return b.totalEarn - a.totalEarn;
});

// ৪. টপ ৫ জন ইউজার ফিল্টার করা
let limit = tempArray.length > 5 ? 5 : tempArray.length;

if (limit === 0) {
    Bot.sendMessage("📊 এখনো কোনো ইউজারের ইনকাম নেই। টাস্ক এপ্রুভ হলে এখানে টপ ৫ লিস্ট শো করবে।");
    return;
}

// 👑 ৫. ট্রফি ইমোজি ও সুন্দর ডিজাইন
let trophies = ["🥇", "🥈", "🥉", "🏅", "🏅"];

let leaderboardMsg = "┌───────────────────┐\n" +
                     "🏆      *REAL-TIME LEADERBOARD* \n" +
                     "└───────────────────┘\n\n" +
                     "🔥 *আমাদের বটের সেরা ৫ জন সর্বোচ্চ উপার্জনকারী মেম্বারদের তালিকা:*\n\n";

// 🔄 ৬. মেসেজ ফরম্যাট তৈরি
for (let j = 0; j < limit; j++) {
    let currentUser = tempArray[j];
    let uId = currentUser.id;
    let totalEarnTk = currentUser.totalEarn;
    let totalEarnUsdt = totalEarnTk / rate;

    leaderboardMsg += trophies[j] + " *Rank " + (j + 1) + ":* ID `" + uId + "`\n" +
                      "└ 💸 *Total Earning:* `" + totalEarnTk.toFixed(2) + " BDT` \n L 💲 `" + totalEarnUsdt.toFixed(4) + " USDT`\n\n";
}

leaderboardMsg += "───────────────────────\n" +
                  "📈 *এটি একটি রিয়েল-টাইম লিডারবোর্ড।* আপনি যত বেশি টাস্ক কমপ্লিট করবেন, আপনার র‍্যাঙ্ক তত উপরে উঠবে!\n\n" +
                  "⏰ *সর্বশেষ আপডেট:* " + new Date().toLocaleString('en-US', {timeZone: 'Asia/Dhaka'}) + " (BD Time)";

// 📤 ৭. মেসেজ পাঠানো
Bot.sendMessage(leaderboardMsg);

