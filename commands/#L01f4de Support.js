/*CMD
  command: 📞 Support
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

let admin_msg = "╔════════════════════╗\n" +
                "       🤝  *SUPPORT CENTER*  \n" +
                "╚════════════════════╝\n\n" +
                "আপনার যেকোনো সমস্যা বা জিজ্ঞাসার জন্য আমাদের সাপোর্ট টিম প্রস্তুত। নিচের যেকোনো একটি মাধ্যম বেছে নিন:\n\n" +
                "💬 *Live Support:* বটের মাধ্যমেই সরাসরি মেসেজে কথা বলুন।\n" +
                "👤 *Admin Support:* সরাসরি অ্যাডমিনের পার্সোনাল ইনবক্সে মেসেজ দিন।";

let buttons = [
    [{title: "💬 LIVE SUPPORT", command: "live_support_start"}],
    [{title: "👤 ADMIN SUPPORT", url: "https://t.me/Haque_gmail_buyer_supportbot"}] // আপনার টেলিগ্রাম ইউজারনেমটি rakib_admin এর জায়গায় বসিয়ে দিন
];

Bot.sendInlineKeyboard(buttons, admin_msg);

