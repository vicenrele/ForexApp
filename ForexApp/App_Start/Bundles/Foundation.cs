using System.Web.Optimization;

namespace ForexApp
{
    public static class Foundation
    {
        public static Bundle Styles()
        {
            return new StyleBundle("~/Content/foundation/css").Include(
                       "~/Content/foundation/foundation.css",
                       "~/Content/foundation/foundation.mvc.css",
                       "~/Content/foundation/normalize.css",
                       "~/Content/foundation/animate.css",
                       "~/Content/grids.css");
        }

        public static Bundle Scripts()
        {
            return new ScriptBundle("~/bundles/foundation").Include(
                      "~/Scripts/vendors/foundation/fastclick.js",
                      "~/Scripts/vendors/jquery.cookie.js",
                      "~/Scripts/vendors/foundation/foundation.js",
                      "~/Scripts/vendors/foundation/foundation.tooltip.js",
                      "~/Scripts/vendors/foundation/foundation.*",
                      "~/Scripts/vendors/foundation/app.js");
        }
    }
}