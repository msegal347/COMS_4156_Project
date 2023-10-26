"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockNext = exports.mockResponse = exports.mockRequest = void 0;
// Mock Express request
const mockRequest = () => {
    return {};
};
exports.mockRequest = mockRequest;
// Mock Express response
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.setHeader = jest.fn().mockReturnValue(res);
    return res;
};
exports.mockResponse = mockResponse;
// Mock Express next function
const mockNext = () => {
    return jest.fn();
};
exports.mockNext = mockNext;
//# sourceMappingURL=expressMock.js.map