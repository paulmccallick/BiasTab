using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using CassiniDev;

namespace BiasTab.Web.Test
{
    public class JavaScriptHandle
    {
        public async Task<object> ControlWebServer(object operation)
        {
            var op = operation.ToString();
            if (op == "start")
            {
               CassiniController.StartServer();
                
            }
            if (op == "stop")
            {
                CassiniController.StopServer();
            }
            return null;
        }
    }

    public static class CassiniController
    {
        private static CassiniDevWrapper _server;
        public static void StartServer()
        {
            Console.WriteLine("Starting web server");

            _server = new CassiniDevWrapper();
            Console.WriteLine(System.IO.File.Exists(@"C:\git\LatencyTest\BiasTab.Web\web.config"));
            const string applicationPath = @"C:\git\LatencyTest\BiasTab.Web";
            _server.StartServer(applicationPath);
            Console.WriteLine("You can reach the server at " + _server.NormalizeUrl("/"));
            while (true)
            {
                Thread.Sleep(100);
            }
        }

        public static void StopServer()
        {
            _server.StopServer();
        }


    }

    public class CassiniDevWrapper : CassiniDevServer,IDisposable
    {
        public void Dispose()
        {
            Console.WriteLine("Dev Server Disposing");
        }
    }



}
