var portfolioCountryTargetValue,
    securityJSObject,
    securityJSObject2,
    securityGroupJSObject,
    viewModel;

module("TradingSessionSecurityGroupViewModelTests", {
    setup: function () {
        SetupStartingObjects();
        viewModel = new ViewModels.TradingSessionSecurityGroupViewModel(portfolioCountryTargetValue);
        viewModel.init(securityGroupJSObject);
    },
    tearDown: function () {
    }
});

test("ViewModel is initialized", function () {
    
    equal(viewModel.SectorId(), securityGroupJSObject.SectorId, "SectorId is not correct");
    equal(viewModel.SectorName(), securityGroupJSObject.SectorName, "SectorName is not correct");
    equal(viewModel.PortfolioWeight(), securityGroupJSObject.PortfolioWeight, "PortfolioWeight is not correct");
    equal(viewModel.TargetWeight(), securityGroupJSObject.TargetWeight, "TargetWeight is not correct");
    equal(viewModel.InitialBias(), securityGroupJSObject.InitialBias, "InitialBias is not correct");
    equal(viewModel.MarketCapDollars(), securityGroupJSObject.MarketCapDollars, "MarketCapDollars is not correct");
});

test("ViewModel securities are initialized", function () {

    equal(viewModel.Securities().length, 2, "securities are not correct");

    var firstSecurity = viewModel.Securities()[0];
    var secondSecurity = viewModel.Securities()[1];
    
    for (var property in securityJSObject) {
        equal(firstSecurity[property](), securityJSObject[property], property + " is not equal in first security");
        equal(secondSecurity[property](), securityJSObject2[property], property + " is not equal in second security");
    }

});

test("Properties are derived from the perferred security", function () {

    var preferredSecurity = viewModel.preferredSecurity();
    equal(viewModel.Ticker(), preferredSecurity.Ticker(), "Ticker is not correct");
    equal(viewModel.SecurityId(), preferredSecurity.SecurityId(), "SecurityId is not correct");
    equal(viewModel.SecurityName(), preferredSecurity.SecurityName(), "SecurityName is not correct");
    equal(viewModel.SecurityType(), preferredSecurity.SecurityType(), "SecurityType is not correct");
    equal(viewModel.Restriction(), preferredSecurity.Restriction(), "Restriction is not correct");
    equal(viewModel.FiveDayAverageVolumeDollars(), preferredSecurity.FiveDayAverageVolumeDollars(), "FiveDayAverageVolumeDollars is not correct");
    equal(viewModel.MinTradePercentOfVolume(), preferredSecurity.MinTradePercentOfVolume(), "MinTradePercentOfVolume is not correct");
    equal(viewModel.SolverCode(), preferredSecurity.SolverCode(), "SolverCode is not correct");
    equal(viewModel.TradeComments(), preferredSecurity.TradeComments(), "TradeComments is not correct");
    equal(viewModel.SecurityComments(), preferredSecurity.SecurityComments(), "SecurityComments is not correct");
    equal(viewModel.QuantityHeld(), preferredSecurity.QuantityHeld(), "QuantityHeld is not correct");
    equal(viewModel.PremiumOrDiscount(), preferredSecurity.PremiumOrDiscount(), "PremiumOrDiscount is not correct");
    equal(viewModel.SecurityPrice(), preferredSecurity.SecurityPrice(), "SecurityPrice is not correct");
});

test("trade comments and security Comments update correctly", function () {
    var tradeComments = "Sweet Trade";
    var securityComments = "Sweet Security";
    viewModel.TradeComments(tradeComments);
    viewModel.SecurityComments(securityComments);

    equal(viewModel.TradeComments(), tradeComments, "TradeComments was not set correctly");
    equal(viewModel.preferredSecurity().TradeComments(), tradeComments, "TradeComments was not set correctly");
    equal(viewModel.SecurityComments(), securityComments, "SecurityComments was not set correctly");
    equal(viewModel.preferredSecurity().SecurityComments(), securityComments, "SecurityComments was not set correctly");
});

test("trade shares is rounded up correctly", function () {

    viewModel.TradeShares(15);

    equal(viewModel.TradeShares(), 20, "trade shares is NOT rounded up correctly");
    equal(viewModel.preferredSecurity().TradeShares(), 20, "trade shares is NOT rounded up correctly");
});

test("trade shares is rounded down correctly", function () {

    viewModel.TradeShares(14);

    equal(viewModel.TradeShares(), 10, "trade shares is NOT rounded down correctly");
    equal(viewModel.preferredSecurity().TradeShares(), 10, "trade shares is NOT rounded down correctly");
});

test("trade shares is not rounded when it doesn't need to be", function () {

    viewModel.TradeShares(10);

    equal(viewModel.TradeShares(), 10, "trade shares is NOT rounded down correctly");
    equal(viewModel.preferredSecurity().TradeShares(), 10, "trade shares is NOT rounded down correctly");
});

test("round lot is set correctly", function () {

    viewModel.RoundLot(15);

    equal(viewModel.RoundLot(), 15, "round lot was not set correctly");
    equal(viewModel.preferredSecurity().RoundLot(), 15, "round lot was not set correctly");
});

test("Updating Round lot updates Trade shares Correctly", function () {

    viewModel.TradeShares(21);
    viewModel.RoundLot(15);

    equal(viewModel.RoundLot(), 15, "round lot was not set correctly");
    equal(viewModel.TradeShares(), 15, "trade shares is NOT updated correctly");
    equal(viewModel.preferredSecurity().RoundLot(), 15, "round lot was not set correctly");
    equal(viewModel.preferredSecurity().TradeShares(), 15, "trade shares is NOT updated correctly");
});


//test("Trade shares updated based on trade value", function () {

//    viewModel.preferredSecurity().SecurityPrice(1.50);
//    viewModel.RoundLot(15);
//    viewModel.TradeValue(100);

//    equal(viewModel.TradeValue(), 90, "Trade Value was not updated correctly");
//    equal(viewModel.TradeShares(), 60, "trade shares was not set correctly");
//    equal(viewModel.preferredSecurity().TradeValue(), 90, "Trade Value was not updated correctly");
//    equal(viewModel.preferredSecurity().TradeShares(), 60, "trade shares was not set correctly");
//});

//test("Trade shares updated based final bias ", function () {

//    viewModel.FinalBias(.1);

//    equal(viewModel.TradeShares(), -550, "trade shares was not set correctly");
//    equal(viewModel.preferredSecurity().TradeShares(), -550, "trade shares was not set correctly");
//});


//test("Trade shares updated based final bias but doesn't exceed porfolio shares", function () {

//    viewModel.FinalBias(-1);

//    equal(viewModel.TradeShares(), -2000, "trade shares was not set correctly");
//    equal(viewModel.FinalBias(), -.21, "trade shares was not set correctly");
//    equal(viewModel.preferredSecurity().TradeShares(), -2000, "trade shares was not set correctly");
//    equal(viewModel.preferredSecurity().FinalBias(), -.21, "trade shares was not set correctly");
//});

//test("Final bias is correct when there are no trades", function () {

//    viewModel.TradeShares(0);

//    equal(viewModel.FinalBias(), viewModel.InitialBias(), "final bias is not correct");
//});


test("Trade shares updated doesn't exceed porfolio shares", function () {

    viewModel.preferredSecurity().QuantityHeld(100);
    viewModel.TradeShares(-54100);
    
    equal(viewModel.TradeShares(), -100, "trade shares was not set correctly");
    equal(viewModel.preferredSecurity().TradeShares(), -100, "trade shares was not set correctly");
});

test("five day average volume is updated correctly", function () {

    viewModel.preferredSecurity().FiveDayAverageVolume(1000);
    viewModel.preferredSecurity().SecurityPrice(.5);
    equal(viewModel.FiveDayAverageVolumeDollars(), 500, "five day average volume dollar is NOT updated correctly");
    equal(viewModel.preferredSecurity().FiveDayAverageVolumeDollars(), 500, "five day average volume dollar is NOT updated correctly");
});

test("Percent of volume is updated correctly", function () {

    viewModel.preferredSecurity().FiveDayAverageVolume(1000);
    viewModel.preferredSecurity().SecurityPrice(1);
    viewModel.RoundLot(1);
    viewModel.TradeValue(654);
    equal(viewModel.PercentOfVolume(), .654, "Percent of volume is NOT updated correctly");
    equal(viewModel.preferredSecurity().PercentOfVolume(), .654, "Percent of volume is NOT updated correctly");
});

test("Preferred Security is chosen if security is preferred", function () {

    equal(viewModel.preferredSecurity().Ticker(), securityJSObject.Ticker,"Preferred security was not set correctly");
});

test("P-note Security is chosen if security is a pnote and selling in the country", function () {
    securityJSObject.IsPnoteSell = true;
    securityJSObject.IsPreferred = false;

    securityJSObject2.IsPnoteSell = false;
    securityJSObject2.IsPreferred = true;

    var newSecurityGroupJsObject = {
        MarketCapDollars: 11000,
        SectorId: 1,
        SectorName: "GicsSector1",
        TargetWeight: .21,
        InitialBias: .19,
        PortfolioWeight: .4,
        Securities: [securityJSObject, securityJSObject2]
    };

    viewModel = new ViewModels.TradingSessionSecurityGroupViewModel(portfolioCountryTargetValue);
    viewModel.init(newSecurityGroupJsObject);

    equal(viewModel.preferredSecurity().Ticker(), securityJSObject.Ticker, "Preferred security was not set correctly");
});

test("If no Preferred Security then its chosen by what security we hold", function () {
    securityJSObject.QuantityHeld = 0;
    securityJSObject.IsPreferred = false;

    var newSecurityGroupJsObject = {
        MarketCapDollars: 11000,
        SectorId: 1,
        SectorName: "GicsSector1",
        TargetWeight: .21,
        InitialBias: .19,
        PortfolioWeight: .4,
        Securities: [securityJSObject, securityJSObject2]
    };

    viewModel = new ViewModels.TradingSessionSecurityGroupViewModel(portfolioCountryTargetValue);
    viewModel.init(newSecurityGroupJsObject);

    equal(viewModel.preferredSecurity().Ticker(), securityJSObject2.Ticker, "Preferred security was not set correctly");
});

test("If no Preferred Security and we hold multiple then we chose the one with the biggest weight", function () {
    securityJSObject.IsPreferred = false;

    var newSecurityGroupJsObject = {
        MarketCapDollars: 11000,
        SectorId: 1,
        SectorName: "GicsSector1",
        TargetWeight: .21,
        InitialBias: .19,
        PortfolioWeight: .4,
        Securities: [securityJSObject, securityJSObject2]
    };

    viewModel = new ViewModels.TradingSessionSecurityGroupViewModel(portfolioCountryTargetValue);
    viewModel.init(newSecurityGroupJsObject);

    equal(viewModel.preferredSecurity().Ticker(), securityJSObject.Ticker, "Preferred security was not set correctly");
});

test("If all dont match then we choose the target", function () {
    securityJSObject.IsPreferred = false;
    securityJSObject.QuantityHeld = 1000;

    var newSecurityGroupJsObject = {
        MarketCapDollars: 11000,
        SectorId: 1,
        SectorName: "GicsSector1",
        TargetWeight: .21,
        InitialBias: .19,
        PortfolioWeight: .4,
        Securities: [securityJSObject, securityJSObject2]
    };

    viewModel = new ViewModels.TradingSessionSecurityGroupViewModel(portfolioCountryTargetValue);
    viewModel.init(newSecurityGroupJsObject);

    equal(viewModel.preferredSecurity().Ticker(), securityJSObject.Ticker, "Preferred security was not set correctly");
});

function SetupStartingObjects() {
    portfolioCountryTargetValue = 10000;
    securityJSObject = {
        Ticker: "MSFT",
        SecurityName: "Microsoft",
        SecurityType: "Fund",
        PortfolioWeight: .4,
        TradeShares: -1000,
        SecurityPrice: 2,
        FiveDayAverageVolume: 10000,
        SolverCode: "SolverCode1",
        Restriction: "Restriction1",
        TradeComments: "PmComments1",
        SecurityComments: "SecurityComments1",
        RoundLot: 10,
        QuantityHeld: 2000,
        PreferredSecurityReason: "PreferredSecurity1",
        PremiumOrDiscount: 45.5,
        MinTradePercentOfVolume: 5254,
        SecurityId: 4556,
        IsPreferred: true,
        IsPnoteSell: false
    };
    securityJSObject2 = {
        Ticker: "MSFT2",
        SecurityName: "Microsoft2",
        SecurityType: "Fund2",
        PortfolioWeight: .4,
        TradeShares: -1000,
        SecurityPrice: 2,
        FiveDayAverageVolume: 10000,
        SolverCode: "SolverCode2",
        Restriction: "Restriction2",
        TradeComments: "PmComments2",
        SecurityComments: "SecurityComments2",
        RoundLot: 15,
        QuantityHeld: 1000,
        PreferredSecurityReason: "PreferredSecurity2",
        PremiumOrDiscount: 45.5,
        MinTradePercentOfVolume: 5254,
        SecurityId: 4556,
        IsPreferred: false,
        IsPnoteSell: false
    };
    
    securityGroupJSObject = {
        MarketCapDollars: 11000,
        SectorId: 1,
        SectorName: "GicsSector1",
        TargetWeight: .21,
        InitialBias: .19,
        PortfolioWeight: .4,
        Securities: [securityJSObject, securityJSObject2]
    };
};
