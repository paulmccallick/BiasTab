using System.Web.Http;
using BiasTab.Models;
using BiasTab.Persistence;
using BiasTab.Services;

namespace BiasTab.Web.Api
{
    public class BiasTradeController : ApiController
    {
        private readonly IBiasReportService _biasReportService;


        public BiasTradeController(IBiasReportService biasReportService)
        {
            _biasReportService = biasReportService;
        }


        public BiasRow PostBiasTrade(BiasTradeEvent tradeEvent)
        {
            return _biasReportService.UpdateTradeRow(tradeEvent);
        }


        

    }


}
