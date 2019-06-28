"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var Gif = /** @class */ (function () {
    function Gif() {
    }
    Gif.getInlineAttachment = function () {
        var imageData = fs.readFileSync(path.join(__dirname, '../resources/images/q4z1k2afm2131.png'));
        var base64Image = Buffer.from(imageData).toString('base64');
        return {
            name: 'architecture-resize.png',
            contentType: 'image/png',
            contentUrl: "data:image/png;base64," + base64Image
        };
    };
    return Gif;
}());
exports.Gif = Gif;
//# sourceMappingURL=gif.js.map