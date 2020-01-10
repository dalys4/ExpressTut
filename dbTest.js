/* eslint-disable no-console */

// eslint-disable-next-line import/no-extraneous-dependencies
import { MongoClient } from 'mongodb';

async function listDatabases(client) {
  console.log('listDatabases');
  const databasesList = await client.db().admin().listDatabases();

  console.log('Databases:');
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function main() {
  console.log('Main');
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = 'mongodb+srv://mgoAdmin:dogfish.1@cluster0-9plhl.mongodb.net/test?retryWrites=true&w=majority';


  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    console.log('connect');
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
