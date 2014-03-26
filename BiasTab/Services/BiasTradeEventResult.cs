using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BiasTab.Models;

namespace BiasTab.Services
{
    public class BiasTradeEventResult
    {
        public BiasRow BiasRow { get; set; }
        public List<Sector> Sectors { get; set; }
    }
}
