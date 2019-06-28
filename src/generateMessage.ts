import axios from "axios";

export class GenerateMessage{

    data : any;

    public static async getMessage() {
        try {
            const response = await axios.get(URL,{
                params:{
                    intent :'"none"'
                }
            });
            console.log(response.data.answer);
        } catch (error) {
            console.error(error);
        }
    }
}
