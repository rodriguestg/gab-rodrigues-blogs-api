const express = require('express');
const routers = require('./routers');

const { usersRouter, loginRouter, categoriesRouter, postsRouter } = routers;

// ...

const app = express();

app.use(express.json());
app.use('/login', loginRouter);
app.use('/user', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postsRouter);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
