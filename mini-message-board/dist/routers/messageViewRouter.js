"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageViewRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_js_1 = require("../models/db.js");
const messageViewRouter = (0, express_1.default)();
exports.messageViewRouter = messageViewRouter;
// Define Routes
messageViewRouter.get('/', (req, res, next) => {
    try {
        console.log("----------- Request Query -----------");
        console.log(req.query);
        if (!req.query) {
            throw new Error('No Message Found');
        }
        const messageRaw = req.query;
        const added = new Date(String(messageRaw.added));
        const user = String(messageRaw.user);
        const text = String(messageRaw.text);
        const message = db_js_1.MessageSchema.parse({ added: added, user: user, text: text });
        res.render('message-view', { message: message });
    }
    catch (err) {
        next(err);
    }
});
