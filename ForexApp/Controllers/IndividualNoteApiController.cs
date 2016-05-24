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
    public class IndividualNoteApiController : ApiController
    {
        UsersContext db = new UsersContext();

        // GET api/<controller>
        [Authorize]
        public IEnumerable<IndividualNote> GetIndividualNoteApi()
        {
            IEnumerable<IndividualNote> notes = db.IndividualNotes.Where(i => i.UName == User.Identity.Name);

            return notes;
        }

        // POST api/<controller>
        [Authorize]
        public HttpResponseMessage PostIndividualNoteApi([FromBody]IndividualNote note)
        {
            note.UName = User.Identity.Name;

            if (ModelState.IsValid)
            {
                db.IndividualNotes.Add(note);
                db.SaveChanges();

                string messageOK = "Los datos se han registrado correctamente";

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, messageOK);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = note.IndividualNoteID }));
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
        public HttpResponseMessage PutIndividualNoteApi([FromBody]IndividualNote note)
        {
            string message;

            note.UName = User.Identity.Name;

            if (!ModelState.IsValid)
            {
                message = "Se ha producido un error. Por favor, inténtelo de nuevo más tarde";

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, message);
            }

            db.Entry(note).State = EntityState.Modified;

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
        public HttpResponseMessage DeleteIndividualNoteApi([FromBody]int id)
        {
            IndividualNote note = db.IndividualNotes.Find(id);

            string message;

            if (note == null)
            {
                message = "Se ha producido un error. El registro no existe en la base de datos";

                return Request.CreateResponse(HttpStatusCode.NotFound, message);
            }

            db.IndividualNotes.Remove(note);

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