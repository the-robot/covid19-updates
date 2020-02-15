import { MONGO_CONFIG } from '../config';
import { getDb } from '.';

const { collections: COLLECTIONS, db: DATABASE } = MONGO_CONFIG;


// Create
const insertCoronaCase = async document => {
  const client = getDb();
  await client.connect();
  const dbo = client.db(DATABASE);

  // get added date
  document.added_date = new Date(new Date().toUTCString());
  await dbo.collection(COLLECTIONS.cases).insertOne(document);

  await client.close();
};

const insertDailyCoronaCases = async document => {
  const client = getDb();
  await client.connect();
  const dbo = client.db(DATABASE);

  // get added date
  document.added_date = new Date(new Date().toUTCString());
  await dbo.collection(COLLECTIONS.dailyOverall).insertOne(document);

  await client.close();
};

const insertCountryIfNotExists = async country => {
  const client = getDb();
  await client.connect();
  const dbo = client.db(DATABASE);
  
  // find and create if not exists
  const found = await dbo.collection(COLLECTIONS.countries).findOne({ name: country }) !== null;
  if (!found) {
    // create document and add
    const document = {
      name: country,
      added_date: new Date(new Date().toUTCString()),
    };
    await dbo.collection(COLLECTIONS.countries).insertOne(document);
  }

  await client.close();
};

const insertNewsIfNotExists = async document => {
  const client = getDb();
  await client.connect();
  const dbo = client.db(DATABASE);

  // find and create if not exists
  const found = await dbo.collection(COLLECTIONS.news).findOne({ link: document.link }) !== null;
  if (!found) {
     // get added date
    document.added_date = new Date(new Date().toUTCString());
    await dbo.collection(COLLECTIONS.news).insertOne(document);
  }

  await client.close();
  return !found; // to indicate if news is added or not
};

const insertRedditIfNotExists = async document => {
  const client = getDb();
  await client.connect();
  const dbo = client.db(DATABASE);

  // find and create if not exists
  const found = await dbo.collection(COLLECTIONS.reddit).findOne({ link: document.link }) !== null;
  if (!found) {
     // get added date
    document.added_date = new Date(new Date().toUTCString());
    await dbo.collection(COLLECTIONS.reddit).insertOne(document);
  }

  await client.close();
};

const insertTweetIfNotExists = async document => {
  const client = getDb();
  await client.connect();
  const dbo = client.db(DATABASE);

  // find and create if not exists
  const found = await dbo.collection(COLLECTIONS.tweets).findOne({ link: document.link }) !== null;
  if (!found) {
     // get added date
    document.added_date = new Date(new Date().toUTCString());
    await dbo.collection(COLLECTIONS.tweets).insertOne(document);
  }

  await client.close();
};


// Read
const getNewsSources = async () => {
  const client = getDb();
  await client.connect();
  const dbo = client.db(DATABASE);
  return await dbo.collection(COLLECTIONS.newsSource).find({}).toArray();
};

const getRedditSources = async () => {
  const client = getDb();
  await client.connect();
  const dbo = client.db(DATABASE);
  return await dbo.collection(COLLECTIONS.redditSource).find({}).toArray();
};

const getTweetSources = async () => {
  const client = getDb();
  await client.connect();
  const dbo = client.db(DATABASE);
  return await dbo.collection(COLLECTIONS.tweetSource).find({}).toArray();
};

const getNews = async (offset, size) => {
  const client = getDb();
  await client.connect();
  const dbo = client.db(DATABASE);
  const records = await dbo.collection(COLLECTIONS.news)
    .find({})
    .sort({isoDate: -1})
    .skip(offset)
    .limit(size)
    .toArray();
  return records;
};

const getRedditPosts = async (offset, size) => {
  const client = getDb();
  await client.connect();
  const dbo = client.db(DATABASE);
  const records = await dbo.collection(COLLECTIONS.reddit)
    .find({})
    .sort({isoDate: -1})
    .skip(offset)
    .limit(size)
    .toArray();
  return records;
};

const getTweets = async (offset, size) => {
  const client = getDb();
  await client.connect();
  const dbo = client.db(DATABASE);
  const records = await dbo.collection(COLLECTIONS.tweets)
    .find({})
    .sort({isoDate: -1})
    .skip(offset)
    .limit(size)
    .toArray();
  return records;
};

const getTelegramChannels = async (offset, size) => {
  const client = getDb();
  await client.connect();
  const dbo = client.db(DATABASE);
  const records = await dbo.collection(COLLECTIONS.telegramChannels).find({}).toArray();
  return records;
};

const getCountries = async () => {
  const client = getDb();
  await client.connect();
  const dbo = client.db(DATABASE);
  const records = await dbo.collection(COLLECTIONS.countries)
    .find({})
    .toArray();
  return records;
};

const getOverallCases = async () => {
  const client = getDb();
  await client.connect();
  const dbo = client.db(DATABASE);
  const records = await dbo.collection(COLLECTIONS.dailyOverall)
    .find({})
    .sort({added_date: -1})
    .toArray();
  return records;
};

const getCasesByCountry = async country => {
  const client = getDb();
  await client.connect();
  const dbo = client.db(DATABASE);
  const records = await dbo.collection(COLLECTIONS.cases)
    .find({country: country})
    .sort({added_date: -1})
    .toArray();
  return records;
};


export {
  // sources
  getNewsSources,
  getRedditSources,
  getTweetSources,
  getTelegramChannels,

  // get data
  getCountries,
  getOverallCases,
  getCasesByCountry,
  getNews,
  getRedditPosts,
  getTweets,

  // insertion
  insertCoronaCase,
  insertDailyCoronaCases,
  insertCountryIfNotExists,
  insertNewsIfNotExists,
  insertRedditIfNotExists,
  insertTweetIfNotExists,
};
