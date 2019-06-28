"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var botbuilder_1 = require("botbuilder");
var botbuilder_ai_1 = require("botbuilder-ai");
var greetings_json_1 = __importDefault(require("../src/data/greetings.json"));
var ApiRequest_1 = require("./ApiRequest");
var messages_1 = require("./messages");
var help_json_1 = __importDefault(require("../src/data/help.json"));
var botbuilder_dialogs_1 = require("botbuilder-dialogs");
var sentimentAnalysis_1 = require("./sentimentAnalysis");
var axios_1 = __importDefault(require("axios"));
var MyBot = /** @class */ (function () {
    //private activityType : ActivityTypes;
    function MyBot(qnaMaker, ajaxChatbot2, luis, dialogs, conversationState) {
        MyBot.sentiment = 0;
        this._QnAMaker = qnaMaker;
        this._ajaxChatbot2 = ajaxChatbot2;
        this._Luis = luis;
        this.ApiRequest = new ApiRequest_1.ApiRequest();
        this.conversationState = conversationState;
        this.dialogs = dialogs;
        this.addDialogs();
        this.sentimentAnalysis = new sentimentAnalysis_1.SentimentAnalysis();
    }
    MyBot.prototype.generateDocument = function (message) {
        return {
            'documents': [
                { 'id': '1', 'language': 'nl', 'text': message },
            ]
        };
    };
    MyBot.prototype.getScore = function () {
    };
    MyBot.prototype.onTurn = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            var dc;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dialogs.createContext(context)];
                    case 1:
                        dc = _a.sent();
                        return [4 /*yield*/, dc.continueDialog()];
                    case 2:
                        _a.sent();
                        if (!(context.activity.type === "message")) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._Luis.recognize(context).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var luisResult, _a, randomItem, randomItem, reply, response, error_1;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            luisResult = botbuilder_ai_1.LuisRecognizer.topIntent(res);
                                            _a = luisResult;
                                            switch (_a) {
                                                case ("gif"): return [3 /*break*/, 1];
                                                case ("goodbye"): return [3 /*break*/, 3];
                                                case ("Greetings"): return [3 /*break*/, 5];
                                                case ("help"): return [3 /*break*/, 7];
                                                case ("time"): return [3 /*break*/, 10];
                                            }
                                            return [3 /*break*/, 12];
                                        case 1: return [4 /*yield*/, context.sendActivities(messages_1.Messages.sendMessage(["Bzz Bzz Error Error | Er is een fout opgetreden"]))];
                                        case 2:
                                            _b.sent();
                                            // dc.beginDialog("test");
                                            // Run the Dialog with the new message Activity.
                                            //this.textReply.text = 'This is an inline attachment.';
                                            //this.textReply.attachments = [Gif.getInlineAttachment()];
                                            return [3 /*break*/, 22];
                                        case 3:
                                            randomItem = greetings_json_1.default.goodbye[Math.floor(Math.random() * greetings_json_1.default.goodbye.length)];
                                            return [4 /*yield*/, context.sendActivities(messages_1.Messages.sendMessage([randomItem]))];
                                        case 4:
                                            _b.sent();
                                            return [3 /*break*/, 22];
                                        case 5:
                                            randomItem = greetings_json_1.default.greetings[Math.floor(Math.random() * greetings_json_1.default.greetings.length)];
                                            return [4 /*yield*/, context.sendActivities(messages_1.Messages.sendMessage([randomItem]))];
                                        case 6:
                                            _b.sent();
                                            return [3 /*break*/, 22];
                                        case 7:
                                            reply = botbuilder_1.MessageFactory.suggestedActions((help_json_1.default.helpActions), 'Wat wil je weten ?');
                                            return [4 /*yield*/, context.sendActivities(messages_1.Messages.sendMessage(help_json_1.default.help))];
                                        case 8:
                                            _b.sent();
                                            return [4 /*yield*/, context.sendActivity(reply)];
                                        case 9:
                                            _b.sent();
                                            return [3 /*break*/, 22];
                                        case 10: return [4 /*yield*/, context.sendActivity(new Date().toLocaleTimeString())];
                                        case 11:
                                            _b.sent();
                                            //this.ApiRequest.sendData(null, null, null, null);
                                            return [3 /*break*/, 22];
                                        case 12:
                                            this.sentimentAnalysis.getSentiment(this.generateDocument(context.activity.text));
                                            _b.label = 13;
                                        case 13:
                                            _b.trys.push([13, 20, , 21]);
                                            return [4 /*yield*/, axios_1.default.get('https://vps1.dss.cloud/arena/', {
                                                    params: {
                                                        intent: '\"' + luisResult + '\"'
                                                    }
                                                })];
                                        case 14:
                                            response = _b.sent();
                                            if (!(response.data.answer != null)) return [3 /*break*/, 17];
                                            return [4 /*yield*/, context.sendActivities(messages_1.Messages.sendMessage([response.data.answer]))];
                                        case 15:
                                            _b.sent();
                                            return [4 /*yield*/, this.ApiRequest.sendData(context.activity.text, response.data.answer, luisResult, MyBot.sentiment)];
                                        case 16:
                                            _b.sent();
                                            return [3 /*break*/, 19];
                                        case 17: return [4 /*yield*/, context.sendActivities(messages_1.Messages.sendMessage(["Bzz Bzz Error Error | Er is een fout opgetreden"]))];
                                        case 18:
                                            _b.sent();
                                            _b.label = 19;
                                        case 19:
                                            console.log("sentiment" + MyBot.sentiment);
                                            return [3 /*break*/, 21];
                                        case 20:
                                            error_1 = _b.sent();
                                            console.error(error_1);
                                            return [3 /*break*/, 21];
                                        case 21: return [3 /*break*/, 22];
                                        case 22: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.conversationState.saveChanges(context)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MyBot.prototype.addDialogs = function () {
        var _this = this;
        this.dialogs.add(new botbuilder_dialogs_1.WaterfallDialog("test", [
            function (step) { return __awaiter(_this, void 0, void 0, function () {
                var choices, options;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            choices = ["hoi", "testen"];
                            options = {
                                prompt: "Testing ", choices: choices
                            };
                            return [4 /*yield*/, step.prompt("test", options)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
            function (step) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, step.prompt("Nameprompt", "What is your name, human?")];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
            function (step) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, step.prompt("age", "Hoe oud ben je ?")];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
            function (step) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, step.prompt("last", "Dit is de laatste vraag")];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, step.endDialog()];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
        ]));
    };
    return MyBot;
}());
exports.MyBot = MyBot;
//# sourceMappingURL=bot.js.map