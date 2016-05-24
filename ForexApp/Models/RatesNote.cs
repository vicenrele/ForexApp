using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ForexApp.Models
{
    public class RatesNote
    {
        public int RatesNoteID { get; set; }

        [Required]
        [StringLength(20)]
        [DisplayName("Título")]
        public string NoteTitleRate { get; set; }

        [DataType(DataType.MultilineText)]
        [DisplayName("Nota")]
        public string NoteRate { get; set; }

        [DisplayName("Divisa")]
        public string Rate { get; set; }

        public string Bid { get; set; }

        public string Ask { get; set; }

        public string Spread { get; set; }

        [DisplayName("Hora")]
        public string Hour { get; set; }

        //Relación N:1
        public string UName { get; set; }

    }
}