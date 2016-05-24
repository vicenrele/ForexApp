using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ForexApp.Controllers
{
    public class HistoricalForexController : Controller
    {
        //
        // GET: /HistoricalForex/

        [Authorize]
        public ActionResult Index()
        {
            return View();
        }

        [Authorize]
        public ActionResult TutorialHistoricalForex()
        {
            return View();
        }

    }
}
