using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BiasTab.Models;
using BiasTab.Persistence;

namespace BiasTab.Services
{
    public interface IBiasReportService
    {
        BiasRow UpdateTradeRow(BiasTradeEvent tradeEvent);
    }

    public class BiasReportService : IBiasReportService
    {
        private readonly IBiasReportRepository _biasReportRepository;

        public BiasReportService(IBiasReportRepository biasReportRepository)
        {
            _biasReportRepository = biasReportRepository;
        }

        public  BiasRow UpdateTradeRow(BiasTradeEvent tradeEvent)
        {
            var biasRow = _biasReportRepository.GetBiasRow(tradeEvent.BiasSessionId, tradeEvent.Ticker);
            biasRow.TradeCount = tradeEvent.TradeAmount;
            biasRow.BenchmarkWeight = tradeEvent.TradeAmount * .02m;
            _biasReportRepository.SaveBiasRow(biasRow);
            return biasRow;

        }

        
    }
}
