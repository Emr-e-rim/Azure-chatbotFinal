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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var restify = __importStar(require("restify"));
var botbuilder_ai_1 = require("botbuilder-ai");
var botframework_config_1 = require("botframework-config");
var botbuilder_dialogs_1 = require("botbuilder-dialogs");
var dotenv_1 = require("dotenv");
var botbuilder_1 = require("botbuilder");
dotenv_1.config();
var botConfig = botframework_config_1.BotConfiguration.loadSync("lib/ajax.bot", process.env.BOT_FILE_SECRET);
var conversationState = new botbuilder_1.ConversationState(new botbuilder_1.MemoryStorage());
var dialogs = new botbuilder_dialogs_1.DialogSet(conversationState.createProperty('DialogState'));
// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
// This bot's main dialog.
var bot_1 = require("./bot");
// Create HTTP server.
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log("\n" + server.name + " listening to " + server.url);
});
// A bot requires a state store to persist the dialog and user state between messages.
var userState;
// For local development, in-memory storage is used.
// CAUTION: The Memory Storage used here is for local bot debugging only. When the bot
// is restarted, anything stored in memory will be gone.
var memoryStorage = new botbuilder_1.MemoryStorage();
userState = new botbuilder_1.UserState(memoryStorage);
// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about .bot file its use and bot configuration.
var adapter = new botbuilder_1.BotFrameworkAdapter({
    appId: process.env.microsoftAppID,
    appPassword: process.env.microsoftAppPassword
});
// Catch-all for errors.
adapter.onTurnError = function (context, error) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // This check writes out errors to console log .vs. app insights.
                console.error("\n [onTurnError]: " + error);
                // Send a message to the user
                return [4 /*yield*/, context.sendActivity("Oops. Something went wrong!")];
            case 1:
                // Send a message to the user
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var ajaxChatbot = new botbuilder_ai_1.QnAMaker({
    knowledgeBaseId: botConfig.findServiceByNameOrId("Ajaxchatbot").kbId,
    endpointKey: botConfig.findServiceByNameOrId("Ajaxchatbot").endpointKey,
    host: botConfig.findServiceByNameOrId("Ajaxchatbot").hostname
});
var ajaxChatbot2 = new botbuilder_ai_1.QnAMaker({
    knowledgeBaseId: botConfig.findServiceByNameOrId("Ajaxchatbot2").kbId,
    endpointKey: botConfig.findServiceByNameOrId("Ajaxchatbot2").endpointKey,
    host: botConfig.findServiceByNameOrId("Ajaxchatbot2").hostname
});
var luis = new botbuilder_ai_1.LuisRecognizer({
    applicationId: botConfig.findServiceByNameOrId("Ajax").appId,
    endpointKey: botConfig.findServiceByNameOrId("Ajax").subscriptionKey,
    endpoint: botConfig.findServiceByNameOrId("Ajax").getEndpoint()
});
var logger = console;
// Create the main dialog.
var myBot = new bot_1.MyBot(ajaxChatbot, ajaxChatbot2, luis, dialogs, conversationState);
// Listen for incoming requests.
server.post('/api/messages', function (req, res) {
    adapter.processActivity(req, res, function (context) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Route to main dialog.
                return [4 /*yield*/, myBot.onTurn(context)];
                case 1:
                    // Route to main dialog.
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=index.js.map