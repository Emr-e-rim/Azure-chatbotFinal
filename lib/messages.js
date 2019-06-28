"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Messages = /** @class */ (function () {
    function Messages() {
    }
    Messages.sendMessage = function (messages) {
        var activities;
        activities = [];
        for (var i = 0; i < messages.length; i++) {
            if (messages[i].includes("|")) {
                var splitResult = messages[i].split("|");
                for (var j = 0; j < splitResult.length; j++) {
                    activities.push({ type: 'typing' });
                    activities.push({ type: 'delay', value: 500 * i });
                    activities.push({ type: 'message', text: splitResult[j] });
                }
            }
            else {
                activities.push({ type: 'typing' });
                activities.push({ type: 'delay', value: 500 * i });
                activities.push({ type: 'message', text: messages[i] });
            }
        }
        return activities;
    };
    return Messages;
}());
exports.Messages = Messages;
//# sourceMappingURL=messages.js.map