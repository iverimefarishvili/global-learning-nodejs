module.exports = db => {
  const path = require('path');
  const express = require('express');

  const app = express();
  const userRoutes = require('./routes/userRoutes')(db);
  const groupRoutes = require('./routes/groupRoutes')(db);
  const { notFound, error } = require('./middlewares/errorMiddleware');

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');

  const database = require("./config/index");
  database.sequelize.sync()
    .then(() => {
      console.log("Synced db.");
    })
    .catch((err) => {
      console.log("Failed to sync db: " + err.message);
    });

  app.use(express.urlencoded());
  app.use(userRoutes);
  app.use(groupRoutes);
  app.use(notFound);
  app.use(error);

  return app;
};