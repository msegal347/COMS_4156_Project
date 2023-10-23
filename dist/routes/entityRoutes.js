"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const entityController = __importStar(require("../controllers/entityController"));
const router = express_1.default.Router();
// Create a new Entity
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEntity = yield entityController.createEntity(req, res);
        res.status(201).json(newEntity);
    }
    catch (error) {
        next(error);
    }
}));
// Retrieve all Entities
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entities = yield entityController.getAllEntities(req, res);
        res.status(200).json(entities);
    }
    catch (error) {
        next(error);
    }
}));
// Retrieve a single Entity by ID
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entity = yield entityController.getEntityById(req, res);
        if (entity) {
            res.status(200).json(entity);
        }
        else {
            res.status(404).send('Entity not found');
        }
    }
    catch (error) {
        next(error);
    }
}));
// Update an Entity by ID
router.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedEntity = yield entityController.updateEntityById(req, res);
        if (updatedEntity) {
            res.status(200).json(updatedEntity);
        }
        else {
            res.status(404).send('Entity not found');
        }
    }
    catch (error) {
        next(error);
    }
}));
// Delete an Entity by ID
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield entityController.deleteEntityById(req, res);
        if (result) {
            res.status(204).send(); // No content to send back
        }
        else {
            res.status(404).send('Entity not found');
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=entityRoutes.js.map