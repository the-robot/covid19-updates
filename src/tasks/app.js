import cron from 'cron';

import {
  pullCoronaCasesData,
  pullCoronaOverallData,
  pullNews,
  pullReddit,
  pullTweets,
} from './tasks';

const CronJob = cron.CronJob;


const getCoronaOverallDataTask = new CronJob('0 0 * * *', () => {
  // NOTE: run everyday at midnight
  pullCoronaOverallData().then(() => {
    console.log('[+] Pull Coronavirus Daily Cases Overall Data');
  });
});

const getCoronaDataTask = new CronJob('0 * * * *', () => {
  // NOTE: run every hour
  pullCoronaCasesData().then(() => {
    console.log('[+] Pull Coronavirus Cases Data');
  });
});

const getNewsTask = new CronJob('*/5 * * * *', () => {
  // NOTE: run every 5 mins
  pullNews().then(() => {
    console.log('[+] Pull Coronavirus News');
  });
});

const getRedditTask = new CronJob('*/5 * * * *', () => {
  // NOTE: run every 5 mins
  pullReddit().then(() => {
    console.log('[+] Pull Coronavirus Reddit Posts');
  });
});

const getTweetsTask = new CronJob('*/5 * * * *', () => {
  // NOTE: run every 5 mins
  pullTweets().then(() => {
    console.log('[+] Pull Coronavirus Tweets');
  });
});


// start tasks
getCoronaOverallDataTask.start();
getCoronaDataTask.start();
getNewsTask.start();
getRedditTask.start();
getTweetsTask.start();
