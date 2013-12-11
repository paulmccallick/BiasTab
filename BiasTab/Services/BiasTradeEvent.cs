using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BiasTab.Services
{
    public class BiasTradeEvent
    {
        public int BiasSessionId { get; set; }
        public int TradeAmount { get; set; }
        public string Ticker { get; set; }
    }
}
