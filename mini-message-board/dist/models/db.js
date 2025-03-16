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
exports.MessageSchema = void 0;
exports.getMessages = getMessages;
exports.pushMessage = pushMessage;
const zod_1 = require("zod");
exports.MessageSchema = zod_1.z.object({
    text: zod_1.z.string(),
    user: zod_1.z.string(),
    added: zod_1.z.date(),
});
const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    },
    {
        text: "Bounce on it crazy style",
        user: "Sven",
        added: new Date()
    },
];
function getMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        return messages;
    });
}
function pushMessage(message) {
    return __awaiter(this, void 0, void 0, function* () {
        messages.push(message);
    });
}
