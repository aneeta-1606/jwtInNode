"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = express_1.Router();
router.post('/signup', authController_1.signup);
router.post('/login', authController_1.login);
router.get('/profile', verifyToken_1.TokenValidation, authController_1.getProfile);
exports.default = router;
//# sourceMappingURL=auth.js.map