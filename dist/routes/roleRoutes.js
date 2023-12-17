"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const roles = ['source', 'sink', 'auditor', 'admin'];
router.get('/roles', (req, res) => {
    res.json(roles);
});
exports.default = router;
//# sourceMappingURL=roleRoutes.js.map