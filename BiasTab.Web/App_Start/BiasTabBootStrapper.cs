using Ninject;

namespace BiasTab.Web.App_Start
{
    public class BiasTabBootStrapper
    {
        public static void Configure(IKernel kernel)
        {
            kernel.Load(
                new BiasTabModule());
        }

    }
}