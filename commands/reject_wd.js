/*CMD
  command: reject_wd
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

let targetUser = params.split(" ")[0]; 
let amount = parseFloat(params.split(" ")[1]) || 0; 
let amountStr = amount.toFixed(4);
let ch_msg_id = params.split(" ")[2]; // 🔥 সরাসরি বাটন থেকে পাওয়া চ্যানেলের মেসেজ আইডি

let channel_id = "-1003976105135"; 
let method = Bot.getProperty("wd_method_" + targetUser, "N/A");
let number = Bot.getProperty("wd_number_" + targetUser, "N/A");

let rate = parseFloat(Bot.getProperty("global_dollar_rate", 120)) || 120;
let refund_tk = amount * rate;
let current_bal_tk = Bot.getProperty("bal_" + targetUser, 0);
Bot.setProperty("bal_" + targetUser, current_bal_tk + refund_tk, "float");

let date = new Date().toLocaleString("en-US", {timeZone: "Asia/Dhaka"});

let maskedNumber = "N/A";
if (number !== "N/A") {
    let cleanNum = number.toString().trim();
    if (cleanNum.length > 4) {
        maskedNumber = "*".repeat(cleanNum.length - 4) + cleanNum.slice(-4);
    } else {
        maskedNumber = cleanNum;
    }
}

// 🚀 কোনো ডাটাবেজ ছাড়া ডিরেক্ট বাটন প্যারামিটার আইডি দিয়ে চ্যানেল এডিট
if (ch_msg_id && ch_msg_id !== "0") {
    let updatedChannelMsg = "❌ *[WITHDRAWAL REJECTED]*\n" +
                            "───────────────────────\n" +
                            "👤 *User ID:* `" + targetUser.substring(0, 5) + "••••`\n" +
                            "💳 *Method:* " + method + "\n" +
                            "📱 *Number:* `" + maskedNumber + "`\n" +
                            "💰 *Amount:* `" + amountStr + " USDT`\n" +
                            "───────────────────────\n" +
                            "🔴 *Status:* বাতিল করা হয়েছে (Rejected)\n" +
                            "🕒 *টাইম:* `" + date + "`";

    Api.editMessageText({
      chat_id: channel_id,
      message_id: parseInt(ch_msg_id),
      text: updatedChannelMsg,
      parse_mode: "Markdown"
    });
}

let userWdMsg = "┌───────────────────┐\n" +
                "❌     *WITHDRAWAL REJECTED* \n" +
                "└───────────────────┘\n\n" +
                "👋 হ্যালো, আপনার উইথড্র রিকোয়েস্টটি অ্যাডমিন বাতিল করেছে।\n\n" +
                "💵 *পরিমাণ :* `" + amountStr + " USDT`\n" +
                "💰 আপনার কেটে নেওয়া ডলারটি পুনরায় আপনার ব্যালেন্সে ব্যাক করে দেওয়া হয়েছে।\n\n*বিস্তারিত জানতে সাপোর্টে যোগাযোগ করুন*";

Bot.sendMessageToChatWithId(targetUser, userWdMsg);

Api.editMessageText({
  chat_id: chat.chatid,
  message_id: request.message.message_id,
  text: "❌ *User:* `" + targetUser + "` এর উইথড্র রিকোয়েস্ট রিজেক্ট করা হয়েছে এবং ব্যালেন্স রিফান্ড করা হয়েছে।",
  parse_mode: "Markdown"
});

