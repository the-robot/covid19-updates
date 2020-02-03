import { BOT_TOKEN, BOT_USERNAME } from '../config.mjs';
import TelegramBot from 'node-telegram-bot-api';

const getBot = () => {
  return new TelegramBot(BOT_TOKEN, {polling: true});
};

const shouldReply = msg => {
  const isMentionedInGroup = msg => {
    const pattern = new RegExp(`[@]${BOT_USERNAME}\\b`, 'g');
    return pattern.test(msg.text) && (msg.chat.type === 'group' || msg.chat.type === 'supergroup');
  };

  const isPrivateChat = msg => {
    return msg.chat.type === 'private';
  };

  return isMentionedInGroup(msg) || isPrivateChat(msg);
};

export { getBot, shouldReply };
