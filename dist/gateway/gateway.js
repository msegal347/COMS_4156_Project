"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeGateway = void 0;
const logisticsRoutes_1 = require("../routes/logisticsRoutes");
const analyticsRoutes_1 = require("../routes/analyticsRoutes");
const entityRoutes_1 = __importDefault(require("../routes/entityRoutes"));
const notificationRoutes_1 = __importDefault(require("../routes/notificationRoutes"));
const resourceRoutes_1 = __importDefault(require("../routes/resourceRoutes"));
const transactionRoutes_1 = __importDefault(require("../routes/transactionRoutes"));
const allocationRoutes_1 = __importDefault(require("../routes/allocationRoutes"));
const logisticsController_1 = require("../controllers/logisticsController");
const analyticsController_1 = require("../controllers/analyticsController");
const initializeGateway = (app) => {
    // Initialize logistics routes with controllers
    const logisticsRouter = (0, logisticsRoutes_1.createLogisticsRoutes)({
        createRoute: logisticsController_1.createRoute,
        getRouteById: logisticsController_1.getRouteById,
        updateRouteById: logisticsController_1.updateRouteById,
        deleteRouteById: logisticsController_1.deleteRouteById,
        getOptimalRoute: logisticsController_1.getOptimalRoute,
        getCoordinates: logisticsController_1.getCoordinates,
    });
    // Initialize analytics routes with controllers
    const analyticsRouter = (0, analyticsRoutes_1.createAnalyticsRoutes)({
        createRecord: analyticsController_1.createRecord,
        getRecordById: analyticsController_1.getRecordById,
        updateRecordById: analyticsController_1.updateRecordById,
        deleteRecordById: analyticsController_1.deleteRecordById,
    });
    // Use the routers as middleware on their respective paths
    app.use('/api/logistics', logisticsRouter);
    app.use('/api/analytics', analyticsRouter);
    app.use('/api/entities', entityRoutes_1.default);
    app.use('/api/notifications', notificationRoutes_1.default);
    app.use('/api/resources', resourceRoutes_1.default);
    app.use('/api/transactions', transactionRoutes_1.default);
    app.use('/api/allocations', allocationRoutes_1.default);
};
exports.initializeGateway = initializeGateway;
//# sourceMappingURL=gateway.js.map