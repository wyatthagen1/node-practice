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
exports.getAuthorController = getAuthorController;
exports.getAllAuthors = getAllAuthors;
const db_js_1 = require("../db.js");
const CustomNotFoundError_js_1 = require("../errors/CustomNotFoundError.js");
console.log("Environment variables:", {
    NODE_PATH: process.env.NODE_PATH,
    PWD: process.env.PWD,
});
function getAuthorController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { authorId } = req.params;
            const author = yield (0, db_js_1.getAuthorById)(Number(authorId));
            if (!author) {
                throw new CustomNotFoundError_js_1.CustomNotFoundError("Author Not Found");
            }
            res.send(`Author Name: ${author.name}`);
        }
        catch (error) {
            next(error);
        }
    });
}
function getAllAuthors(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authors = yield (0, db_js_1.allAuthors)();
            console.log(authors);
            if (!authors) {
                throw new CustomNotFoundError_js_1.CustomNotFoundError("Author Not Found");
            }
            // In getAllAuthors function
            console.log("About to render from req app views path:", req.app.get('views'));
            res.render("authors", { authors: authors });
        }
        catch (error) {
            next(error);
        }
    });
}
