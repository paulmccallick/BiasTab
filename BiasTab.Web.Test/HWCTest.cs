using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;

namespace BiasTab.Web.Test
{
    [TestFixture]
    public class HWCTest
    {
        [Test]
        public void StartTheServer()
        {
            var server = new WebServer("x", 324, 234);
            server.Start();
        }
    }
}
