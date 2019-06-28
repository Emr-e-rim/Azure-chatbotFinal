class Sentiment {

    private _bar:number = 0;
    get sentiment():number {
        return this._bar;
    }
    set sentiment(theBar:number) {
        this._bar = theBar;
    }

}
