enyo.kind({
	name: "CurrencyIcon",
    kind: "Image",
    published: {
        currencyCode: "",
    },
    events: {
    },
	components: [],

    currencyCodeChanged: function(inOldValue) {
        this.setSrc("assets/cur/" + this.currencyCode + ".png");    
    }

});
