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
    public class ExchangeApiController : ApiController
    {
        UsersContext db = new UsersContext();


        // GET api/<controller>
        [Authorize]
        public IEnumerable<Exchange> GetExchangeApi()
        {
            IEnumerable<Exchange> exchanges = db.Exchanges.Where(i => i.UName == User.Identity.Name);

            return exchanges;
        }

        // POST api/<controller>
        [Authorize]
        public HttpResponseMessage PostExchangeApi([FromBody]Exchange exchange)
        {
            exchange.UName = User.Identity.Name;

            if (ModelState.IsValid)
            {
                db.Exchanges.Add(exchange);
                db.SaveChanges();

                string messageOK = "Los datos se han registrado correctamente";

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, messageOK);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = exchange.ExchangeID }));
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
        public HttpResponseMessage PutExchangeApi([FromBody]Exchange exchange)
        {
            string message;

            exchange.UName = User.Identity.Name;

            if (!ModelState.IsValid)
            {
                message = "Se ha producido un error. Por favor, inténtelo de nuevo más tarde";

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, message);
            }

            db.Entry(exchange).State = EntityState.Modified;

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
        public HttpResponseMessage DeleteExchangeApi([FromBody]int id)
        {
            Exchange exchange = db.Exchanges.Find(id);

            string message;

            if (exchange == null)
            {
                message = "Se ha producido un error. El registro no existe en la base de datos";

                return Request.CreateResponse(HttpStatusCode.NotFound, message);
            }

            db.Exchanges.Remove(exchange);

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

    }
}