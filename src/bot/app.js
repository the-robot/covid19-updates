import { ABOUT_VIRUS, GITHUB_URL } from './constant';
import {
  getCoronaCountries,
  getCoronaOverall,
  getLatestNews,
  getLatestRedditPosts,
  getLatestTweets,
} from '../controller';
import { getBot, shouldReply } from './utils';

// get bot instant
const bot = getBot();

bot.onText(/\/check/, msg => {
  if (shouldReply(msg)) {
    getCoronaOverall()
      .then(result => {
        if (!result) {
          bot.sendMessage(msg.chat.id, 'Failed to get the information.');
        } else {
          let reply = `<b>Cases</b>: ${result.cases}\n`;
          reply += `<b>Deaths</b>: ${result.deaths}\n`;
          reply += `<b>Cured</b>: ${result.cured}\n`;

          bot.sendMessage(msg.chat.id, reply, {parse_mode : "HTML"});
        }
      });
  }
});

bot.onText(/\/stats/, msg => {
  const buildInHtml = countries => {
    let reply = `<b>Confirmed Cases & Deaths</b>\n\n`;

    for (let i=0; i<countries.length; i+=1) {
      reply += `<i><b>${i+1}. ${countries[i].country}</b></i> (${countries[i].region})\n`;
      reply += `Cases: ${countries[i].cases}\n`;
      // reply += parseInt(countries[i].todayCases) > 0
      //   ? `New Cases: ${countries[i].todayCases}\n`
      //   : '';
      reply += parseInt(countries[i].deaths) > 0
        ? `Deaths: ${countries[i].deaths}\n`
        : '';
      // reply += parseInt(countries[i].todayDeaths) > 0
      //   ? `New Deaths: ${countries[i].todayDeaths}\n`
      //   : '';
      reply += parseInt(countries[i].cured) > 0
        ? `Cured: ${countries[i].cured}\n`
        : '';
      reply += parseInt(countries[i].critical) > 0
        ? `Critical: ${countries[i].critical}\n\n`
        : '\n';
    }

    reply += `<pre>Total ${countries.length} countries with confirmed cases and deaths.</pre>`;
    return reply;
  }

  if (shouldReply(msg)) {
    getCoronaCountries()
      .then(countries => {
        if (!countries || countries.length === 0) {
          bot.sendMessage(msg.chat.id, 'Failed to get the information.');
        } else {
          bot.sendMessage(msg.chat.id, buildInHtml(countries), {parse_mode : "HTML"});
        }
      });
  }
});

bot.onText(/\/news/, msg => {
  const buildInHtml = news => {
    let reply = `<b>Latest News</b>\n\n`;
    for (let i=0; i<news.length; i+=1) {
      reply += `${i+1}. <a href="${news[i].link}">${news[i].title}</a> <code>(${news[i].articleSource.short_name})</code>\n\n`;
    }
    reply += `<pre>The latest news is published on ${news[0].pubDate}</pre>`;
    return reply;
  };

  if (shouldReply(msg)) {
    getLatestNews()
      .then(news => {
        if (news.length > 0) {
          bot.sendMessage(msg.chat.id, buildInHtml(news), {parse_mode : "HTML", disable_web_page_preview: true});
        } else {
          bot.sendMessage(msg.chat.id, 'No latest news at the moment.');
        }
      });
  }
});

bot.onText(/\/reddit/, msg => {
  const buildInHtml = posts => {
    let reply = `<b>Reddit Posts</b>\n\n`;
    for (let i=0; i<posts.length; i+=1) {
      reply += `${i+1}. <a href="${posts[i].link}">${posts[i].title}</a> <code>(${posts[i].articleSource.short_name})</code>\n\n`;
    }
    return reply;
  };

  if (shouldReply(msg)) {
    getLatestRedditPosts()
      .then(posts => {
        if (posts.length > 0) {
          bot.sendMessage(msg.chat.id, buildInHtml(posts), {parse_mode : "HTML", disable_web_page_preview: true});
        } else {
          bot.sendMessage(msg.chat.id, 'No latest reddit posts at the moment.');
        }
      });
  }
});

bot.onText(/\/tweets/, msg => {
  const buildInHtml = posts => {
    let reply = `<b>Tweets from ${posts[0].articleSource.short_name}</b>\n\n`;
    for (let i=0; i<posts.length; i+=1) {
      reply += `${i+1}. <a href="${posts[i].link}">${posts[i].title}</a>\n\n`;
    }
    return reply;
  };

  if (shouldReply(msg)) {
    getLatestTweets()
      .then(posts => {
        if (posts.length > 0) {
          bot.sendMessage(msg.chat.id, buildInHtml(posts), {parse_mode : "HTML", disable_web_page_preview: true});
        } else {
          bot.sendMessage(msg.chat.id, 'No latest tweets at the moment.');
        }
      });
  }
});

// Intro and Help
bot.onText(/\/start/, msg => {
  if (shouldReply(msg)) {
    let reply = 'Welcome, you can ask me to get latest news and information about coronavirus. See the commands below.\n\n';
    reply += '<i><b>/news</b></i> to get latest news about coronavirus\n';
    reply += '<i><b>/reddit</b></i> to get latest posts about coronavirus from reddit\n';
    reply += '<i><b>/tweets</b></i> to get latest tweets about coronavirus from twitter\n';
    reply += '<i><b>/check</b></i> to get the number of coronavirus cases\n';
    reply += '<i><b>/stats</b></i> to get the number of cases in infected countries\n\n';
    reply += `Learn more about <a href="${ABOUT_VIRUS}">Coronavirus</a>\n`;
    reply += `This bot is open source and can find the code on <a href="${GITHUB_URL}">Github</a>`;

    bot.sendMessage(msg.chat.id, reply, {parse_mode: "HTML", disable_web_page_preview: true})
  }
});

bot.onText(/\/help/, msg => {
  if (shouldReply(msg)) {
    let reply = '';
    reply += '<i><b>/news</b></i> to get latest news about coronavirus\n';
    reply += '<i><b>/reddit</b></i> to get latest posts about coronavirus from reddit\n';
    reply += '<i><b>/tweets</b></i> to get latest tweets about coronavirus from twitter\n';
    reply += '<i><b>/check</b></i> to get the number of coronavirus cases\n';
    reply += '<i><b>/stats</b></i> to get the number of cases in infected countries\n\n';
    reply += `Learn more about <a href="${ABOUT_VIRUS}">Coronavirus</a>\n`;
    reply += `This bot is open source and can find the code on <a href="${GITHUB_URL}">Github</a>`;

    bot.sendMessage(msg.chat.id, reply, {parse_mode: "HTML", disable_web_page_preview: true})
  }
});

bot.on("polling_error", (err) => console.log(err));