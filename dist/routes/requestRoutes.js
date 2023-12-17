"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requestController_1 = __importDefault(require("../controllers/requestController"));
const router = express_1.default.Router();
router.post('/', requestController_1.default.createRequest);
exports.default = router;
//# sourceMappingURL=requestRoutes.js.map