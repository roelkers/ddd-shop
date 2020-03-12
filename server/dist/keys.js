"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keys = {
    pgUser: process.env.PGUSER,
    pgHost: process.env.PGHOST,
    pgDatabase: process.env.PGDATABASE,
    pgPassword: process.env.PGPASSWORD,
    pgPort: Number(process.env.PGPORT)
};
exports.default = keys;
//# sourceMappingURL=keys.js.map