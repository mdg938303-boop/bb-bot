/*CMD
  command: reject_task
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

// প্যারামিটার থেকে ইউজার আইডি ও ইউনিক জিমেইল টাস্ক আইডি আলাদা করা
let targetUser = params.split(" ")[0]; 
let taskId = params.split(" ")[1]; 

if(!targetUser){
    Bot.sendMessage("❌ ইউজার আইডি পাওয়া যায়নি!");
    return;
}

// 🔄 [ইউনিক ডাবল চেক ও অটো-কার্ড এডিট লজিক]
let currentStatus = Bot.getProperty("status_" + taskId);

if (currentStatus == "approved" || currentStatus == "rejected") {
    let displayStatus = currentStatus == "approved" ? "✅ ALREADY APPROVED BY OTHER ADMIN" : "❌ ALREADY REJECTED BY OTHER ADMIN";
    
    let alreadyDoneMsg = "┌───────────────────┐\n" +
                         "ℹ️          *TASK ALREADY PROCESSED* \n" +
                         "└───────────────────┘\n\n" +
                         "👤 *User ID :* `" + targetUser + "`\n" +
                         "🎯 *Status  :* `" + displayStatus + "`\n\n" +
                         "📉 এই সুনির্দিষ্ট জিমেইল টাস্কটি অলরেডি অন্য একজন অ্যাডমিন হ্যান্ডেল করে ফেলেছেন। আপনার চ্যাট ক্লিন করা হলো।";

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
let globalGmRej = Bot.getProperty("global_gm_rejected", 0);
Bot.setProperty("global_gm_rejected", parseInt(globalGmRej) + 1, "integer");

// পেন্ডিং স্ট্যাটাস মাইনাস করা
let pending = Bot.getProperty("pen_task_" + targetUser);
pending = pending ? parseInt(pending) : 0;
if (pending > 0) { 
    Bot.setProperty("pen_task_" + targetUser, pending - 1, "integer"); 
}

// রিজেক্টেড স্ট্যাটাস আপডেট
let rejected = Bot.getProperty("rej_task_" + targetUser);
rejected = rejected ? parseInt(rejected) : 0;
Bot.setProperty("rej_task_" + targetUser, rejected + 1, "integer");

// ইউনিক আইডি দিয়ে নির্দিষ্ট জিমেইল অ্যাকাউন্টটি তুলে আনা
let gmailAddress = Bot.getProperty("gmail_addr_" + taskId, "N/A");

// ইউজারের জন্য রিজেক্ট নোটিফিকেশন
let userRejectMsg = "┌───────────────────┐\n" +
                    "❌         *TASK REJECTED NOTIFICATION* \n" +
                    "└───────────────────┘\n\n" +
                    "⚠️ দুঃখিত, আপনার সাবমিট করা একটি জিমেইল টাস্ক বাতিল করা হয়েছে।\n\n" +
                    "🛑 *বাতিল হওয়া টাস্কের বিবরণ :*\n" +
                    "📧 *জিমেইল অ্যাকাউন্ট:* `" + gmailAddress + "`\n\n" +
                    "ℹ️ *কারণ :* ভুল বা অসম্পূর্ণ তথ্য/কোড দেওয়ার কারণে এডমিন এটি রিজেক্ট করেছেন।\n\n" +
                    "📢 *সমস্যাটি বিস্তারিত জানতে বা কোনো প্রশ্ন থাকলে নিচের বাটনটি চেপে সরাসরি অ্যাডমিনের সাথে যোগাযোগ করুন। ধন্যবাদ!*";

// 💬 ইউজারের জন্য সাপোর্ট ইনলাইন বাটন (এখানে আপনার মেইন আইডি বা এডমিন ইউজারনেম লিংক দিন)
let userSupportButton = [
    [
        { title: "💬 অ্যাডমিনের সাথে যোগাযোগ করুন", url: "https://t.me/Haque_gmail_buyer_supportbot" } 
    ]
];

Bot.sendInlineKeyboardToChatWithId(targetUser, userSupportButton, userRejectMsg);

// প্রথম অ্যাডমিনের کارت এডিট
let updatedAdminMsg = "┌───────────────────┐\n" +
                      "❌          *SUBMISSION REJECTED* \n" +
                      "└───────────────────┘\n\n" +
                      "👤 *স্ট্যাটাস :* সফলভাবে রিজেক্ট করা হয়েছে\n" +
                      "🆔 *ইউজার আইডি :* `" + targetUser + "`\n" +
                      "📧 *Gmail Addr:* `" + gmailAddress + "`\n" +
                      "───────────────────────\n" +
                      "📉 ইউজারের পেন্ডিং টাস্ক ১টি কমানো হয়েছে এবং চ্যাট ক্লিন রাখা হয়েছে।";

Api.editMessageText({
  chat_id: chat.chatid,
  message_id: request.message.message_id,
  text: updatedAdminMsg,
  parse_mode: "Markdown" 
});

