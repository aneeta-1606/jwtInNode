"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
require("./database");
dotenv_1.default.config();
const app = express_1.default();
app.use(express_1.default.json());
app.use('/auth', auth_1.default);
app.listen(4000);
//# sourceMappingURL=index.js.map