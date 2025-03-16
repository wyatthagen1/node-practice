"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
// middleware
const renderOverload_1 = require("./middleware/renderOverload");
// controllers
const messageController_1 = require("./controllers/messageController");
const messageViewRouter_1 = require("./routers/messageViewRouter");
// routers
const messageRouter_1 = require("./routers/messageRouter");
const app = (0, express_1.default)();
const port = 3000;
// Middleware
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(renderOverload_1.renderOverload);
// View engine setup
app.set('views', path_1.default.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
// Routes
app.get('/', messageController_1.getMessageController);
app.use('/new', messageRouter_1.messageRouter);
app.use('/message-view', messageViewRouter_1.messageViewRouter);
// error handling
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(err);
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
