/*CMD
  command: haque
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

//Clone Code Started
let admin_id = Bot.getProperty("setup_owner_id", "");
if (!admin_id || user.telegramid.toString() !== admin_id) {
    Bot.sendMessage("")
    return
  }
if (Bot.getProperty("ban" + user.telegramid) == user.telegramid) {
  Bot.sendMessage("you are ban")
  return
}
BBAdmin.installBot({
  email: message,
  bot_id: bot.id
})
Bot.sendMessage(
  "Successfully Bot Sent ✅"
)
