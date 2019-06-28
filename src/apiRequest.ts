import axios from "axios";

//https://github.com/axios/axios

//all the data is stored in the database in this file
export class ApiRequest{

    //inputMessage = message from user
    //responseMessage = bot reply to inputMessage
    //LuisIntent = detected intent of inputMessage
    //sentimentScore = sentiment score of inputMessage
    public sendData(inputMessage, responseMessage, luisIntent, sentimentScore){
        axios.post(URL, {
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
    }

}
