/*CMD
  command: Nagad
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

// ইউজারের পেমেন্ট মেথডটি সাময়িকভাবে সেভ করে রাখা হলো
User.setProperty("wd_method", message, "string");

// 🎨 প্রিমিয়াম ও ইউনিক পেমেন্ট ডিটেইলস কার্ড
let paymentMsg = "┌───────────────────┐\n" +
                 "📱     *PAYMENT DETAILS REQUIRED*     \n" +
                 "└───────────────────┘\n\n" +
                 "⚙️ *আপনার সিলেক্ট করা মেথড :* `" + message.toUpperCase() + "`\n\n" +
                 "👉 অনুগ্রহ করে নিচে আপনার সঠিক *" + message + "* নাম্বারটি টাইপ করে পাঠিয়ে দিন।\n\n" +
                 "⚠️ *সতর্কতা:* ভুল নাম্বার দিলে পেমেন্ট অন্য কোথাও চলে যেতে পারে, তাই নম্বরটি ভালোভাবে চেক করে সেন্ড করুন।";

Bot.sendMessage(paymentMsg);
Bot.runCommand("ask_wd_number");
