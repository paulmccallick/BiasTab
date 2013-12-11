using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BiasTab.Models;
using BiasTab.Services;
using BiasTab.Web.Api;
using NSubstitute;
using NUnit.Framework;

namespace BiasTab.Web.Test
{
    [TestFixture]
    public class BiasTabControllerTest
    {
        [Test]
        public void WhenTradeEventIsReceivedBiasServiceIsNotifiedAndResultingBiasRowIsReturned()
        {
            var service = Substitute.For<IBiasReportService>();
            var tradeEvent = new BiasTradeEvent {Ticker = "A", BiasSessionId = 3, TradeAmount = 5};
            var biasRow = new BiasRow();
            service.UpdateTradeRow(tradeEvent).Returns(biasRow);

            var controller = new BiasTradeController(service);
            var row = controller.PostBiasTrade(tradeEvent);

            service.Received().UpdateTradeRow(tradeEvent);
            Assert.That(row,Is.SameAs(biasRow));
        }
    }
}
