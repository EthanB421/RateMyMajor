using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RateMyMajor.Migrations
{
    /// <inheritdoc />
    public partial class SeedReviews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Review",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    MajorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Review", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Review_Major_MajorId",
                        column: x => x.MajorId,
                        principalTable: "Major",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Review",
                columns: new[] { "Id", "Content", "MajorId", "Rating" },
                values: new object[,]
                {
                    { 1, "Challenging but rewarding.", 1, 5 },
                    { 2, "A lot of math and theory.", 1, 4 },
                    { 3, "Man this major stinks", 1, 4 },
                    { 4, "Very hands-on and practical.", 2, 5 },
                    { 5, "Brain power!", 2, 5 },
                    { 6, "A lot of butt wiping", 3, 5 },
                    { 7, "THis is really hard", 3, 2 },
                    { 8, "I love nursing", 3, 5 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Review_MajorId",
                table: "Review",
                column: "MajorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Review");
        }
    }
}
