"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var https = __importStar(require("https"));
var bot_1 = require("./bot");
var accessKey = 'dd843101f10141de979a455148eb7b51';
var uri = 'westeurope.api.cognitive.microsoft.com';
var path = '/text/analytics/v2.1/sentiment';
var SentimentAnalysis = /** @class */ (function () {
    function SentimentAnalysis() {
    }
    SentimentAnalysis.prototype.getSentiment = function (documents) {
        var body = JSON.stringify(documents);
        var request_params = {
            method: 'POST',
            hostname: uri,
            path: path,
            headers: {
                'Ocp-Apim-Subscription-Key': accessKey,
            }
        };
        var req = https.request(request_params, this.response_handler);
        req.write(body);
        req.end();
    };
    SentimentAnalysis.prototype.response_handler = function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            var body_ = JSON.parse(body);
            var body__ = JSON.stringify(body_, null, '  ');
            bot_1.MyBot.sentiment = body_.documents[0].score;
            console.log(body__);
        });
        response.on('error', function (e) {
            console.log('Error: ' + e.message);
        });
    };
    return SentimentAnalysis;
}());
exports.SentimentAnalysis = SentimentAnalysis;
//# sourceMappingURL=sentimentAnalysis.js.map