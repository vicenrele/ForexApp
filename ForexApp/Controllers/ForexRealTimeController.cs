using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ForexApp.Controllers
{
    public class ForexRealTimeController : Controller
    {
        //
        // GET: /ForexRealTime/

        [Authorize]
        public ActionResult Index()
        {
            return View();
        }

        [Authorize]
        public ActionResult TutorialCambioCruzado()
        {
            return View();
        }

    }
}
