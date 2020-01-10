/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import express from 'express';

const { MongoClient } = require('mongodb');

const bookRouter = express.Router();

function router(nav) {

  const books = [{
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Niko Tolstoy',
    read: false
  },
  {
    title: 'Les Miserables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    read: false
  },
  {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    read: false
  }];

  async function listDatabases(client) {
    console.log('listDatabases');
    const databasesList = await client.db().admin().listDatabases();

    console.log('Databases:');
    databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
  }

  bookRouter.route('/').get((req, res) => {
    // res.send('hello books');

    (async function main() {
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
    }());


    res.render('bookListView', {
      nav,
      title: 'Welcome to EJS',
      books,
    });
  });

  bookRouter.route('/:id').get((req, res) => {
    const { id } = req.params;

    res.render('bookView', {
      nav,
      title: 'Welcome to EJS',
      books: books[id],
    });
  });


  return bookRouter;
};

module.exports = router;
