/*CMD
  command: broadcast_start
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

Bot.sendMessage("📢 আপনি যে মেসেজটি (লেখা, লিংক বা নোটিশ) আপনার বটের সকল ইউজারের কাছে পাঠাতে চান, তা নিচে লিখে সেন্ড করুন:");
Bot.runCommand("broadcast_msg");

