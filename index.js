const TelegramBot = require("node-telegram-bot-api");
const db = require("./configs/db");
const { addUser, getUser, deleteUser, getUsers } = require("./controllers/users");
// replace the value below with the Telegram token you receive from @BotFather
const token = "5471345847:AAEV4DEQeQPYMnj8OT-EhiKwifzyfly_GZA";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
db();
// // Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message

//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"

//   // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
// });

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  let text = JSON.stringify(msg);
  const adminChatId = 1403979456;
  const fromId = msg.from.id;
  const from = msg.from.first_name;
  const fromUsername = msg.from.username ? msg.from.username : "";

  if (msg.new_chat_member) {
    const newMember = msg.new_chat_member.first_name;
    // text = `${newMember} has joined the group`;
    bot.deleteMessage(chatId, msg.message_id);
    let referralUser = await getUser(fromId);
    if (!referralUser) {
      addUser({ id: fromId, first_name: from, username: fromUsername });
    }
    await addUser({
      id: msg.new_chat_member.id,
      username: msg.new_chat_member.username
        ? msg.new_chat_member.username
        : "",
      first_name: newMember,
      last_name: "",
      referral_id: fromId,
    });
    bot.sendMessage(chatId, `${newMember}, Xush kelibsiz!`);
  }
  if (msg.left_chat_member) {
    const leftMember = msg.left_chat_member.first_name;
    // text = `${leftMember} has left the group`;
    bot.deleteMessage(chatId, msg.message_id);
    deleteUser(msg.left_chat_member.id);
  }
  // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, text);
});
