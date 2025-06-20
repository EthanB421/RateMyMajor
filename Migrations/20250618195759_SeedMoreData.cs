using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RateMyMajor.Migrations
{
    /// <inheritdoc />
    public partial class SeedMoreData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Major",
                columns: new[] { "Id", "Description", "Name", "Rating" },
                values: new object[,]
                {
                    { 2, "You must be smart", "Neuroscience", 1 },
                    { 3, "Job market is always good", "Nursing", 1 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Major",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Major",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
