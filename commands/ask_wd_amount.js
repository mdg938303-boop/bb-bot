/*CMD
  command: ask_wd_amount
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// 💡 ডাটাবেজ থেকে লেটেস্ট ডলার রেট নেওয়া (সেট করা না থাকলে ১২০ ধরবে)
let rate = parseFloat(Bot.getProperty("global_dollar_rate", 120)); 

let amount = parseFloat(message); 
let bal_tk = parseFloat(Bot.getProperty("bal_" + user.telegramid, 0)); 
let bal = bal_tk / rate; 

if (isNaN(amount) || amount < 0.20) {
    let limitAlert = "┌───────────────────┐\n❌        *INVALID AMOUNT* \n└───────────────────┘\n\n⚠️ *ভুল অ্যামাউন্ট!* সর্বনিম্ন উত্তোলনের পরিমাণ `0.2000 USDT`।";
    Bot.sendMessage(limitAlert);
    return;
}

if (amount > bal) {
    let balAlert = "┌───────────────────┐\n❌     *INSUFFICIENT BALANCE* \n└───────────────────┘\n\n🛑 *আপনার ব্যালেন্স পর্যাপ্ত নয়।*\n\n💰 *আপনার ব্যালেন্স :* `" + bal.toFixed(4) + " USDT`";
    Bot.sendMessage(balAlert);
    return;
}

// এখন এখানে ক্যালকুলেশনটি লেটেস্ট রেট অনুযায়ী হবে
let deduct_tk = amount * rate;
Bot.setProperty("bal_" + user.telegramid, bal_tk - deduct_tk, "float");

let successUserMsg = "┌───────────────────┐\n✅      *REQUEST SUBMITTED* \n└───────────────────┘\n\n💸 *আপনার উইথড্র রিকোয়েস্টটি সফলভাবে পাঠানো হয়েছে।*\n\n⏳ *পরিমাণ :* `" + amount.toFixed(4) + " USDT`";
Bot.sendMessage(successUserMsg);

let method = User.getProperty("wd_method");
let number = User.getProperty("wd_number", "N/A");

Bot.setProperty("wd_method_" + user.telegramid, method, "string");
Bot.setProperty("wd_number_" + user.telegramid, number, "string");

let admin_id = Bot.getProperty("setup_owner_id", ""); 
let channel_id = "-1003976105135"; 

let maskedNumber = "N/A";
if (number !== "N/A") {
    let cleanNum = number.toString().trim();
    if (cleanNum.length > 4) {
        maskedNumber = "*".repeat(cleanNum.length - 4) + cleanNum.slice(-4);
    } else {
        maskedNumber = cleanNum;
    }
}

// 📢 চ্যানেলে মেসেজ পাঠানো
let channelMsg = "⏳ *[WITHDRAWAL PENDING]*\n" +
                 "───────────────────────\n" +
                 "👤 *User:* " + user.first_name + "\n" +
                 "💳 *Method:* " + method + "\n" +
                 "📱 *Number:* `" + maskedNumber + "`\n" +
                 "💰 *Amount:* `" + amount.toFixed(4) + " USDT`\n" +
                 "───────────────────────\n" +
                 "ℹ️ *Status:* ভেরিফিকেশনে আছে।";

let result = Api.sendMessage({
  chat_id: channel_id,
  text: channelMsg,
  parse_mode: "Markdown"
});

let ch_msg_id = (result && result.result) ? result.result.message_id : "0";

// এডমিন মেসেজ
let adminMsg = "📥 *[NEW WITHDRAWAL REQUEST]*\n" +
               "───────────────────────\n" +
               "👤 *User:* " + user.first_name + "\n" +
               "🆔 *ID:* `" + user.telegramid + "`\n" +
               "💳 *Method:* " + method + "\n" +
               "📱 *Number:* `" + number + "`\n" +
               "💰 *Amount:* `" + amount.toFixed(4) + " USDT`";

let adminButtons = [
    [{title: "✅ CONFIRM PAYMENT", command: "confirm_wd " + user.telegramid + " " + amount + " " + ch_msg_id}],
    [{title: "❌ REJECT REQUEST", command: "reject_wd " + user.telegramid + " " + amount + " " + ch_msg_id}]
];
Bot.sendInlineKeyboardToChatWithId(admin_id, adminButtons, adminMsg);

