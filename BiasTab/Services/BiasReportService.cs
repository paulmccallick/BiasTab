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
        BiasTradeEventResult UpdateTradeRow(BiasTradeEvent tradeEvent);
    }

    public class BiasReportService : IBiasReportService
    {
        private readonly IBiasReportRepository _biasReportRepository;

        public BiasReportService(IBiasReportRepository biasReportRepository)
        {
            _biasReportRepository = biasReportRepository;
        }

        public  BiasTradeEventResult UpdateTradeRow(BiasTradeEvent tradeEvent)
        {
            var biasReport = _biasReportRepository.GetBiasReport(tradeEvent.BiasSessionId);
            var biasRow = biasReport.BiasRows.First(br => br.Ticker == tradeEvent.Ticker);
            biasRow.TradeCount = tradeEvent.TradeAmount;
            biasRow.BenchmarkWeight = tradeEvent.TradeAmount * .02m;
            _biasReportRepository.SaveBiasRow(biasRow);
            var sectorList = biasReport.BiasRows
                .GroupBy(br => br.Sector)
                .Select(g => new Sector { Name = g.Key, Weight = g.Sum(br => br.BenchmarkWeight) });
            return new BiasTradeEventResult { BiasRow = biasRow, Sectors = sectorList.ToList() };

        }

        
    }
}
