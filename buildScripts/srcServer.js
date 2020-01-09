import express from 'express';
import path from 'path';
import open from 'open';
import chalk from 'chalk';
import webpack from 'webpack';
import config from '../webpack.config.dev';

const middleware = require('webpack-dev-middleware');
const $d = require('debug')('tut');

/* eslint-disable no-console */
const port = 3000;
const app = express();
const compiler = webpack(config);
const bookRouter = express.Router();


// var logger = log4js.getLogger();
// logger.level = 'trace';


app.use(middleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

$d(path.join(__dirname, '../public'));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/jquery/dist')));

app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'ejs');

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

bookRouter.route('/')
  .get((req, res) => {
    // res.send('hello books');
    res.render('books', {
      nav: [
        { link: '/Books', title:'Books' },
        { link: '/Authors', title:'Authors' }
      ],
      title: 'Welcome to EJS',
      books,
    });
  });

bookRouter.route('/single')
  .get((req, res) => {
    res.send('hello single book');
});

app.use('/books', bookRouter);

app.get('/', (req, res) => {
  // $d(path.join(__dirname, 'src', '/views/index.html'));
  // res.sendFile(path.join(__dirname, '../src/views/index.html'));

  res.render('index', {
    nav: [
      { link: '/Books', title: 'Books' },
      { link: '/Authors', title:'Authors' }
    ],
    title: 'Welcome to EJS'
  });
});

app.get('/getView', (req, res) => {
  $d(path.join(__dirname, 'src', '/Views/index.html'));
  // res.sendFile(path.join(__dirname, '../src/views/index.html'));
  res.render('index', {
    nav: [
      { link: '/Books', title: 'Books' },
      { link: '/Authors', title:'Authors' }
    ],
    title: 'Welcome to EJS'
  });
});

app.get('/users', (req, res) => {
  // console.log(path.join(__dirname, 'users'));
  res.json([
    {
      id: 1, firstName: 'Tina', lastName: 'Lee', email: 'tina@gmail.com',
    },
  ]);
});

app.listen(port, (err) => {
  if (err) {
    $d(err);
  } else {
    open(`http://localhost:${port}`);

    // logger.info(chalk.blue(`Server Listening on Port:${port}...`));
    $d(chalk.blue(`Server Listening on Port:${port}...`));
  }
});
