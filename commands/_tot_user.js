/*CMD
  command: /tot_user
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

// 🔒 শুধুমাত্র আপনি এবং আপনার পার্টনার এই কমান্ডটি দেখতে পারবেন
let admin_id = Bot.getProperty("setup_owner_id", "");
if (!admin_id || user.telegramid.toString() !== admin_id) { return; }

// ১. ডাটাবেজ থেকে অল ইউজার লিস্ট তুলে আনা
let userList = Bot.getProperty("all_users_list", []);

if (!userList || userList.length === 0) {
    Bot.sendMessage("👥 ডাটাবেজে এখনো কোনো ইউজার রেজিস্টার্ড নেই।");
    return;
}

let headerMsg = "┌───────────────────┐\n" +
                "👥      *ALL REGISTERED USERS LIST* \n" +
                "└───────────────────┘\n\n" +
                "📊 *মোট মেম্বার:* `" + userList.length + " জন`\n\n" +
                "👇 নিচে সবার নাম, আইডি ও ইউজারনেম দেওয়া হলো:\n" +
                "───────────────────────\n";

let currentChunk = headerMsg;
let count = 1;

// ২. লুপ চালিয়ে প্রতিটি ইউজারের ডাটাবেজ প্রোপার্টি ও ব্যাকআপ থেকে নাম-ইউজারনেম তুলে আনা
for (let i = 0; i < userList.length; i++) {
    let uId = userList[i];
    if (uId) {
        // প্রথমে আপনার বটের আগের কোনো কি-তে নাম সেভ আছে কিনা তা চেক করা, না থাকলে গ্লোবাল ব্যাকআপ চেক করা
        let fName = Bot.getProperty("first_name_" + uId) || Bot.getProperty("user_name_" + uId) || "User";
        let uName = Bot.getProperty("username_" + uId) || Bot.getProperty("user_username_" + uId) || "";
        
        // যদি একদমই কোনো ডাটা না পাওয়া যায়, তবে মেম্বার নিজেই নিজের প্রোফাইল ক্লিক করলে ব্যাকআপ তৈরি হবে, আপাতত ছদ্মনাম:
        if (fName === "User" && uId.toString() === user.telegramid.toString()) {
            fName = user.first_name || "User";
            uName = user.username || "";
        }

        let usernameDisplay = uName ? "[@" + uName + "]" : "_(No Username)_";
        
        // লিস্টের এক একটি লাইন তৈরি করা
        let userLine = "👤 *" + count + ".* " + fName + " " + usernameDisplay + "\n" +
                       "└ 🆔 UID: `" + uId + "`\n\n";
        
        // টেলিগ্রামের ৪০০০ অক্ষরের লিমিট ক্রস হওয়া থেকে বাঁচতে চেক করা
        if ((currentChunk + userLine).length > 3900) {
            Bot.sendMessage(currentChunk); // আগের অংশটুকু পাঠিয়ে দেওয়া হচ্ছে
            currentChunk = "📝 *CONTINUED USERS LIST...*\n" +
                           "───────────────────────\n\n" + userLine;
        } else {
            currentChunk += userLine;
        }
        count++;
    }
}

// ৩. শেষ অবশিষ্ট অংশটুকু বা পুরো মেসেজটি একসাথে পাঠানো
Bot.sendMessage(currentChunk);

