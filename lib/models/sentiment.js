var Sentiment = /** @class */ (function () {
    function Sentiment() {
        this._bar = 0;
    }
    Object.defineProperty(Sentiment.prototype, "sentiment", {
        get: function () {
            return this._bar;
        },
        set: function (theBar) {
            this._bar = theBar;
        },
        enumerable: true,
        configurable: true
    });
    return Sentiment;
}());
//# sourceMappingURL=sentiment.js.map