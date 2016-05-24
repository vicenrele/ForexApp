namespace ForexApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Exchanges",
                c => new
                    {
                        ExchangeID = c.Int(nullable: false, identity: true),
                        NumberToConvert = c.String(),
                        Rate1 = c.String(),
                        Rate2 = c.String(),
                        Result = c.String(),
                        Fecha = c.String(),
                        UName = c.String(),
                    })
                .PrimaryKey(t => t.ExchangeID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Exchanges");
        }
    }
}
