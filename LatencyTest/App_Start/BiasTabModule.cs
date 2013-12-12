using BiasTab.Persistence;
using BiasTab.Services;
using BiasTab.Web.Api;
using Ninject.Modules;

namespace BiasTab.Web.App_Start
{
    public class BiasTabModule : NinjectModule
    {
        public override void Load()
        {
            Kernel.Bind<IBiasReportRepository>().To<BiasReportRepository>();
            Kernel.Bind<IBiasReportService>().To<BiasReportService>();

        }
    }
}