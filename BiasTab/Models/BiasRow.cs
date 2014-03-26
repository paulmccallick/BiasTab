using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BiasTab.Models
{
    public class BiasRow
    {
        public string Ticker { get; set; }
        public decimal BenchmarkWeight { get; set; }
        public int TradeCount { get; set; }
        public int BiasSessionId { get; set; }
        public string Sector { get; set; }
    }
}
