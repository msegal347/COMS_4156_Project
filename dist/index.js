"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
// Initialize Express application
const app = (0, express_1.default)();
// Define a GET route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Read port from environment variables or default to 3000
const port = process.env.PORT || 3000;
// Start the server
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
exports.server = server;
//# sourceMappingURL=index.js.map