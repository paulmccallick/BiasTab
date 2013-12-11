using System.Web.Http;
using BiasTab.Models;
using BiasTab.Persistence;

namespace BiasTab.Web.Api
{
    public class BiasReportController : ApiController
    {
        private readonly IBiasReportRepository _biasReportRepository;
        
        public BiasReportController(IBiasReportRepository biasReportRepository)
        {
            _biasReportRepository = biasReportRepository;
        }

        public BiasReport GetBiasReport(int biasReportSessionId)
        {
            return _biasReportRepository.GetBiasReport(biasReportSessionId);
        }
    }
}
