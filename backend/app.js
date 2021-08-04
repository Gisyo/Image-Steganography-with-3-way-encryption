const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const AppError = require('./utility/AppError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/UserRoute.js');
const messageRouter = require('./routes/messageRoutes.js');

//start express app
const app = express();

//GLOBAL MIDDLEWARE
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//Set security HTTP headers
app.use(helmet());

//Development Logging in console
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Data Sanitization against NOSQL query injection
app.use(mongoSanitize());

//Data sanitization against xss
app.use(xss());
//limit requests form same ID
const limiter = rateLimit({
  max: 100,
  windowMs: 10 * 60 * 1000,
  message: 'Too many requests from this IP, Please try in an hour '
});
app.use('/api', limiter);

//BODY PARSER, READ DATA FORM Req.body
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

//test Middleware
// app.use((req, res, next) => {
//   console.log(process.env.NODE_ENV);
//   req.requestTime = new Date().toISOString();
//   next();
// });

//Routes Middleware
app.use('/api/v1/users', userRouter);
app.use('/api/v1/message', messageRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
