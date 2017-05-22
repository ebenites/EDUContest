using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EDUContest.Controllers
{
    public class IntiController : Controller
    {
        // GET: Inti
        public ActionResult Index()
        {

            ViewBag.condiciones = new SelectList(new List<SelectListItem>{
                new SelectListItem { Value = "001", Text = "Nombrado" },
                new SelectListItem { Value = "002", Text = "Contratado" },
            }, "Value", "Text");

            return View();
        }
    }
}