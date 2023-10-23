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
exports.resourceController = void 0;
const resourceModel_1 = __importDefault(require("../models/resourceModel"));
exports.resourceController = {
    // Create a new resource
    createResource(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const resource = new resourceModel_1.default(data);
                const savedResource = yield resource.save();
                res.status(201).json(savedResource);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    },
    // Retrieve all resources
    getResources(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resources = yield resourceModel_1.default.find({});
                res.status(200).json(resources);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    },
    // Retrieve a single resource by ID
    getResourceById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resourceId = req.params.id;
                const resource = yield resourceModel_1.default.findById(resourceId);
                if (!resource) {
                    return res.status(404).json({ error: 'Resource not found' });
                }
                res.status(200).json(resource);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    },
    // Update a resource by ID
    updateResource(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resourceId = req.params.id;
                const updates = req.body;
                const resource = yield resourceModel_1.default.findByIdAndUpdate(resourceId, updates, { new: true });
                if (!resource) {
                    return res.status(404).json({ error: 'Resource not found' });
                }
                res.status(200).json(resource);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    },
    // Delete a resource
    deleteResource(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resourceId = req.params.id;
                const resource = yield resourceModel_1.default.findByIdAndDelete(resourceId);
                if (!resource) {
                    return res.status(404).json({ error: 'Resource not found' });
                }
                res.status(204).json({ message: 'Resource deleted' });
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    },
};
//# sourceMappingURL=resourceController.js.map