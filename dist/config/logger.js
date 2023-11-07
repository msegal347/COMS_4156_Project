"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.esLogger = exports.consoleLogger = void 0;
const morgan_1 = __importDefault(require("morgan"));
const morgan_json_1 = __importDefault(require("morgan-json"));
const elasticsearch_1 = require("@elastic/elasticsearch");
const fs_1 = __importDefault(require("fs"));
const esClient = new elasticsearch_1.Client({
    node: 'https://es01:9200',
    auth: {
        username: 'elastic',
        password: process.env.ELASTIC_PASSWORD || 'changeme'
    },
    tls: {
        ca: fs_1.default.readFileSync('/usr/share/elasticsearch/config/certs/ca/ca.crt'),
        rejectUnauthorized: false
    },
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});
exports.consoleLogger = (0, morgan_1.default)('combined');
exports.esLogger = (0, morgan_1.default)((0, morgan_json_1.default)({
    method: ':method',
    url: ':url',
    status: ':status',
    responseTime: ':response-time',
    length: ':res[content-length]'
}), {
    stream: {
        write: (message) => {
            esClient.index({
                index: 'logs',
                body: JSON.parse(message)
            });
        },
    }
});
//# sourceMappingURL=logger.js.map