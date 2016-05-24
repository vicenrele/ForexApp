namespace ForexApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.UserProfile",
                c => new
                    {
                        UserId = c.Int(nullable: false, identity: true),
                        UserName = c.String(),
                    })
                .PrimaryKey(t => t.UserId);
            
            CreateTable(
                "dbo.IndividualNotes",
                c => new
                    {
                        IndividualNoteID = c.Int(nullable: false, identity: true),
                        NoteTitle = c.String(nullable: false, maxLength: 20),
                        Note = c.String(),
                        UName = c.String(),
                    })
                .PrimaryKey(t => t.IndividualNoteID);
            
            CreateTable(
                "dbo.RatesNotes",
                c => new
                    {
                        RatesNoteID = c.Int(nullable: false, identity: true),
                        NoteTitleRate = c.String(nullable: false, maxLength: 20),
                        NoteRate = c.String(),
                        Rate = c.String(),
                        Bid = c.String(),
                        Ask = c.String(),
                        Spread = c.String(),
                        Hour = c.String(),
                        UName = c.String(),
                    })
                .PrimaryKey(t => t.RatesNoteID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.RatesNotes");
            DropTable("dbo.IndividualNotes");
            DropTable("dbo.UserProfile");
        }
    }
}
