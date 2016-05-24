using ForexApp.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ForexApp.Controllers
{
    public class RatesNoteApiController : ApiController
    {
        UsersContext db = new UsersContext();

        // GET api/<controller>
        [Authorize]
        public IEnumerable<RatesNote> GetRatesNoteApi()
        {
            IEnumerable<RatesNote> rates = db.RatesNotes.Where(i => i.UName == User.Identity.Name);

            return rates;
        }

        // POST api/<controller>
        [Authorize]
        public HttpResponseMessage PostRatesNoteApi([FromBody]RatesNote rate)
        {
            rate.UName = User.Identity.Name;

            if (ModelState.IsValid)
            {
                db.RatesNotes.Add(rate);
                db.SaveChanges();

                string messageOK = "Los datos se han registrado correctamente";

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, messageOK);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = rate.RatesNoteID }));
                return response;
            }
            else
            {
                string messageERROR = "Se ha producido un error. Por favor, inténtelo de nuevo más tarde";

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, messageERROR);
            }
        }

        // PUT api/<controller>
        [Authorize]
        public HttpResponseMessage PutRatesNoteApi([FromBody]RatesNote rate)
        {
            string message;

            rate.UName = User.Identity.Name;

            if (!ModelState.IsValid)
            {
                message = "Se ha producido un error. Por favor, inténtelo de nuevo más tarde";

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, message);
            }

            db.Entry(rate).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            message = "Los datos se han registrado correctamente";

            return Request.CreateResponse(HttpStatusCode.OK, message);

        }

        // DELETE api/<controller>/5
        [Authorize]
        public HttpResponseMessage DeleteRatesNoteApi([FromBody]int id)
        {
            RatesNote rate = db.RatesNotes.Find(id);

            string message;

            if (rate == null)
            {
                message = "Se ha producido un error. El registro no existe en la base de datos";

                return Request.CreateResponse(HttpStatusCode.NotFound, message);
            }

            db.RatesNotes.Remove(rate);

            try
            {
                db.SaveChanges();

                message = "El registro se ha eliminado correntamente";
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, message);
        }



        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}