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
exports.getOptimalRoute = exports.getCoordinates = void 0;
const https_1 = require("https");
const url_1 = require("url");
// Get the coordinates of an address
const getCoordinates = (address) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const url = new url_1.URL(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`);
        (0, https_1.get)(url, res => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });
            res.on('end', () => {
                const response = JSON.parse(data);
                const location = response.results[0].geometry.location;
                resolve({ latitude: location.lat, longitude: location.lng });
            });
        }).on('error', err => {
            reject(err);
        });
    });
});
exports.getCoordinates = getCoordinates;
// Get the optimal route between an origin and a list of destinations
const getOptimalRoute = (origin, destinations) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const originStr = `origin=${origin}`;
        // Copy the destinations array before popping the last element
        const destinationsCopy = [...destinations];
        const destinationStr = `destination=${destinationsCopy.pop()}`;
        const waypointsStr = `waypoints=optimize:true|${destinationsCopy.join('|')}`;
        const url = new url_1.URL(`https://maps.googleapis.com/maps/api/directions/json?${originStr}&${destinationStr}&${waypointsStr}&key=${apiKey}`);
        (0, https_1.get)(url, res => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });
            res.on('end', () => {
                const response = JSON.parse(data);
                const route = response.routes[0].waypoint_order.map((index) => destinations[index]);
                resolve(route);
            });
        }).on('error', err => {
            reject(err);
        });
    });
});
exports.getOptimalRoute = getOptimalRoute;
//# sourceMappingURL=googleMaps.js.map