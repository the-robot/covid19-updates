// Facade Method for setup script

import { MONGO_CONFIG } from '../config.mjs';
import { getDb } from './index.mjs';

const { collections: COLLECTIONS, db: DATABASE } = MONGO_CONFIG;

const insertNewsSource = async document => {
  const client = getDb();
  await client.connect();
  const dbo = client.db(DATABASE);
  await dbo.collection(COLLECTIONS.newsSource).insertOne(document);
  await client.close();
};

const insertRedditSource = async document => {
  const client = getDb();
  await client.connect();
  const dbo = client.db(DATABASE);
  await dbo.collection(COLLECTIONS.redditSource).insertOne(document);
  await client.close();
};

const insertTweetSource = async document => {
  const client = getDb();
  await client.connect();
  const dbo = client.db(DATABASE);
  await dbo.collection(COLLECTIONS.tweetSource).insertOne(document);
  await client.close();
};

export { insertNewsSource, insertRedditSource, insertTweetSource };
