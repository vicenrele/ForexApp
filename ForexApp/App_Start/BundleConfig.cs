using System.Web;
using System.Web.Optimization;

namespace ForexApp
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //Vendors
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/vendors/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/vendors/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryvalunobtrusive").Include(
                        "~/Scripts/vendors/jquery.validate.unobtrusive.*"));

            bundles.Add(new ScriptBundle("~/bundles/money").Include(
                        "~/Scripts/vendors/money.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/vendors/modernizr-*"));


            //My Javascript files
            bundles.Add(new ScriptBundle("~/bundles/grids").Include(
                        "~/Scripts/vendors/grid*"));

            bundles.Add(new ScriptBundle("~/bundles/forex").Include(
                        "~/Scripts/forex.js"));

            bundles.Add(new ScriptBundle("~/bundles/mainRealTime").Include(
                        "~/Scripts/mainRealTime.js"));

            bundles.Add(new ScriptBundle("~/bundles/manageNotes").Include(
                        "~/Scripts/manageNotes.js"));

            bundles.Add(new ScriptBundle("~/bundles/setNotes").Include(
                        "~/Scripts/setNotes.js"));

            bundles.Add(new ScriptBundle("~/bundles/setRates").Include(
                        "~/Scripts/setRates.js"));

            bundles.Add(new ScriptBundle("~/bundles/getDelUpdtNotes").Include(
                        "~/Scripts/getDelUpdtNotes.js"));

            bundles.Add(new ScriptBundle("~/bundles/getDelUpdtRates").Include(
                        "~/Scripts/getDelUpdtRates.js"));

            bundles.Add(new ScriptBundle("~/bundles/getDelUpdtExchanges").Include(
                        "~/Scripts/getDelUpdtExchanges.js"));

            bundles.Add(new ScriptBundle("~/bundles/mainHistoricalRates").Include(
                        "~/Scripts/mainHistoricalRates.js"));

            bundles.Add(new ScriptBundle("~/bundles/useForexCharts").Include(
                        "~/Scripts/useForexCharts.js"));

            bundles.Add(new ScriptBundle("~/bundles/exchange").Include(
                        "~/Scripts/mainExchange.js"));
            #region Foundation Bundles

            bundles.Add(Foundation.Styles());

            bundles.Add(Foundation.Scripts());

            #endregion
        }
    }
}