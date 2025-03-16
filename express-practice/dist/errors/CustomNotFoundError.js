"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomNotFoundError = void 0;
class CustomNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
        this.name = "NotFoundError";
    }
}
exports.CustomNotFoundError = CustomNotFoundError;
