module.exports = db => {
  const path = require('path');
  const express = require('express');

  const app = express();
  const userRoutes = require('./routes/userRoutes')(db);
  const { notFound, error } = require('./middlewares/errorMiddleware');

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');

  app.use(express.json());
  app.use(userRoutes);
  app.use(notFound);
  app.use(error);

  return app;
};