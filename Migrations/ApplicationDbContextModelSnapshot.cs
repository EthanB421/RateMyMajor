﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RateMyMajor.Data;

#nullable disable

namespace RateMyMajor.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("RateMyMajor.Models.Major", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Major");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "Its cooked",
                            Name = "Computer Science",
                            Rating = 1
                        },
                        new
                        {
                            Id = 2,
                            Description = "You must be smart",
                            Name = "Neuroscience",
                            Rating = 1
                        },
                        new
                        {
                            Id = 3,
                            Description = "Job market is always good",
                            Name = "Nursing",
                            Rating = 1
                        });
                });

            modelBuilder.Entity("RateMyMajor.Models.Review", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MajorId")
                        .HasColumnType("int");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("MajorId");

                    b.ToTable("Review");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Content = "Challenging but rewarding.",
                            MajorId = 1,
                            Rating = 5
                        },
                        new
                        {
                            Id = 2,
                            Content = "A lot of math and theory.",
                            MajorId = 1,
                            Rating = 4
                        },
                        new
                        {
                            Id = 3,
                            Content = "Man this major stinks",
                            MajorId = 1,
                            Rating = 4
                        },
                        new
                        {
                            Id = 4,
                            Content = "Very hands-on and practical.",
                            MajorId = 2,
                            Rating = 5
                        },
                        new
                        {
                            Id = 5,
                            Content = "Brain power!",
                            MajorId = 2,
                            Rating = 5
                        },
                        new
                        {
                            Id = 6,
                            Content = "A lot of butt wiping",
                            MajorId = 3,
                            Rating = 5
                        },
                        new
                        {
                            Id = 7,
                            Content = "THis is really hard",
                            MajorId = 3,
                            Rating = 2
                        },
                        new
                        {
                            Id = 8,
                            Content = "I love nursing",
                            MajorId = 3,
                            Rating = 5
                        });
                });

            modelBuilder.Entity("RateMyMajor.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LasttName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            FirstName = "Ethan",
                            LasttName = "Bautista",
                            email = "fugazy@gmail.com"
                        });
                });

            modelBuilder.Entity("RateMyMajor.Models.Review", b =>
                {
                    b.HasOne("RateMyMajor.Models.Major", "Major")
                        .WithMany()
                        .HasForeignKey("MajorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Major");
                });
#pragma warning restore 612, 618
        }
    }
}
