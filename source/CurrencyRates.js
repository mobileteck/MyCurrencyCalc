enyo.kind({
	name: "CurrencyRates",
    kind: "FittableRows",
    published: {
        currencyCode: "",
        currencyData: ""
    },
    events: {
        onCurrencySelected: ""
    },
	components: [
        {name:"currencyAutoComplete", kind:"extras.AutoCompleteInputDecorator", onInputChanged:"currencyChanged", onValueSelected: "currencySelected", components:[
            {
                name: "currency",
                kind: "onyx.Input", 
                selectOnFocus: "true",
                placeholder: "Type currency",
                style: "font-size: 100%;",
                fit: true
            }
        ]},
    ],


  create: function(){
    this.inherited(arguments);
  },

  currencySelected: function(source, event){
    var values = this.currencyData.getCurrencyList();
    var value = this.$.currency.getValue();
    if(value !== "") {
        for(var i=0,v;v=values[i];i++) {
            if(v.name === value) {
                this.currencyCode = v.code;
            }
        }
    }
    this.doCurrencySelected();
  },


  currencyCodeChanged: function(inOldValue){
    this.$.currency.setValue("");
  },

  currencyChanged: function(source, event) {
        //this.log("currencyChanged");
        var values = this.currencyData.getCurrencyList();
        var value = this.$.currency.getValue();
        //this.log("value=" + value);
        var s = [];
        if(value !== "") {
            value = value.toLowerCase();
            for(var i=0,v;v=values[i];i++) {
                if((v.name.toLowerCase().indexOf(value) !== -1) || (v.code.toLowerCase().indexOf(value) !== -1)) {
                    s.push(v.name);
                }
            }
        }
        //this.log(s);
        this.$.currencyAutoComplete.setValues(s);    
    }


});
