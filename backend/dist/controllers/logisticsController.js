"use strict";
// src/controllers/logisticsController.ts
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinates = exports.getOptimalRoute = exports.deleteRouteById = exports.updateRouteById = exports.getRouteById = exports.createRoute = void 0;
const LogisticsService = __importStar(require("../services/logisticsService"));
// Create a new logistics route
const createRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routeData = req.body;
        const newRoute = yield LogisticsService.createRoute(routeData);
        res.status(201).json(newRoute);
    }
    catch (err) {
        next(err);
    }
});
exports.createRoute = createRoute;
// Get a logistics route by ID
const getRouteById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routeId = req.params.id;
        const route = yield LogisticsService.getRouteById(routeId);
        res.status(200).json(route);
    }
    catch (err) {
        next(err);
    }
});
exports.getRouteById = getRouteById;
// Update a logistics route by ID
const updateRouteById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routeId = req.params.id;
        const updatedData = req.body;
        const updatedRoute = yield LogisticsService.updateRouteById(routeId, updatedData);
        res.status(200).json(updatedRoute);
    }
    catch (err) {
        next(err);
    }
});
exports.updateRouteById = updateRouteById;
// Delete a logistics route by ID
const deleteRouteById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routeId = req.params.id;
        yield LogisticsService.deleteRouteById(routeId);
        res.status(204).json({});
    }
    catch (err) {
        next(err);
    }
});
exports.deleteRouteById = deleteRouteById;
// Get optimal route using Google Maps API
const getOptimalRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const origin = req.body.origin;
        const destinations = req.body.destinations;
        const optimalRoute = yield LogisticsService.calculateOptimalRoute(origin, destinations);
        res.status(200).json({ optimizedRoute: optimalRoute });
    }
    catch (err) {
        next(err);
    }
});
exports.getOptimalRoute = getOptimalRoute;
// Get coordinates for an address
const getCoordinates = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = req.params.address;
        const coordinates = yield LogisticsService.getCoordinates(address);
        res.status(200).json(coordinates);
    }
    catch (err) {
        next(err);
    }
});
exports.getCoordinates = getCoordinates;
//# sourceMappingURL=logisticsController.js.map