"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.TokenValidation = (req, res, next) => {
    const token = req.header('authorization');
    if (!token)
        return res.status(401).json('Access Denied');
    const payload = jsonwebtoken_1.default.verify(token, 'secretkey');
    req.userId = payload.id;
    next();
};
//# sourceMappingURL=verifyToken.js.map