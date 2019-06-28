"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
//https://github.com/axios/axios
var ApiRequest = /** @class */ (function () {
    function ApiRequest() {
    }
    ApiRequest.prototype.sendData = function (inputMessage, responseMessage, luisIntent, sentimentScore) {
        axios_1.default.post('http://arena.dss.cloud:3000/messages', {
            inputMessage: inputMessage,
            responseMessage: responseMessage,
            luisIntent: luisIntent,
            sentimentScore: sentimentScore,
        })
            .then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    return ApiRequest;
}());
exports.ApiRequest = ApiRequest;
//# sourceMappingURL=apiRequest.js.map