/*CMD
  command: confirm_wd
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
let ch_msg_id = params.split(" ")[2]; // সরাসরি বাটন থেকে পাওয়া চ্যানেলের মেসেজ আইডি

let channel_id = "-1003976105135"; 
let method = Bot.getProperty("wd_method_" + targetUser, "N/A");
let number = Bot.getProperty("wd_number_" + targetUser, "N/A");

// ========================================================
// 💰 [লক ভাঙার ম্যাজিক লজিক] গ্লোবাল টোটাল পেইড ১০০% সেভ করার কোড
// ========================================================
let totalPaid = Bot.getProperty("global_total_paid");

// যদি ডাটাবেজে আগে থেকে কিছু না থাকে বা লেখা থাকে, তবে সেটাকে ০ ধরে নেওয়া হবে
if (!totalPaid || isNaN(parseFloat(totalPaid))) {
    totalPaid = 0;
} else {
    totalPaid = parseFloat(totalPaid);
}

// নতুন অ্যামাউন্ট যোগ করে "float" ফরম্যাটে একদম ফ্রেশ করে সেভ করা হলো
let newTotalPaid = totalPaid + amount;
Bot.setProperty("global_total_paid", newTotalPaid, "float");
// ========================================================

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

// ডিরেক্ট বাটন প্যারামিটার আইডি দিয়ে চ্যানেল এডিট
if (ch_msg_id && ch_msg_id !== "0") {
    let updatedChannelMsg = "✅ *[WITHDRAWAL APPROVED]*\n" +
                            "───────────────────────\n" +
                            "👤 *User ID:* `" + targetUser.substring(0, 5) + "••••`\n" +
                            "💳 *Method:* " + method + "\n" +
                            "📱 *Number:* `" + maskedNumber + "`\n" +
                            "💰 *Amount:* `" + amountStr + " USDT`\n" +
                            "───────────────────────\n" +
                            "🟢 *Status:* সফলভাবে পরিশোধিত (Paid)\n" +
                            "🕒 *টাইম:* `" + date + "`";

    Api.editMessageText({
      chat_id: channel_id,
      message_id: parseInt(ch_msg_id),
      text: updatedChannelMsg,
      parse_mode: "Markdown"
    });
}

let userWdMsg = "┌───────────────────┐\n" +
                "🎉     *WITHDRAWAL SUCCESSFUL* \n" +
                "└───────────────────┘\n\n" +
                "👋 হ্যালো, আপনার উইথড্র রিকোয়েস্টটি অ্যাডমিন সফলভাবে কনফার্ম করেছে。\n\n" +
                "💵 *পরিমাণ :* `" + amountStr + " USDT`\n" +
                "ℹ️ আপনার ওয়ালেটে টাকা পাঠিয়ে দেওয়া হয়েছে।";

Bot.sendMessageToChatWithId(targetUser, userWdMsg);

Api.editMessageText({
  chat_id: chat.chatid,
  message_id: request.message.message_id,
  text: "✅ *User:* `" + targetUser + "` এর `" + amountStr + " USDT` উইথড্র কনফার্ম করা হয়েছে এবং চ্যানেলে আপডেট করা হয়েছে।\n💰 *টোটাল পেইড ব্যালেন্স:* `" + newTotalPaid.toFixed(4) + " USDT` সেভ হয়েছে।",
  parse_mode: "Markdown"
});

