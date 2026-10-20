/*CMD
  command: live_support_start
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

Bot.sendMessage("📝 *লাইভ সাপোর্ট:* আপনার সমস্যা বা প্রশ্নটি নিচে বিস্তারিত লিখে পাঠান। আমাদের অ্যাডমিন টিম এটি দেখতে পাবে:");
Bot.runCommand("live_support_send");

