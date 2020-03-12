"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const keys_1 = __importDefault(require("./keys"));
// Express App Setup
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
const objection_1 = require("objection");
const knex_1 = __importDefault(require("knex"));
// Initialize knex.
const knex = knex_1.default({
    client: 'pg',
    useNullAsDefault: true,
    connection: {
        user: keys_1.default.pgUser,
        host: keys_1.default.pgHost,
        database: keys_1.default.pgDatabase,
        password: keys_1.default.pgPassword,
        port: keys_1.default.pgPort
    }
});
// Give the knex instance to objection.
objection_1.Model.knex(knex);
app.listen(5000, (err) => {
    console.log("Listening");
});
//# sourceMappingURL=index.js.map