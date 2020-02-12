import cron from 'cron';

import {
  // broadcast methods
  boradcastCasesOverview,
  broadcastCountryCases,

  // data pulling methods
  pullCoronaCasesData,
  pullCoronaOverallData,
  pullNewsAndBroadcast,
  pullReddit,
  pullTweets,
} from './tasks';

const CronJob = cron.CronJob;


// NOTE: Data pulling and braodcasting methods
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

const getNewsAndBroadcastTask = new CronJob('*/5 * * * *', () => {
  // NOTE: run every 5 mins
  pullNewsAndBroadcast().then(() => {
    console.log('[+] Pull Coronavirus News & Broadcasting');
  });
});

const broadcastCasesOverviewTask = new CronJob('0 * * * *', () => {
  // NOTE: run every hour
  boradcastCasesOverview();
});

const broadcastCasesOverviewTask = new CronJob('0 0 * * *', () => {
  // NOTE: run everyday at midnight
  broadcastCountryCases();
});

// start tasks
getCoronaOverallDataTask.start();
getCoronaDataTask.start();
getRedditTask.start();
getTweetsTask.start();
getNewsAndBroadcastTask.start();
broadcastCasesOverviewTask.start();
broadcastCasesOverviewTask.start();
