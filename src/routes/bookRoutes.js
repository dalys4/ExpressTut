import express from 'express';

const bookRouter = express.Router();

function router(nav) {
  const books = [
    {
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
    },
  ];

  bookRouter.route('/').get((req, res) => {
    // res.send('hello books');
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
