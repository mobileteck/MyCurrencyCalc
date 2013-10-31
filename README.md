MyCurrencyCalc
================

My Currency Calc App is a very simple FX Calculator based on WebOS Ports Calculator App (https://github.com/webOS-ports/org.webosports.app.calculator) 

- Support for 65 popular currencies
- FX Rates powered by Yahoo Finance
- Cache FX Rates for offline support. Auto update rates once a day. 

The App is written in Enyo 2.x framework and PhoneGap 2.x

## Installation (WebOS)

	git clone https://github.com/mobileteck/MyCurrencyCalc.git
	cd MyCurrencyCalc
	git submodule update --init
	tools\deploy.bat --cordova-webos
	palm-install bin\*.ipk
