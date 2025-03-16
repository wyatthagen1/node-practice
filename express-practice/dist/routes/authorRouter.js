"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorRouter = void 0;
const express_1 = __importDefault(require("express"));
const authorController_js_1 = require("../controllers/authorController.js");
const authorRouter = (0, express_1.default)();
exports.authorRouter = authorRouter;
authorRouter.get('/', authorController_js_1.getAllAuthors);
authorRouter.get('/:authorId', authorController_js_1.getAuthorController);
