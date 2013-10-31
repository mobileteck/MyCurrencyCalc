enyo.kind({
	name: "App",
	layoutKind: "FittableRowsLayout",
	components: [
		/*{
			kind: "Signals",
			ondeviceready: "deviceready",
			onbackbutton: "handleBackGesture",
			onCoreNaviDragStart: "handleCoreNaviDragStart",
			onCoreNaviDrag: "handleCoreNaviDrag",
			onCoreNaviDragFinish: "handleCoreNaviDragFinish"
		},*/
		{name: "currencyData", kind: "CurrencyData", onRatesUpdated: "onRatesUpdated"},
		{kind: "FittableRows", style: "border: 1px solid #333; background-color: #777; color: white; border-radius: 16px; text-align: right;", fit: true, components:[
			{name: "c2Toolbar", kind: "onyx.Toolbar", style: "margin-bottom: 5px;", classes: "numberToolbar", components:[
				{name: "cIcon2", kind: "CurrencyIcon", ontap:"currency2Changed", style: "float: left; height: 90%;"},
				{kind: "CurrencyRates", name: "currency2", showing: false, onCurrencySelected: "currency2Selected", style: "float: left;"},
				{name: "result", classes: "displayUnit", style: "font-weight: bold; text-overflow:clip; text-align: right;"}
				
			]},
			{name: "c1Toolbar", kind: "onyx.Toolbar", classes: "numberToolbar", style: "margin-bottom: 5px; text-align: right;", components:[
					{name: "cIcon1", kind: "CurrencyIcon", ontap:"currency1Changed", style: "float: left; height: 90%;"},
					{kind: "CurrencyRates", name: "currency1", showing: false, onCurrencySelected: "currency1Selected", style: "float: left;"},
					{name: "formula", classes: "displayUnit", style: "font-size: 150%; font-weight: bold; text-overflow:clip; text-align: right;"},
					{name: "backBtn", kind: "onyx.Button", style: "width: 40px; height: 40px; border-radius: 24px; font-weight: bold;", classes: "onyx-toolbar", content: "<", ontap: "backspaceTapped"}
			]},
			{name: "keyPadPanel", kind: "FittableRows", fit: true,
			defaultKind: enyo.kind({
				kind: "FittableColumns",
				defaultKind: enyo.kind({
					kind: "onyx.Button",
					classes: "onyx-toolbar",
					style: "margin: 0.99%; border-radius: 8px; font-size: 120%; font-weight: bold;",
					ontap: "keyTapped"
				}),
			}),
			components:[
				{components:[
    				{content: "&#8730;", ontap: "sqrtTapped", allowHtml: true},		
					{content: "("},
					{content: ")"},
					{content: "C", style: "margin-right: 0;", ontap: "cancelTapped"},
				]},
 				{components:[
                    {content: "ln", ontap: "lnTapped"},
                    {content: "log", ontap: "logTapped"},
                    {content: "^2"},
                    {content: "A",  tag :"i", classes: "iconFont", allowHtml: true, ontap: "swapTapped"},
                ]},
				{components:[
					{content: "7", classes: "number-button"},
					{content: "8", classes: "number-button"},
					{content: "9", classes: "number-button"},
					{content: "+", style: "margin-right: 0;"},
				]},
				{components:[
					{content: "4", classes: "number-button"},
					{content: "5", classes: "number-button"},
					{content: "6", classes: "number-button"},
					{content: "-", style: "margin-right: 0;"},
				]},
				{components:[
					{content: "1", classes: "number-button"},
					{content: "2", classes: "number-button"},
					{content: "3", classes: "number-button"},
					{content: "*", style: "margin-right: 0;"},
				]},
				{components:[
					{content: "."},
					{content: "0", classes: "number-button"},
					{content: "=", ontap: "equalsTapped"},
					{content: "/", style: "margin-right: 0;"},
				]},
			]},
			{name: "c3Toolbar", kind: "onyx.Toolbar", layoutKind: "FittableColumnsLayout", components:[
				{name: "lastUpdated", classes: "refreshBtn", style: "float: left;", content: "Powered by Yahoo.com", fit: true},
				{kind: "onyx.Button",  tag :"i", content: "B", classes: "iconFont refreshBtn", style: "height: 100%", allowHtml: true, ontap: "refreshRates"}
			]},
		]},
		//{kind: "CoreNavi", fingerTracking: true}, // having this breaks makes the bottom toolbar disappear after showing banner image
		{kind: "Signals", onkeypress: "onKeyPress"}
	],

	create: function(){
    	this.inherited(arguments);
    	this.$.currency1.setCurrencyData(this.$.currencyData);
    	this.$.currency2.setCurrencyData(this.$.currencyData);

    	var c1 = this.$.currencyData.getProfile().c1;
    	var c2 = this.$.currencyData.getProfile().c2;
    	this.$.currency1.setCurrencyCode(c1);
    	this.$.currency2.setCurrencyCode(c2);

    	this.$.cIcon1.setCurrencyCode(c1);	
    	this.$.cIcon2.setCurrencyCode(c2);	
		this.onRatesUpdated();


		// Map Pre Keyboard to keypad numbers
		this.keyMap = {
			'0' : '0',
			'1' : '1',
			'2' : '2',
			'3' : '3',
			'4' : '4',
			'5' : '5',
			'6' : '6',
			'7' : '7',
			'8' : '8',
			'9' : '9',
			'.' : '.',
			'+' : '+',
			'-' : '-',
			"_" : '-',
			'*' : '*',
			'/' : '/',
			'@' : '0',
			'e' : '1',
			'r' : '2',
			't' : '3',
			'd' : '4',
			'f' : '5',
			'g' : '6',
			'x' : '7',
			'c' : '8',
			'v' : '9',
			'w' : '+',
			's' : '-',
			'z' : '*',
			'q' : '/'
		};

  	},

  	 reflow: function(){
        this.inherited(arguments);
        this.$.c1Toolbar.applyStyle("height", (window.innerHeight * 0.12) + "px");
        this.$.c2Toolbar.applyStyle("height", (window.innerHeight * 0.12) + "px");

        var m = (window.innerHeight * 0.60 * 0.15 * 0.07) + "px !important";

		var c = this.$.keyPadPanel.getClientControls();
		for(var i=0; i < c.length; i++) {
			var d = c[i].getClientControls();
			for(var j=0; j < d.length; j++) {
				var e = d[j];
				if(e) {
					//e.applyStyle("height", (window.innerHeight * 0.60 * 0.15) + "px");
					e.applyStyle("width", (window.innerWidth * 0.225) + "px");
					e.applyStyle("height", (window.innerHeight * 0.09) + "px");
					e.applyStyle("margin", m);
				}
			}
		}

       this.$.c3Toolbar.applyStyle("height", (window.innerHeight * 0.10) + "px");
       //this.$.formula.setContent("reflow" + (window.innerHeight * 0.10));
    },

  	onRatesUpdated: function(){
  		var fmt = new enyo.g11n.DateFmt({
		     date: "short",
		     time: "short",
		     locale: new enyo.g11n.Locale('en_gb')
		});
		var d = this.$.currencyData.getLastUpdated();
		if(d){
			this.$.lastUpdated.setContent("FX Rates: " + fmt.format(d) + " powered by Yahoo.com");	
		}
		
  	},

	//Action Handlers

	// Called when keypad keys are pressed 
	keyTapped: function(inSender, inEvent) {
		var formula = this.$.formula;
		formula.setContent(formula.getContent() + inSender.getContent());
		
	},

	// Called when Keyboard keys are pressed
	onKeyPress: function(inSender, inEvent){

		if(inEvent.charCode === 8){
			this.backspaceTapped();
		} else if(inEvent.charCode === 13){
			this.equalsTapped();
		} else{
			var key = this.keyMap[String.fromCharCode(inEvent.charCode).toLowerCase()];
			if(key){
				var formula = this.$.formula;
				formula.setContent(formula.getContent() + key);	
			} 
		}

	},

	equalsTapped: function() {
		this.$.result.setContent(this.convert(this.$.formula.getContent()));

		this.$.currency1.hide();
		this.$.currency2.hide();
		this.$.formula.show();
		this.$.result.show();
		this.$.backBtn.show();
	},

	convert: function(formula) {
		try {

			// if there is nothing to calculate just skip
			if(!formula){
				return "";
			}

			var c1 = this.$.currency1.getCurrencyCode();
			var c2 = this.$.currency2.getCurrencyCode();

			//this.log("c1= " + c1);
			//this.log("c2= " + c2);

			var usdToC1 = this.$.currencyData.getFXRate(c1);

			//this.log("usdToC1= " + usdToC1);

			if(usdToC1 == null) {
				return "FX Rate for " + c1 + " not loaded";
			}
			
			var usdToC2 = this.$.currencyData.getFXRate(c2);

			//this.log("usdToC2= " + usdToC2);

			if(usdToC2 == null) {
				return "FX Rate for " + c1 + " not loaded";
			}
			
			var fx = usdToC2/usdToC1;

			//this.log("FX= " + fx);

			// Replace mathematical notation with JS here
			var parsed;
			parsed = formula.replace('sqrt', 'Math.sqrt');

			this.$.currencyData.setProfile({"c1": c1, "c2": c2});
			
			return eval(parsed) * fx;
		}
		catch(err) {
			enyo.log(err);
			return "Invalid Input";
		}
	},

	calculate: function(formula) {
		try {
			// Replace mathematical notation with JS here
			var parsed;
			parsed = formula.replace('sqrt', 'Math.sqrt');
			
			return eval(parsed);
		}
		catch(err) {
			enyo.log(err);
			return "Invalid Input";
		}
	},

	refreshRates: function() {
		this.$.currencyData.getCurrencyRates();
	},

	swapTapped: function(){
		var c1 = this.$.currency1.getCurrencyCode();
    	var c2 = this.$.currency2.getCurrencyCode();
    	this.$.currency1.setCurrencyCode(c2);
    	this.$.currency2.setCurrencyCode(c1);

    	this.$.cIcon1.setCurrencyCode(c2);	
    	this.$.cIcon2.setCurrencyCode(c1);	
    	this.equalsTapped();
	},

	cancelTapped: function() {
		this.$.result.setContent("");
		this.$.formula.setContent("");
	},
	sqrtTapped: function() {
		this.$.result.setContent("");
		this.$.formula.setContent("sqrt(");
	},
	lnTapped: function() {
		this.$.result.setContent("");
		this.$.formula.setContent("ln(");
	},
	logTapped: function() {
		this.$.result.setContent("");
		this.$.formula.setContent("log(");
	},
	backspaceTapped: function() {
		var formula = this.$.formula;
		formula.setContent(formula.getContent().substr(0, formula.getContent().length - 1));
	},
	//Helper Functions
	handleBackGesture: function(inSender, inEvent) {
		//this.$.AppPanels.setIndex(0);
	},
	handleCoreNaviDragStart: function(inSender, inEvent) {
		/*
		if(enyo.Panels.isScreenNarrow()) {
			this.$.AppPanels.dragstartTransition(inEvent);
		}
		*/
	},
	handleCoreNaviDrag: function(inSender, inEvent) {
		/*
		if(enyo.Panels.isScreenNarrow()) {
			this.$.AppPanels.dragTransition(inEvent);
		}
		*/
	},
	handleCoreNaviDragFinish: function(inSender, inEvent) {
		/*
		if(enyo.Panels.isScreenNarrow()) {
			this.$.AppPanels.dragfinishTransition(inEvent);
		}
		*/
	},

	currency1Changed: function(inSender, inEvent){
		this.$.currency1.show();
		this.$.formula.hide();
		this.$.backBtn.hide();
	},

	currency2Changed: function(inSender, inEvent){
		this.$.currency2.show();
		this.$.result.hide();
	},

	currency1Selected: function(inSender, inEvent){
		this.$.currency1.hide();
		var c = this.$.currency1.getCurrencyCode();
		if(c){
			this.$.cIcon1.setCurrencyCode(c);
		}
		
		this.$.formula.show();
		this.$.backBtn.show();
		this.equalsTapped();
	},

	currency2Selected: function(inSender, inEvent){
		this.$.currency2.hide();
		var c = this.$.currency2.getCurrencyCode();
		if(c){
			this.$.cIcon2.setCurrencyCode(c);	
		}
		
		this.$.result.show();
		this.equalsTapped();
	},
});
