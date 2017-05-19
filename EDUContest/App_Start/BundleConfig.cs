using System.Web;
using System.Web.Optimization;

namespace EDUContest
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/jquery-plugins").Include(
                        "~/Scripts/jquery.form.min.js",
                        "~/Scripts/spin.min.js",
                        "~/Scripts/jquery.spin.js"));

            bundles.Add(new ScriptBundle("~/bundles/ckeditor").Include(
                        "~/Scripts/ckeditor/ckeditor.js",
                        "~/Scripts/ckeditor/config.js"));

            bundles.Add(new ScriptBundle("~/bundles/ckeditor-plugins").Include(
                        "~/Scripts/ckeditor/adapters/jquery.js",
                        "~/Scripts/ckeditor/plugins/videodetector/plugin.js",
                        "~/Scripts/ckeditor/plugins/sketch/plugin.js"));

            bundles.Add(new StyleBundle("~/Content/ckeditor-css").Include(
                      "~/Scripts/ckeditor/plugins/videodetector/videodetector.css"));

            // Utilice la versión de desarrollo de Modernizr para desarrollar y obtener información. De este modo, estará
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/moment-with-locales.min.js",
                      "~/Scripts/bootstrap.min.js",
                      "~/Scripts/bootbox.min.js",
                      "~/Scripts/bootstrap-datepicker.min.js",
                      "~/Scripts/bootstrap-datepicker-locales/bootstrap-datepicker.es.min.js",
                      "~/Scripts/bootstrap-switch.min.js",
                      "~/Scripts/respond.min.js"));

            bundles.Add(new StyleBundle("~/Content/bootstrap").Include(
                      "~/Content/font-awesome.min.css",
                      "~/Content/bootstrap.min.css"));

            bundles.Add(new StyleBundle("~/Content/bootstrap-theme").Include(
                      "~/Content/bootstrap-flatly.min.css"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap-datepicker3.min.css",
                      "~/Content/bootstrap-switch.min.css",
                      "~/Content/site.css"));
        }
    }
}
