using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ForexApp.Models
{
    public class IndividualNote
    {
        public int IndividualNoteID { get; set; }

        [Required]
        [StringLength(20)]
        [DisplayName("Título")]
        public string NoteTitle { get; set; }

        [DataType(DataType.MultilineText)]
        [DisplayName("Nota")]
        public string Note { get; set; }

        //Relación N:1
        public string UName { get; set; }
    }
}