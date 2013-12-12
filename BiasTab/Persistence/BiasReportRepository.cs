using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BiasTab.Models;
using Couchbase;

namespace BiasTab.Persistence
{
    
    public interface IBiasReportRepository
    {
        BiasRow GetBiasRow(int biasReportSessionId, string ticker);
        void SaveBiasRow(BiasRow biasRow);
        BiasReport GetBiasReport(int biasReportSessionId);
    }

    public class BiasReportRepository:IBiasReportRepository
    {

        private static List<BiasReport> _biasReports = GenerateTestData();

        private static List<BiasReport> GenerateTestData()
        {
            var biasReports = new List<BiasReport>();
            var biasReport = new BiasReport {BiasSessionId = 1};
            biasReport.BiasRows.Add(new BiasRow{BiasSessionId = 1,BenchmarkWeight = .2m,Ticker = "A"});
            biasReport.BiasRows.Add(new BiasRow{BiasSessionId = 1,BenchmarkWeight = .3m,Ticker = "B"});
            biasReport.BiasRows.Add(new BiasRow{BiasSessionId = 1,BenchmarkWeight = .3m,Ticker = "C"});
            biasReports.Add(biasReport);
            return biasReports;
        }

        public BiasRow GetBiasRow(int biasReportSessionId, string ticker)
        {
            var biasReport = _biasReports.First(bs => bs.BiasSessionId == biasReportSessionId);
            return biasReport.BiasRows.First(br => br.Ticker == ticker);
        }

        public void SaveBiasRow(BiasRow biasRow)
        {
            //not needed as everything is in memory.
        }

        public BiasReport GetBiasReport(int biasReportSessionId)
        {
            return _biasReports.First(bs => bs.BiasSessionId == biasReportSessionId);
        }
    }
}
