/*CMD
  command: on_channel_msg
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

// এই কমান্ডটি চ্যানেলে পাঠানো মেসেজের আসল ID খুঁজে ডাটাবেজে সেভ করে রাখবে
if (options && options.result) {
    let msg_id = options.result.message_id;
    let targetUser = options.body.targetUser;
    let amount = options.body.amount;
    
    // নিখুঁত ট্র্যাকিং আইডি সেভ করা হলো
    Bot.setProperty("ch_msg_" + targetUser + "_" + amount, msg_id, "integer");
}

