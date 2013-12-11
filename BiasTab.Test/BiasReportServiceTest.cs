using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BiasTab.Models;
using BiasTab.Persistence;
using BiasTab.Services;
using NSubstitute;
using NUnit.Framework;

namespace BiasTab.Test
{
    [TestFixture]
    public class BiasReportServiceTest
    {
        [Test]
        public void WhenTradeEventIsReceivedTradeRowIsRetrieivedUpdatedAndSaved()
        {
            int biasReportSessionId = 100;
            string ticker = "A";
            

            var repository = Substitute.For<IBiasReportRepository>();
            var existingBiasRow = new BiasRow {BiasSessionId = biasReportSessionId,TradeCount = 0, Ticker = "1"};
            repository.GetBiasRow(biasReportSessionId, ticker).Returns(existingBiasRow);

            var tradeEvent = new BiasTradeEvent {BiasSessionId = biasReportSessionId, Ticker = ticker, TradeAmount = 5};

            var service = new BiasReportService(repository);
            service.UpdateTradeRow(tradeEvent);

            repository.Received().SaveBiasRow(existingBiasRow);
            Assert.That(existingBiasRow.TradeCount,Is.EqualTo(5));



        }
    }
}
