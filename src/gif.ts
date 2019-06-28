import * as fs from "fs";
import * as path from "path";

//THIS DOES NOT WORK
export class Gif{


    constructor(){

    }

    public static getInlineAttachment() {
        const imageData = fs.readFileSync(path.join(__dirname, '../resources/images/q4z1k2afm2131.png'));
        const base64Image = Buffer.from(imageData).toString('base64');

        return {
            name: 'architecture-resize.png',
            contentType: 'image/png',
            contentUrl: `data:image/png;base64,${ base64Image }`
        };
    }
}
