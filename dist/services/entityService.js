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
Object.defineProperty(exports, "__esModule", { value: true });
const entityModel_1 = require("../models/entityModel"); // Import only the real Entity
// Create the entity service class that implements the entity service interface
class EntityService {
    // create entity
    createEntity(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEntity = new entityModel_1.Entity(data);
            const savedEntity = yield newEntity.save();
            return savedEntity;
        });
    }
    // get all entities
    getAllEntities() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield entityModel_1.Entity.find({});
        });
    }
    // get entity by id
    getEntityById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield entityModel_1.Entity.findById(id);
        });
    }
    // update entity by id
    updateEntityById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield entityModel_1.Entity.findByIdAndUpdate(id, data, { new: true });
        });
    }
    // delete entity by id
    deleteEntityById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield entityModel_1.Entity.findByIdAndDelete(id);
            return !!result;
        });
    }
}
// Export an instance of the entity service class
exports.default = new EntityService();
//# sourceMappingURL=entityService.js.map