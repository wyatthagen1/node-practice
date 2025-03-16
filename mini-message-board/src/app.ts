import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
// middleware
import { renderOverload } from './middleware/renderOverload';
// controllers
import { getMessageController } from './controllers/messageController';
import { messageViewRouter } from './routers/messageViewRouter';
// routers
import { messageRouter } from './routers/messageRouter';

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(renderOverload);


// View engine setup
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/',getMessageController)
app.use('/new',messageRouter)
app.use('/message-view', messageViewRouter)


// error handling
app.use((err:any, req:Request, res:Response, next:NextFunction) => {
  console.log(err)
  res.status(500).send(err);
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}); 