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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderOverload = void 0;
const path_1 = __importDefault(require("path"));
const renderOverload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Store the original render function
    const originalRender = res.render.bind(res);
    // Create a new render function
    res.render = function (view, options, callback) {
        // If this is an absolute path, use it directly
        if (path_1.default.isAbsolute(view)) {
            return originalRender(view, options, callback);
        }
        // For relative paths, use our known correct directory
        const viewPath = path_1.default.join(process.cwd(), 'dist', 'views', view);
        return originalRender(viewPath, options, callback);
    };
    next();
});
exports.renderOverload = renderOverload;
