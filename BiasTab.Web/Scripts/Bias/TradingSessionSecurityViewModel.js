var ko = require('knockout');
var Big = require('../vendor/big.js');

var TradingSessionSecurityViewModel;

TradingSessionSecurityViewModel = (function () {
    "use strict";


    function TradingSessionSecurityViewModel(portfolioCountryTargetValue) {
        var self = this;
        self.portfolioCountryTargetValue = portfolioCountryTargetValue;

        self.Ticker = ko.observable();
        self.SecurityId = ko.observable();
        self.SecurityName = ko.observable();
        self.SecurityType = ko.observable();
        self.Restriction = ko.observable();
        self.PortfolioWeight = ko.observable();
        self.TargetWeight = ko.observable();
        self.InitialBias = ko.observable();
        self.MinTradePercentOfVolume = ko.observable();
        self.SolverCode = ko.observable();
        self.QuantityHeld = ko.observable();
        self.PreferredSecurityReason = ko.observable();
        self.PremiumOrDiscount = ko.observable();
        self.MarketCapDollars = ko.observable();
        self.SectorId = ko.observable();
        self.SectorName = ko.observable();
        self.SecurityPrice = ko.observable();
        self.IsPreferred = ko.observable();
        self.PrimaryId = ko.observable();
        self.Exchange = ko.observable();
        self.FiveDayAverageVolume = ko.observable();
        self.TwentyDayAverageVolume = ko.observable();
        self.HundredDayAverageVolume = ko.observable();
        self.GroupId = ko.observable();
        self.InTarget = ko.observable();
        self.IsPnoteSell = ko.observable();

        self._tradeComments = ko.observable();
        self.TradeComments = ko.computed({
            write: function (newValue) {
                self._tradeComments(newValue);
            },
            read: function () {
                return self._tradeComments();
            }
        });

        self._securityComments = ko.observable();
        self.SecurityComments = ko.computed({
            write: function (newValue) {
                self._securityComments(newValue);
            },
            read: function () {
                return self._securityComments();
            }
        });

        self.FiveDayAverageVolumeDollars = ko.computed(function () {
            if (self.FiveDayAverageVolume() && self.SecurityPrice()) {
                return new Big(self.FiveDayAverageVolume()).times(self.SecurityPrice()).toFloat();
            } else {
                return 0;
            }
        });

        self._tradeShares = ko.observable();
        self.TradeShares = ko.computed({
            write: function (newValue) {
                var newTradeShares = new Big(newValue);
                var roundedTradeShares = newTradeShares
                    .div(self.RoundLot())
                    .round()
                    .times(self.RoundLot());

                if (roundedTradeShares.plus(self.QuantityHeld()) < 0) {
                    roundedTradeShares = new Big(self.QuantityHeld() * -1);
                }
                self._tradeShares(roundedTradeShares.toFloat());
            },
            read: function () {
                return self._tradeShares();
            }
        });

        self._roundLot = ko.observable();
        self.RoundLot = ko.computed({
            write: function (newValue) {
                self._roundLot(newValue);
                self.TradeShares(self._tradeShares());
            },
            read: function () {
                return self._roundLot();
            }
        });

        self.TradeValue = ko.computed({
            read: function () {
                if (self.TradeShares() && self.SecurityPrice()) {
                    return new Big(self.TradeShares())
                        .times(self.SecurityPrice()).toFloat();
                } else {
                    return 0;
                }
            },
            write: function (newValue) {
                var newTradeShares = new Big(newValue).div(self.SecurityPrice());
                self.TradeShares(newTradeShares.toFloat());
            }
        });

        self.PercentOfVolume = ko.computed({
            read: function () {
                if (self.TradeValue() && self.FiveDayAverageVolumeDollars()) {
                    return new Big(self.TradeValue())
                        .div(self.FiveDayAverageVolumeDollars())
                        .toFloat();
                } else {
                    return 0;
                }
            }
        });

    };

    TradingSessionSecurityViewModel.prototype.initialize = function (jsObject, groupId) {
        var self = this;
        self.SecurityId(jsObject.SecurityId);
        self.Ticker(jsObject.Ticker);
        self.SecurityName(jsObject.SecurityName);
        self.SecurityType(jsObject.SecurityType);
        self.Restriction(jsObject.Restriction);
        self._tradeShares(jsObject.TradeShares);
        self.PortfolioWeight(jsObject.PortfolioWeight);
        self.TargetWeight(jsObject.TargetWeight);
        self.InitialBias(jsObject.InitialBias);
        self.MinTradePercentOfVolume(jsObject.MinTradePercentOfVolume);
        self.SolverCode(jsObject.SolverCode);
        self._tradeComments(jsObject.TradeComments);
        self._roundLot(jsObject.RoundLot);
        self._securityComments(jsObject.SecurityComments);
        self.QuantityHeld(jsObject.QuantityHeld);
        self.PreferredSecurityReason(jsObject.PreferredSecurityReason);
        self.PremiumOrDiscount(jsObject.PremiumOrDiscount);
        self.MarketCapDollars(jsObject.MarketCapDollars);
        self.SectorId(jsObject.SectorId);
        self.SectorName(jsObject.SectorName);
        self.SecurityPrice(jsObject.SecurityPrice);
        self.IsPreferred(jsObject.IsPreferred);
        self.PrimaryId(jsObject.PrimaryId);
        self.Exchange(jsObject.Exchange);
        self.FiveDayAverageVolume(jsObject.FiveDayAverageVolume);
        self.TwentyDayAverageVolume(jsObject.TwentyDayAverageVolume);
        self.HundredDayAverageVolume(jsObject.HundredDayAverageVolume);
        self.GroupId(groupId);
        self.InTarget(jsObject.InTarget);
        self.IsPnoteSell(jsObject.IsPnoteSell);
        return self;
    };

    return TradingSessionSecurityViewModel;
})();

module.exports = TradingSessionSecurityViewModel;