using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ForexApp.Controllers
{
    public class ExchangeRatesController : Controller
    {
        //
        // GET: /ExchangeRates/
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }

        [Authorize]
        public ActionResult TutorialExchangeRates()
        {
            return View();
        }

    }
}
