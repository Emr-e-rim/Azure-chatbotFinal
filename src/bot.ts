// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

//import modules
import {ConversationState, MessageFactory, TurnContext} from 'botbuilder';
import {LuisRecognizer, QnAMaker} from "botbuilder-ai";
import greetings from '../src/data/greetings.json';
import {ApiRequest} from './ApiRequest';
import {Messages} from "./messages";
import help from '../src/data/help.json';
import {DialogSet, PromptOptions, WaterfallDialog, WaterfallStepContext} from "botbuilder-dialogs";
import {plugins} from "restify";
import {SentimentAnalysis} from "./sentimentAnalysis";
import axios from "axios";

export class MyBot {

    public static sentiment: number;

    private _QnAMaker: QnAMaker;
    private _Luis: LuisRecognizer;
    private _ajaxChatbot2: QnAMaker;
    private ApiRequest: ApiRequest;
    private dialogs: DialogSet;
    private logger: Console;
    private conversationState: ConversationState;
    private sentimentAnalysis: SentimentAnalysis;

    protected sentiment:Sentiment;
    //private activityType : ActivityTypes;


    //Create constructor
    constructor(qnaMaker: QnAMaker, ajaxChatbot2: QnAMaker, luis: LuisRecognizer, dialogs: DialogSet, conversationState: ConversationState){
        MyBot.sentiment = 0;
        this._QnAMaker = qnaMaker;
        this._ajaxChatbot2 = ajaxChatbot2;
        this._Luis = luis;
        this.ApiRequest = new ApiRequest();
        this.conversationState = conversationState;
        this.dialogs = dialogs;
        this.addDialogs();
        this.sentimentAnalysis = new SentimentAnalysis();


    }

    //this is used to create a Json object.
    //the object is used when the sentiment API is called
    //the sentiment API needs a Json object in this format to detect the sentiment
    private generateDocument(message){

        return {
            'documents': [
                {'id': '1', 'language': 'nl', 'text': message},
            ]
        }

    }

    private getScore(){

    }

    //this is ran when the chatbot gets a message
    async onTurn(context: TurnContext){
        const dc = await this.dialogs.createContext(context);
        await dc.continueDialog();

        if (context.activity.type==="message"){

            //use LUIS' NLP to detect the intent of the message
            await this._Luis.recognize(context).then(async res => {
                const luisResult = LuisRecognizer.topIntent(res);

                //to see which intent gave a match. Debugging purposes only
                //context.sendActivity(`The top intent found was ${luisResult}`);

                //use the order provided by the Luis web portal to make the switch statement
                //This switch statement is used the execute the right action according to the intent
                switch (luisResult) {
                    //each case is a different intent

                    //does not work but here is the tha case for when the user sends a gif
                    case("gif"):{
                        await context.sendActivities(Messages.sendMessage(["Bzz Bzz Error Error | Er is een fout opgetreden"]));

                        // dc.beginDialog("test");

                        // Run the Dialog with the new message Activity.


                        //this.textReply.text = 'This is an inline attachment.';
                        //this.textReply.attachments = [Gif.getInlineAttachment()];

                        break;
                    }
                    case ("goodbye"): {
                        //statements;
                        //Get the answer from the database
                        let randomItem = greetings.goodbye[Math.floor(Math.random()*greetings.goodbye.length)];
                        await context.sendActivities(Messages.sendMessage([randomItem]));
                        break;
                    }
                    case ("Greetings"): {
                        //Get the answer from the database
                        let randomItem = greetings.greetings[Math.floor(Math.random()*greetings.greetings.length)];
                        await context.sendActivities(Messages.sendMessage([randomItem]));
                        break;
                    }

                    case("help"):{
                        var reply = MessageFactory.suggestedActions((help.helpActions), 'Wat wil je weten ?');

                        await context.sendActivities(Messages.sendMessage(help.help));
                        await context.sendActivity(reply);
                        break;
                    }


                    case("time"):{
                        //give the time
                        await context.sendActivity(new Date().toLocaleTimeString());
                        //this.ApiRequest.sendData(null, null, null, null);
                        break;
                    }
                    default: {
                        //for each message is the sentiment determined
                        this.sentimentAnalysis.getSentiment(this.generateDocument(context.activity.text));
                        //console.log(luisResult);


                        try {
                            //connect to the server
                            const response = await axios.get('https://vps1.dss.cloud/arena/',{
                                params:{
                                    intent : '\"' + luisResult + '\"'
                                }

                            });

                            //send the reply to the server
                            if (response.data.answer != null){
                                await context.sendActivities(Messages.sendMessage([response.data.answer]));
                                await this.ApiRequest.sendData(context.activity.text,response.data.answer, luisResult, MyBot.sentiment);
                            }

                            else {
                                await context.sendActivities(Messages.sendMessage(["Bzz Bzz Error Error | Er is een fout opgetreden"]));

                            }
                            console.log("sentiment" + MyBot.sentiment);

                            //console.log(response.data);


                            //console.log(response);

                        } catch (error) {
                            console.error(error);
                        }




                        break;
                    }
                }

            });

            await this.conversationState.saveChanges(context);

        }

        }

    //DOES NOT WORK
    //when a user sends the intent "test" the conversation flow should start
    //it should ask for the name and the age.
    private addDialogs() : void {

        this.dialogs.add(new WaterfallDialog("test",[
            async (step: WaterfallStepContext) => {
                const choices =["hoi", "testen"];
                const options : PromptOptions = {
                    prompt: "Testing ", choices: choices
                };
                return await step.prompt("test", options)
            },



            async (step: WaterfallStepContext) =>{
                return await step.prompt("Nameprompt", `What is your name, human?`);

            },

            async (step: WaterfallStepContext) =>{
                return await step.prompt("age", `Hoe oud ben je ?`);

            },

            async (step: WaterfallStepContext) =>{
                await step.prompt("last", `Dit is de laatste vraag`);
                return await step.endDialog();

            },

        ]));

    }

    }

