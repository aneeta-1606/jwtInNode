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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
exports.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new userModel_1.default({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user.password = yield user.encryptPassword(user.password);
    const savedUesr = yield user.save();
    const token = jsonwebtoken_1.default.sign({ id: savedUesr._id }, 'secretkey');
    res.header('auth-token', token).json(savedUesr);
});
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).json('email or password is incorrect');
    const isPasswordIncorrect = yield user.validatePassword(req.body.password);
    if (!isPasswordIncorrect)
        return res.status(400).json('Password invalid');
    const token = jsonwebtoken_1.default.sign({ id: user._id }, 'secretkey', { expiresIn: 60 * 60 * 24 });
    res.json({ token });
});
exports.getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.userId, { password: 0 });
    if (!user)
        return res.status(404).json('No user found');
    res.json(user);
});
//# sourceMappingURL=authController.js.map