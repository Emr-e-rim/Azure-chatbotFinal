import { ConversationState, TurnContext } from 'botbuilder';
import { LuisRecognizer, QnAMaker } from "botbuilder-ai";
import { DialogSet } from "botbuilder-dialogs";
export declare class MyBot {
    static sentiment: number;
    private _QnAMaker;
    private _Luis;
    private _ajaxChatbot2;
    private ApiRequest;
    private dialogs;
    private logger;
    private conversationState;
    private sentimentAnalysis;
    protected sentiment: Sentiment;
    constructor(qnaMaker: QnAMaker, ajaxChatbot2: QnAMaker, luis: LuisRecognizer, dialogs: DialogSet, conversationState: ConversationState);
    private generateDocument;
    private getScore;
    onTurn(context: TurnContext): Promise<void>;
    private addDialogs;
}
