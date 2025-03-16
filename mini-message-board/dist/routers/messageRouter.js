"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRouter = void 0;
const express_1 = __importDefault(require("express"));
const messageController_js_1 = require("../controllers/messageController.js");
const messageRouter = (0, express_1.default)();
exports.messageRouter = messageRouter;
// Define Routes
messageRouter.get('/', (req, res, next) => {
    try {
        res.render('form');
    }
    catch (err) {
        next(err);
    }
});
messageRouter.post('/', messageController_js_1.createMessageController);
