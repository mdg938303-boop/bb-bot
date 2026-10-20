/*CMD
  command: /clearleaders
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

let userList = Bot.getProperty("all_users_list", []);

if (!userList || userList.length === 0) {
    Bot.sendMessage("❌ ডাটাবেজে কোনো ইউজার লিস্ট খুঁজে পাওয়া যায়নি!");
    return;
}

// 🔄 লুপ চালিয়ে সব ইউজারের ফেসবুক ও জিমেইল অ্যাপ্রুভড কাউন্টার ০ (শূন্য) করা হচ্ছে
for (let i = 0; i < userList.length; i++) {
    let uId = userList[i];
    if (uId) {
        Bot.setProperty("app_task_" + uId, 0, "integer");    // জিমেইল কাউন্টার রিসেট
        Bot.setProperty("app_fb_task_" + uId, 0, "integer"); // ফেসবুক কাউন্টার রিসেট
    }
}

Bot.sendMessage("✅ *সফলভাবে লিডারবোর্ডের আগের সমস্ত হিসেব ক্লিয়ার করা হয়েছে!* এখন থেকে নতুন এপ্রুভালগুলো লিডারবোর্ডে কাউন্ট হবে।");

