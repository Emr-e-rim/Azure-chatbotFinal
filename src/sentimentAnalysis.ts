import * as https from "https";
import {MyBot} from "./bot";


//input your own data
let accessKey = ACCESKEY;
let uri = URI;
let path = PATH;


//after the message is stored in an Json object the sentiment detection is handled here
export class SentimentAnalysis{


    constructor(){
    }

    //the Json file with the right parameters is created and the sentiment API is called
    //The result is the sentiment score
    public getSentiment(documents){
        let body = JSON.stringify (documents);

        let request_params = {
            method : 'POST',
            hostname : uri,
            path : path,
            headers : {
                'Ocp-Apim-Subscription-Key' : accessKey,
            }
        };

        let req = https.request (request_params, this.response_handler);
        req.write (body);
        req.end ();

    }

    private response_handler(response){

        let body = '';
        response.on ('data', function (d) {
            body += d;
        });
        response.on ('end', function () {
            let body_ = JSON.parse (body);
            let body__ = JSON.stringify (body_, null, '  ');
            MyBot.sentiment = body_.documents[0].score;
            console.log (body__);

        });
        response.on ('error', function (e) {
            console.log ('Error: ' + e.message);
        });

    }



}
