// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as restify from 'restify';
import {LuisRecognizer, QnAMaker} from "botbuilder-ai";
import {BotConfiguration, ILuisService, IQnAService} from "botframework-config";
import {DialogSet} from "botbuilder-dialogs";
import {config} from "dotenv";
import { BotFrameworkAdapter, UserState, MemoryStorage, ConversationState } from 'botbuilder';


config();

//change this line before uploading to Azure
//it has to be ajax.bot instead of lib/ajax.bot
const botConfig = BotConfiguration.loadSync("lib/ajax.bot", process.env.BOT_FILE_SECRET);

const conversationState = new ConversationState(new MemoryStorage());
const dialogs = new DialogSet(conversationState.createProperty('DialogState'));

// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.

// This bot's main dialog.
import { MyBot } from './bot';

// Create HTTP server.
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\n${ server.name } listening to ${ server.url }`);
});

// A bot requires a state store to persist the dialog and user state between messages.
let userState;



// For local development, in-memory storage is used.
// CAUTION: The Memory Storage used here is for local bot debugging only. When the bot
// is restarted, anything stored in memory will be gone.
const memoryStorage = new MemoryStorage();
userState = new UserState(memoryStorage);

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about .bot file its use and bot configuration.
const adapter = new BotFrameworkAdapter({
    appId: process.env.microsoftAppID,
    appPassword: process.env.microsoftAppPassword
});

// Catch-all for errors.
adapter.onTurnError = async (context, error) => {
    // This check writes out errors to console log .vs. app insights.
    console.error(`\n [onTurnError]: ${ error }`);
    // Send a message to the user
    await context.sendActivity(`Oops. Something went wrong!`);
};

const ajaxChatbot = new QnAMaker({
        knowledgeBaseId:(<IQnAService>botConfig.findServiceByNameOrId("Ajaxchatbot")).kbId,
        endpointKey:(<IQnAService>botConfig.findServiceByNameOrId("Ajaxchatbot")).endpointKey,
        host:(<IQnAService>botConfig.findServiceByNameOrId("Ajaxchatbot")).hostname
});

const ajaxChatbot2 = new QnAMaker({
    knowledgeBaseId:(<IQnAService>botConfig.findServiceByNameOrId("Ajaxchatbot2")).kbId,
    endpointKey:(<IQnAService>botConfig.findServiceByNameOrId("Ajaxchatbot2")).endpointKey,
    host:(<IQnAService>botConfig.findServiceByNameOrId("Ajaxchatbot2")).hostname
});

const luis = new LuisRecognizer({
    applicationId: (<ILuisService>botConfig.findServiceByNameOrId("Ajax")).appId,
    endpointKey:(<ILuisService>botConfig.findServiceByNameOrId("Ajax")).subscriptionKey,
    endpoint:(<ILuisService>botConfig.findServiceByNameOrId("Ajax")).getEndpoint()

});

const logger = console;



// Create the main dialog.
const myBot = new MyBot(ajaxChatbot, ajaxChatbot2, luis, dialogs, conversationState);


// Listen for incoming requests.
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        // Route to main dialog.
        await myBot.onTurn(context);
    });
});
