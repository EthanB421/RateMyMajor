using RateMyMajor.Models;
using Microsoft.EntityFrameworkCore;

namespace RateMyMajor.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasData(
                new User{Id=1, FirstName = "Ethan",LasttName="Bautista", email="fugazy@gmail.com"}
            );
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Major>().HasData(
                new Major{Id=1, Name="Computer Science",Description="Its cooked", Rating=1},
                new Major{Id=2, Name="Neuroscience",Description="You must be smart", Rating=1},
                new Major{Id=3, Name="Nursing",Description="Job market is always good", Rating=1}
            );
        }

        public DbSet<User> Users {get;set;}
        public DbSet<Major> Major {get; set;}
    }
} 