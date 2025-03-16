"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CustomNotFoundError_js_1 = require("./errors/CustomNotFoundError.js");
const authorRouter_js_1 = require("./routes/authorRouter.js");
const node_path_1 = __importDefault(require("node:path"));
// data 
const links = [
    { href: "/", text: "Home" },
    { href: "/authors", text: "Authors" }
];
const users = ['Bobby', 'Babyboi', 'Captaincum'];
const app = (0, express_1.default)();
const port = 3000;
app.set("views", node_path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.locals.viewsDir = node_path_1.default.join(__dirname, 'views');
app.use((req, res, next) => {
    if (req.app.get('views') !== app.locals.viewsDir) {
        console.log('Views path was changed! Restoring...');
        req.app.set('views', app.locals.viewsDir);
    }
    next();
});
app.get('/', (req, res, next) => {
    res.render("index", { links: links, users: users });
});
app.use('/authors', authorRouter_js_1.authorRouter);
app.use((err, req, res, next) => {
    if (err instanceof CustomNotFoundError_js_1.CustomNotFoundError) {
        res.status(404).json(err.message);
    }
    console.log(err);
    res.status(500).send(err);
});
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
