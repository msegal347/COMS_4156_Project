"use strict";
// src/controllers/entityController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEntities = exports.deleteEntityById = exports.updateEntityById = exports.getEntityById = exports.createEntity = void 0;
const entityModel_1 = require("../models/entityModel");
// Creates a new entity
const createEntity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entityData = req.body;
        const newEntity = yield entityModel_1.Entity.create(entityData);
        res.status(201).json(newEntity);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createEntity = createEntity;
// Gets the entity with the given ID
const getEntityById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const entity = yield entityModel_1.Entity.findById(id);
        if (!entity) {
            return res.status(404).json({ error: 'Entity not found' });
        }
        res.status(200).json(entity);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getEntityById = getEntityById;
// Updates the entity with the given ID
const updateEntityById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedEntity = yield entityModel_1.Entity.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedEntity) {
            return res.status(404).json({ error: 'Entity not found' });
        }
        res.status(200).json(updatedEntity);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateEntityById = updateEntityById;
// Deletes the entity with the given ID
const deleteEntityById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedEntity = yield entityModel_1.Entity.findByIdAndDelete(id);
        if (!deletedEntity) {
            return res.status(404).json({ error: 'Entity not found' });
        }
        res.status(204).json();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteEntityById = deleteEntityById;
// Gets all entities
const getAllEntities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entities = yield entityModel_1.Entity.find({});
        res.status(200).json(entities);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getAllEntities = getAllEntities;
//# sourceMappingURL=entityController.js.map