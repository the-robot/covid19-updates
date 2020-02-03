import { NEWS_RSS, REDDIT_RSS, TWITTER_RSS } from './sources.mjs';
import { insertNewsSource, insertRedditSource, insertTweetSource } from '../db/setupFacade.mjs';


const setupNews = async () => {
  for (let sourceId in NEWS_RSS) {
    let source = NEWS_RSS[sourceId];
    insertNewsSource(source).then(() => {
      console.log(`[+] Added ${source.short_name} (news)`)
    });
  }
};

const setupReddit = async () => {
  for (let sourceId in REDDIT_RSS) {
    let source = REDDIT_RSS[sourceId];
    insertRedditSource(source).then(() => {
      console.log(`[+] Added ${source.short_name} (reddit)`)
    });
  }
};


const setupTweet = async () => {
  for (let sourceId in TWITTER_RSS) {
    let source = TWITTER_RSS[sourceId];
    insertTweetSource(source).then(() => {
      console.log(`[+] Added ${source.short_name} (tweet)`)
    });
  }
};


const main = async () => {
  await setupNews();
  await setupReddit();
  await setupTweet();
}

main();
