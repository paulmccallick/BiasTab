using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using CassiniDev;
using NUnit.Framework;

namespace BiasTab.Web.Test
{
    [TestFixture]
    class CassiniDevIntegrationTest: CassiniDevServer
    {
        [Test]
        public void RunTheWebServer()
        {
            throw new Exception("asdf");
            const string applicationPath = @"..\..\..\BiasTab.Web";
            StartServer(applicationPath);
            Console.WriteLine(NormalizeUrl("/"));
            while(true)
                Thread.Sleep(100);
            
        }

        public async Task<object> Edgy(object input)
        {
            Console.WriteLine("from inside .net");
            return "a value from .net";
        }
    }
}
