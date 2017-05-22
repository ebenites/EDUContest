using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EDUContest.Controllers
{
    public class TukuyController : Controller
    {

        public ActionResult Index()
        {
            if (Request.HttpMethod == "POST")
            {

                TempData["Success"] = "El proceso de registro ha finalizado.";

                return RedirectToAction("Confirmar");
            }

            ViewBag.condiciones = new SelectList(new List<SelectListItem>{
                new SelectListItem { Value = "001", Text = "Nombrado" },
                new SelectListItem { Value = "002", Text = "Contratado" },
            }, "Value", "Text");

            return View();
        }
        
        public ActionResult Confirmar()
        {
            return View();
        }

    }
}