using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BiasTab.Models
{
    public class BiasReport
    {
        public decimal PortfolioMarketValue { get; set; }
        public IList<BiasRow> BiasRows { get; set; }
        public int BiasSessionId { get; set; }
    }
}
