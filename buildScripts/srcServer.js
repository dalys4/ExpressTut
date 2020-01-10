/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import express from 'express';
import path from 'path';
import open from 'open';
import chalk from 'chalk';
import webpack from 'webpack';
import config from '../webpack.config.dev';

const middleware = require('webpack-dev-middleware');
const $d = require('debug')('tut');


const port = 3000;
const app = express();
const compiler = webpack(config);


const nav = [
  { link: '/Books', title: 'Books' },
  { link: '/Authors', title: 'Authors' },
];

const bookRouter = require('../src/routes/bookRoutes')(nav);
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

app.listen(port, (err) => {
  if (err) {
    $d(err);
  } else {
    open(`http://localhost:${port}`);

    // logger.info(chalk.blue(`Server Listening on Port:${port}...`));
    $d(chalk.blue(`Server Listening on Port:${port}...`));
  }
});
