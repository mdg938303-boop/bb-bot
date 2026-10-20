/*CMD
  command: 📥 GET TASK
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

let taskInstruction = "┌───────────────────┐\n" +
                      "📌     *TASK CREATION GUIDE*     \n" +
                      "└───────────────────┘\n\n" +
                      "💡 *আপনার সুবিধামত যেকোনো নাম বা এড্রেস দিয়ে জিমেইল তৈরি করুন:*\n\n" +
                      "👉 আপনি এখানে আপনার ইচ্ছামত যেকোনো বৈধ *জিমেইল* ক্রিয়েট করতে পারবেন।\n ⚠️ কিন্তু শর্ত একটাই নিচে দেওয়া এই পাসওয়ার্ড 👇 ব্যবহার করতে হবে \n\n👉`haque@681` \n\n" +
                      "📥 *কিভাবে জমা দেবেন?*\n" +
                      "টাস্ক সম্পূর্ণ তৈরি করার পর মেইন মেনু অথবা ওয়ার্ক প্যানেল থেকে `📤 Submit task` বাটনে ক্লিক করে সেটি আমাদের কাছে জমা দিন।";

Bot.sendMessage(taskInstruction);

