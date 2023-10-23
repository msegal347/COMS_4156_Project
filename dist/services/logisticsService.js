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
exports.getCoordinates = exports.calculateOptimalRoute = exports.deleteRouteById = exports.updateRouteById = exports.getRouteById = exports.createRoute = void 0;
const GoogleMaps = __importStar(require("../utils/googleMaps"));
const logisticsModel_1 = __importDefault(require("../models/logisticsModel"));
// Create a new logistics route
const createRoute = (routeData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRoute = new logisticsModel_1.default(routeData);
        yield newRoute.save();
        return newRoute;
    }
    catch (err) {
        throw new Error(`Error in creating new route: ${err}`);
    }
});
exports.createRoute = createRoute;
// Get a logistics route by ID
const getRouteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const route = yield logisticsModel_1.default.findById(id);
        if (!route) {
            throw new Error('Route not found');
        }
        return route;
    }
    catch (err) {
        throw new Error(`Error in getting route by ID: ${err}`);
    }
});
exports.getRouteById = getRouteById;
// Update a logistics route by ID
const updateRouteById = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRoute = yield logisticsModel_1.default.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedRoute) {
            throw new Error('Route not found');
        }
        return updatedRoute;
    }
    catch (err) {
        throw new Error(`Error in updating route by ID: ${err}`);
    }
});
exports.updateRouteById = updateRouteById;
// Delete a logistics route by ID
const deleteRouteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield logisticsModel_1.default.findByIdAndDelete(id);
        if (!result) {
            throw new Error('Route not found');
        }
    }
    catch (err) {
        throw new Error(`Error in deleting route by ID: ${err}`);
    }
});
exports.deleteRouteById = deleteRouteById;
// Calculate an optimal route given an origin and a list of destinations
const calculateOptimalRoute = (origin, destinations) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield GoogleMaps.getOptimalRoute(origin, destinations);
    }
    catch (err) {
        throw new Error(`Error in calculating optimal route: ${err}`);
    }
});
exports.calculateOptimalRoute = calculateOptimalRoute;
// Get coordinates for an address
const getCoordinates = (address) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield GoogleMaps.getCoordinates(address);
    }
    catch (err) {
        throw new Error(`Error in getting coordinates: ${err}`);
    }
});
exports.getCoordinates = getCoordinates;
//# sourceMappingURL=logisticsService.js.map