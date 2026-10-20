/*CMD
  command: /clearstats
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

// 🔒 শুধুমাত্র অ্যাডমিনরা এই কমান্ড চালাতে পারবে
let admin_id = Bot.getProperty("setup_owner_id", "");
if (!admin_id || user.telegramid.toString() !== admin_id) { return; }

// 💰 ১. অ্যাডমিন ১ প্যানেলের টোটাল পেইড মানি (Total Paid) একদম ০ করা হচ্ছে
Bot.setProperty("total_paid_money", 0, "integer");

// 🔄 ২. ফেসবুক ও জিমেইলের গ্লোবাল টাস্ক রিপোর্টও পুনরায় রিসেট নিশ্চিত করা হচ্ছে
Bot.setProperty("global_fb_approved", 0, "integer");
Bot.setProperty("global_fb_rejected", 0, "integer");
Bot.setProperty("global_gm_approved", 0, "integer");
Bot.setProperty("global_gm_rejected", 0, "integer");

// 🔄 ৩. অল ইউজারদের পার্সোনাল পরিসংখ্যান ০ করা
let userList = Bot.getProperty("all_users_list", []);
if (userList && userList.length > 0) {
    for (let i = 0; i < userList.length; i++) {
        let uId = userList[i];
        if (uId) {
            Bot.setProperty("total_task_" + uId, 0, "integer"); 
            Bot.setProperty("app_task_" + uId, 0, "integer");   
            Bot.setProperty("pen_task_" + uId, 0, "integer");   
            Bot.setProperty("rej_task_" + uId, 0, "integer");   
            Bot.setProperty("app_fb_task_" + uId, 0, "integer");
            Bot.setProperty("rej_fb_task_" + uId, 0, "integer");
        }
    }
}

Bot.sendMessage("✅ *এবার মোট সফল পেমেন্ট (Total Paid) সহ প্যানেলের সব ডাটা ১০০% জিরো (০) করা হয়েছে!*");

