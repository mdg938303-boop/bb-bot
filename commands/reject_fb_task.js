/*CMD
  command: reject_fb_task
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

if(!targetUser){
    Bot.sendMessage("❌ ইউজার আইডি পাওয়া যায়নি!");
    return;
}

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
Bot.setProperty("status_" + taskId, "rejected", "string");

// 📊 [Admin1 এর জন্য গ্লোবাল কাউন্টার যোগ]
let globalFbRej = Bot.getProperty("global_fb_rejected", 0);
Bot.setProperty("global_fb_rejected", parseInt(globalFbRej) + 1, "integer");

let pending = Bot.getProperty("pen_task_" + targetUser);
pending = pending ? parseInt(pending) : 0;
if (pending > 0) { 
    Bot.setProperty("pen_task_" + targetUser, pending - 1, "integer"); 
} else {
    Bot.setProperty("pen_task_" + targetUser, 0, "integer");
}

let rejected = Bot.getProperty("rej_task_" + targetUser);
rejected = rejected ? parseInt(rejected) : 0;
Bot.setProperty("rej_task_" + targetUser, rejected + 1, "integer");

// ইউনিক টাস্ক আইডি দিয়ে ডাটা তুলে আনা
let fbNumber = Bot.getProperty("fb_num_" + taskId, "N/A");
let fbCode = Bot.getProperty("fb_code_" + taskId, "N/A");

// 🔔 ইউজারকে সুনির্দিষ্ট ডিটেইলস সহ রিজেকশনের নোটিফিকেশন পাঠানো
let userNotification = "┌───────────────────┐\n" +
                       "❌          *TASK REJECTED* \n" +
                       "└───────────────────┘\n\n" +
                       "👋 হ্যালো,\n" +
                       "দুঃখিত! আপনার জমা দেওয়া একটি *ফেসবুক টাস্ক* অ্যাডমিন প্যানেল থেকে রিজেক্ট (বাতিল) করা হয়েছে। ⚠️\n\n" +
                       "🛑 *বাতিল হওয়া টাস্কের বিবরণ :*\n" +
                       "📱 *মোবাইল নাম্বার:* `" + fbNumber + "`\n" +
                       "🔑 *টাস্ক কোড:* `" + fbCode + "`\n\n" +
                       "📢 *কারণ:* আপনার দেওয়া তথ্যে কোনো ভুল ছিল অথবা কাজটি সঠিক নিয়মে করা হয়নি।\n\n" +
                       "💡 *সমস্যাটি বিস্তারিত জানতে বা কোনো প্রশ্ন থাকলে নিচের বাটনটি চেপে সরাসরি অ্যাডমিনের সাথে যোগাযোগ করুন। ধন্যবাদ!*";

// 💬 ইউজারের জন্য সাপোর্ট ইনলাইন বাটন (এখানে আপনার অ্যাডমিন অ্যাকাউন্টের টেলিগ্রাম ইউজারনেম দিন)
let userSupportButton = [
    [
        { title: "💬 অ্যাডমিনের সাথে যোগাযোগ করুন", url: "https://t.me/Haque_gmail_buyer_supportbot" }
    ]
];

// ইউজারকে বাটনসহ মেসেজ পাঠানো হচ্ছে
Bot.sendInlineKeyboardToChatWithId(targetUser, userSupportButton, userNotification);

// 🛠 প্রথম অ্যাডমিনের নিজের ইনবক্সের মেসেজ এডিট করে রিজেক্টেড ক্লোজড বানিয়ে দেওয়া
let adminRejectMsg = "┌───────────────────┐\n" +
                     "❌      *TASK REJECTED & CLOSED* \n" +
                     "└───────────────────┘\n\n" +
                     "👤 *Rejected For User ID :* `" + targetUser + "`\n" +
                     "📱 *FB Mobile:* `" + fbNumber + "`\n" +
                     "───────────────────────\n" +
                     "⚠️ এই ফেসবুক টাস্কটি রিজেক্ট করা হয়েছে এবং চ্যাট হিস্ট্রি ক্লিন রাখা হয়েছে।";

Api.editMessageText({
  chat_id: chat.chatid,
  message_id: request.message.message_id,
  text: adminRejectMsg,
  parse_mode: "Markdown"
});

