enyo.kind({
    name: "CurrencyData",
    kind: "enyo.Component",
    handlers: {
    },
    published: {
        profile: ""
    },
    events: {
        onRatesUpdated: ""
    },

    create: function(){
    	this.inherited(arguments);
        this.initProfile();
        enyo.asyncMethod(this, function() {
            this.initRates();
        });
    	
  	},

    initProfile: function(){
        var profileString = localStorage.getItem("profile");
        if(profileString){
            this.profile = JSON.parse(profileString); 
        } else {
            // defaults to USD and GBP
            this.profile = {"c1": "USD", "c2": "GBP"};
        }
    },

  	initRates: function() {
        var ratesString = localStorage.getItem("rates");
        if(ratesString){
            this.rates = JSON.parse(ratesString); 

            // if its older than 24Hrs, then refresh rates
           if((new Date() - this.getLastUpdated()) > 24 * 60 * 60 * 1000){
                this.log("Rates older than 24Hrs, getting new rates");
                this.getCurrencyRates();
           } else {
                // update banner
                this.doRatesUpdated();
           }


        } else {
            this.rates = {};
            this.getCurrencyRates();
        }
        
    },

    profileChanged: function(oldValue){
        if(this.profile.c1 != oldValue.c1 || this.profile.c2 != oldValue.c2){
            this.log("Currency Pair Changed, saving");
            localStorage.setItem("profile", JSON.stringify(this.profile));    

        }
    },

    getCurrencyRates: function() {

        this.log("Getting Rates");

        var values = this.getCurrencyList();
        var currencyPairs = values.map(function(e){
            return '"USD' + e.code + '"';
        });

        var currencyPairsString  = currencyPairs.join(",");
        //this.log(currencyPairs);
        //this.log(currencyPairsString);
        var yql = "select id, Rate from yahoo.finance.xchange where pair in (" + currencyPairsString + ")";
        var url = "http://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent(yql) + "&format=json" + "&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
        //this.log(url);
        //if(this.$.nativeUtils.checkInternetConnection()){
        //url = "mockData.json";
        new enyo.Ajax({url: url}).go().response(this, "gotCurrencyRates").error(this, "gotFailure");
        //}
  	},


  	gotCurrencyRates: function(inSender, inResponse) {
    	this.log("gotResults");
    	//this.log(inResponse);
    	if(inResponse && inResponse.query && inResponse.query.count) {
            // we got valid FX results
            if(inResponse.query.count> 0){
                this.rates = inResponse.query;
                localStorage.setItem("rates", JSON.stringify(inResponse.query));     

                if(enyo.platform.webos) {
                    navigator.notification.showBanner("Rates Updated"); 
                } 

            }
    		
    	}

		//this.log(this.rates);
        this.doRatesUpdated();
    },

    gotFailure: function(inSender, inResponse) {
		this.log("gotFailure");
		this.log(inResponse);
	},

    getLastUpdated: function(){
        if(this.rates && this.rates.created){
            return new Date(Date.parse(this.rates.created));    
        } else{
            return null;
        }
        
    },

	getFXRate: function(currency) {
		//this.log(currency);

        if(currency === "USD") {
            return 1;
        }

		var r = this.rates.results.rate;

		//this.log(r);

		for(var i=0,v;v=r[i];i++) {
			//this.log(v);
            if(v.id === "USD" + currency) {
                return v.Rate;
            }
        }

        return null;
	},


  getCurrencyList: function(){
  	return [{
        'name': 'United States Dollar',
        'code': 'USD'
    }, {
        'name': 'Argentine Peso',
        'code': 'ARS'
    }, {
        'name': 'Bolivian Boliviano',
        'code': 'BOB'
    }, {
        'name': 'Brazilian Real',
        'code': 'BRL'
    }, {
        'name': 'Canadian Dollar',
        'code': 'CAD'
    }, {
        'name': 'Chilean Peso',
        'code': 'CLP'
    }, {
        'name': 'Colombian Peso',
        'code': 'COP'
    }, {
        'name': 'Honduran Lempira',
        'code': 'HNL'
    }, {
        'name': 'Mexican Peso',
        'code': 'MXN'
    }, {
        'name': 'Peruvian Nuevo Sol',
        'code': 'PEN'
    }, {
        'name': 'Trinidad and Tobago Dollar',
        'code': 'TTD'
    }, {
        'name': 'Venezuelan Bolívar',
        'code': 'VEB'
    }, {
        'name': 'British Pound',
        'code': 'GBP'
    }, {
        'name': 'Bulgarian Lev',
        'code': 'BGN'
    }, {
        'name': 'Croatian Kuna',
        'code': 'HRK'
    }, {
        'name': 'Czech Koruna',
        'code': 'CZK'
    }, {
        'name': 'Danish Krone',
        'code': 'DKK'
    }, {
        'name': 'Estonian Kroon',
        'code': 'EEK'
    }, {
        'name': 'Euro',
        'code': 'EUR'
    }, {
        'name': 'Hungarian Forint',
        'code': 'HUF'
    }, {
        'name': 'Icelandic Króna',
        'code': 'ISK'
    }, {
        'name': 'Lithuanian Litas',
        'code': 'LTL'
    }, {
        'name': 'Netherlands Antillean Gulden',
        'code': 'ANG'
    }, {
        'name': 'New Romanian Leu',
        'code': 'RON'
    }, {
        'name': 'New Turkish Lira',
        'code': 'TRY'
    }, {
        'name': 'Norwegian Krone',
        'code': 'NOK'
    }, {
        'name': 'Polish Złoty',
        'code': 'PLN'
    }, {
        'name': 'Russian Rouble',
        'code': 'RUB'
    }, {
        'name': 'Serbian Dinar',
        'code': 'CSD'
    }, {
        'name': 'Swedish Krona',
        'code': 'SEK'
    }, {
        'name': 'Slovak Koruna',
        'code': 'SKK'
    }, {
        'name': 'Slovenian Tolar',
        'code': 'SIT'
    }, {
        'name': 'Swiss Franc',
        'code': 'CHF'
    }, {
        'name': 'Ukrainian Hryvnia',
        'code': 'UAH'
    }, {
        'name': 'Brunei Dollar',
        'code': 'BND'
    }, {
        'name': 'Chinese Yuan (renminbi)',
        'code': 'CNY'
    }, {
        'name': 'Hong Kong Dollar',
        'code': 'HKD'
    }, {
        'name': 'Indian Rupee',
        'code': 'INR'
    }, {
        'name': 'Indonesian Rupiah',
        'code': 'IDR'
    }, {
        'name': 'Japanese Yen',
        'code': 'JPY'
    }, {
        'name': 'Kazakhstani Tenge',
        'code': 'KZT'
    }, {
        'name': 'Malaysian Ringgit',
        'code': 'MYR'
    }, {
        'name': 'Nepalese Rupee',
        'code': 'NPR'
    }, {
        'name': 'New Taiwan Dollar',
        'code': 'TWD'
    }, {
        'name': 'Pakistani Rupee',
        'code': 'PKR'
    }, {
        'name': 'Philippine Peso',
        'code': 'PHP'
    }, {
        'name': 'Singapore Dollar',
        'code': 'SGD'
    }, {
        'name': 'Sri Lankan Rupee',
        'code': 'LKR'
    }, {
        'name': 'South Korean Won',
        'code': 'KRW'
    }, {
        'name': 'Thai Baht',
        'code': 'THB'
    }, {
        'name': 'Botswana Pula',
        'code': 'BWP'
    }, {
        'name': 'Egyptian Pound',
        'code': 'EGP'
    }, {
        'name': 'Mauritian Rupee',
        'code': 'MUR'
    }, {
        'name': 'Moroccan Dirham',
        'code': 'MAD'
    }, {
        'name': 'South African Rand',
        'code': 'ZAR'
    }, {
        'name': 'Bahraini Dinar',
        'code': 'BHD'
    }, {
        'name': 'Kuwaiti Dinar',
        'code': 'KWD'
    }, {
        'name': 'New Israeli Sheqel',
        'code': 'ILS'
    }, {
        'name': 'Omani Rial',
        'code': 'OMR'
    }, {
        'name': 'Qatari Riyal',
        'code': 'QAR'
    }, {
        'name': 'Saudi Riyal',
        'code': 'SAR'
    }, {
        'name': 'United Arab Emirates Dirham',
        'code': 'AED'
    }, {
        'name': 'Australian Dollar',
        'code': 'AUD'
    }, {
        'name': 'Fijian Dollar',
        'code': 'FJD'
    }, {
        'name': 'New Zealand Dollar',
        'code': 'NZD'
    }, ];
  }
   
});
