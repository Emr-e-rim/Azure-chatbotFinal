export class Messages {

    //in this file are the reply messages created
    public static sendMessage (messages:Array<string>){

        let activities: Array<any>;
        activities =[];

        for (let i = 0; i < messages.length; i++) {

            //if replies have a | they are seperated in different speech bubbles
            if (messages[i].includes("|")){
                let splitResult = messages[i].split("|");

                //show for each reply the typing message before sending the text
                for (let j =0; j < splitResult.length; j++){
                    activities.push({ type: 'typing' });
                    activities.push({ type: 'delay', value: 500*i });
                    activities.push({ type: 'message', text: splitResult[j] })
                }

            }

            else{
                activities.push({ type: 'typing' });
                activities.push({ type: 'delay', value: 500*i });
                activities.push({ type: 'message', text: messages[i] })
            }

        }

        return activities

    }

}
