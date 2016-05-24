using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ForexApp.Models
{
    public class Exchange
    {
        public int ExchangeID { get; set; }

        public string NumberToConvert { get; set; }

        public string Rate1 { get; set; }

        public string Rate2 { get; set; }

        public string Result { get; set; }

        public string Fecha { get; set; }

        //Relación N:1
        public string UName { get; set; }

    }
}