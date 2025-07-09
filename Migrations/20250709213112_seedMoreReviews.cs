using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RateMyMajor.Migrations
{
    /// <inheritdoc />
    public partial class seedMoreReviews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "cf501cc8-2699-4370-a511-9679eb63098e", "0eef4fd3-3f23-4f40-b0e6-c4cd67454391" });

            migrationBuilder.InsertData(
                table: "Review",
                columns: new[] { "Id", "Content", "MajorId", "Rating" },
                values: new object[,]
                {
                    { 9, "I hate nursing", 3, 1 },
                    { 10, "It's okay!", 3, 3 },
                    { 11, "I wish I never did this", 3, 0 },
                    { 12, "This is the best job!", 3, 5 },
                    { 13, "It pays the bills well!", 3, 4 },
                    { 14, "I want to do computer science", 3, 2 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Review",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Review",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Review",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Review",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Review",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Review",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "ed2a5da4-6726-410c-b9fa-d215dfb20c4c", "3522f5fe-dc80-4c67-8d85-52a2fdd9f6af" });
        }
    }
}
