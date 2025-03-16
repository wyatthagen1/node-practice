"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageController = getMessageController;
exports.createMessageController = createMessageController;
const db_js_1 = require("../models/db.js");
function getMessageController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // get messages 
        try {
            const messages = yield (0, db_js_1.getMessages)();
            if (!messages) {
                throw new Error("No Messages Found");
            }
            console.log(messages);
            res.render('index', { messages: messages });
        }
        catch (err) {
            next(err);
        }
    });
}
function createMessageController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // create messages
        try {
            //parse + valdiate request
            req.body.added = new Date();
            const message = db_js_1.MessageSchema.parse(req.body);
            console.log(message);
            (0, db_js_1.pushMessage)(message);
            res.redirect('../');
        }
        catch (err) {
            next(err);
        }
    });
}
