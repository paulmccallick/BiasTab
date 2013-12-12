﻿using System.Threading;
using System.Web.Mvc;
using BiasTab.Persistence;

namespace BiasTab.Web.Controllers
{
    public class BiasController : Controller
    {
        public BiasController()
        {
            
        }
        //
        // GET: /Bias/

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Trade(int tradeValue)
        {
            Thread.Sleep(100);
            return Json(tradeValue * 500, JsonRequestBehavior.AllowGet);
        }

    }
}
