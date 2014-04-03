/// <reference path="~/scripts/imported/big.js" />
module("TradingSessionSecurityViewModelTests", {
    setup: function () {

    },
    tearDown: function () {
    }
});

var portfolioCountryTargetValue = 10000;

var jsSecurityObject = {
    Ticker: "MSFT",
    SecurityName: "Microsoft",
    SecurityType: "Fund",
    PortfolioWeight: .4,
    TargetWeight: .21,
    InitialBias: .19,
    TradeShares: -1000,
    SecurityPrice: 2,
    FiveDayAverageVolume: 10000,
    TwentyDayAverageVolume: 10000,
    HundredDayAverageVolume: 10000,
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
    PrimaryId: "sad456",
    Exchange: "exchange"
};

test("ViewModel is initialized", function () {

    var viewModel = new ViewModels.TradingSessionSecurityViewModel(portfolioCountryTargetValue);

    viewModel.initialize(jsSecurityObject);

    for (var property in jsSecurityObject) {
        equal(viewModel[property](), jsSecurityObject[property], property + " is not equal");
    }

    equal(viewModel.TradeValue(), -2000, "trade value is not correct");
    ok(viewModel, "viewmodel should have been created.");
});
