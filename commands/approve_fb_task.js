/*CMD
  command: approve_fb_task
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

// প্যারামিটার থেকে ইউজার আইডি ও ইউনিক টাস্ক আইডি আলাদা করা
let targetUser = params.split(" ")[0]; 
let taskId = params.split(" ")[1]; 

// 🔄 [ইউনিক ডাবল চেক ও অটো-কার্ড এডিট লজিক]
let currentStatus = Bot.getProperty("status_" + taskId);

if (currentStatus == "approved" || currentStatus == "rejected") {
    let displayStatus = currentStatus == "approved" ? "✅ ALREADY APPROVED" : "❌ ALREADY REJECTED";
    
    let alreadyDoneMsg = "┌───────────────────┐\n" +
                         "ℹ️          *TASK ALREADY PROCESSED* \n" +
                         "└───────────────────┘\n\n" +
                         "👤 *User ID :* `" + targetUser + "`\n" +
                         "🎯 *Status  :* `" + displayStatus + "`\n\n" +
                         "📉 এই সুনির্দিষ্ট ফেসবুক টাস্কটি অলরেডি হ্যান্ডেল করা হয়ে গেছে। চ্যাট ক্লিন করা হলো।";

    Api.editMessageText({
      chat_id: chat.chatid,
      message_id: request.message.message_id,
      text: alreadyDoneMsg,
      parse_mode: "Markdown"
    });
    return; 
}

// এই সুনির্দিষ্ট টাস্কটি লক করা হলো
Bot.setProperty("status_" + taskId, "approved", "string");

// 📊 [Admin1 এর জন্য গ্লোবাল কাউন্টার যোগ]
let globalFbApp = Bot.getProperty("global_fb_approved", 0);
Bot.setProperty("global_fb_approved", parseInt(globalFbApp) + 1, "integer");

// 💰 [সংশোধিত লাইভ রেট লজিক] সরাসরি ডাটাবেজ থেকে দাম নেওয়া হবে
let taskReward = parseFloat(Bot.getProperty("global_fb_rate", 4.00)); 
let rate = parseFloat(Bot.getProperty("global_dollar_rate", 120)); 
let taskRewardUSDT = taskReward / rate; 

let userBal = Bot.getProperty("bal_" + targetUser);
userBal = userBal ? parseFloat(userBal) : 0;
Bot.setProperty("bal_" + targetUser, userBal + taskReward, "float");

// ⚡ [ফেসবুক স্পেসিফিক টাস্ক কাউন্টার আপডেট]
let approvedCombined = Bot.getProperty("app_task_" + targetUser, 0);
Bot.setProperty("app_task_" + targetUser, parseInt(approvedCombined) + 1, "integer");

let fbApproved = Bot.getProperty("app_fb_task_" + targetUser, 0);
Bot.setProperty("app_fb_task_" + targetUser, parseInt(fbApproved) + 1, "integer");

let pending = Bot.getProperty("pen_task_" + targetUser, 0);
if (pending > 0) { 
    Bot.setProperty("pen_task_" + targetUser, parseInt(pending) - 1, "integer"); 
}

// রেফারেল কমিশন
let referrer = Bot.getProperty("ref_" + targetUser);
if(referrer){
    let refBal = Bot.getProperty("bal_" + referrer);
    refBal = refBal ? parseFloat(refBal) : 0;
    let commission = taskReward * 0.05; 
    let commissionUSDT = commission / rate; 
    Bot.setProperty("bal_" + referrer, refBal + commission, "float");
    
    let refMsg = "┌───────────────────┐\n" +
                 "🎁      *REFERRAL COMMISSION* \n" +
                 "└───────────────────┘\n\n" +
                 "🎉 *অভিনন্দন! আপনার রেফারেল লিংক থেকে ফেসবুক টাস্ক বোনাস এসেছে।*\n\n" +
                 "👤 *ইউজার আইডি :* `" + targetUser + "`\n" +
                 "💰 *প্রাপ্ত কমিশন :* `" + commissionUSDT.toFixed(4) + " USDT`\n\n" +
                 "💡 আপনার বন্ধুরা যত বেশি কাজ করবে, আপনার কমিশন তত বাড়তে থাকবে!";
    Bot.sendMessageToChatWithId(referrer, refMsg);
}

let userSuccessMsg = "┌───────────────────┐\n" +
                     "✅       *TASK APPROVED SUCCESS* \n" +
                     "└───────────────────┘\n\n" +
                     "🔥 *সুখবর! আপনার সাবমিট করা ফেসবুক টাস্কটি এডমিন ভেরিফাই করেছে।*\n\n" +
                     "💰 *টাস্ক রিওয়ার্ড :* `+" + taskRewardUSDT.toFixed(4) + " USDT`\n" +
                     "ℹ️ আপনার ওয়ালেটে ডলার যোগ করে দেওয়া হয়েছে। ব্যালেন্স চেক করতে মেইন মেনু দেখুন।";
Bot.sendMessageToChatWithId(targetUser, userSuccessMsg);

let adminEditMsg = "┌───────────────────┐\n" +
                   "✅     *FB TASK SUCCESSFULLY APPROVED* \n" +
                   "└───────────────────┘\n\n" +
                   "👤 *Approved For User ID :* `" + targetUser + "`\n" +
                   "💵 *Reward Disbursed      :* `" + taskRewardUSDT.toFixed(4) + " USDT`";

Api.editMessageText({
  chat_id: chat.chatid,
  message_id: request.message.message_id,
  text: adminEditMsg,
  parse_mode: "Markdown"
});

