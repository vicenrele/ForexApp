using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ForexApp.Controllers
{
    public class TutorialController : Controller
    {
        //
        // GET: /Tutorial/
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }

        [Authorize]
        public ActionResult TutCambioCruzado()
        {
            return RedirectToAction("TutorialCambioCruzado", "ForexRealTime");
        }

        [Authorize]
        public ActionResult TutHistoricalForex()
        {
            return RedirectToAction("TutorialHistoricalForex", "HistoricalForex");
        }

        [Authorize]
        public ActionResult TutExchangeRates()
        {
            return RedirectToAction("TutorialExchangeRates", "ExchangeRates");
        }

    }
}
