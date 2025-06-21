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
                new User { Id = 1, FirstName = "Ethan", LasttName = "Bautista", email = "fugazy@gmail.com" }
            );
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Major>().HasData(
                new Major { Id = 1, Name = "Computer Science", Description = "Its cooked", Rating = 1 },
                new Major { Id = 2, Name = "Neuroscience", Description = "You must be smart", Rating = 1 },
                new Major { Id = 3, Name = "Nursing", Description = "Job market is always good", Rating = 1 }
            );
            
            modelBuilder.Entity<Review>().HasData(
                new Review { Id = 1, Content = "Challenging but rewarding.", Rating = 5, MajorId = 1 },
                new Review { Id = 2, Content = "A lot of math and theory.", Rating = 4, MajorId = 1 },
                new Review { Id = 3, Content = "Man this major stinks", Rating = 4, MajorId = 1 },
                new Review { Id = 4, Content = "Very hands-on and practical.", Rating = 5, MajorId = 2 },
                new Review { Id = 5, Content = "Brain power!", Rating = 5, MajorId = 2 },
                new Review { Id = 6, Content = "A lot of butt wiping", Rating = 5, MajorId = 3 },
                new Review { Id = 7, Content = "THis is really hard", Rating = 2, MajorId = 3 },
                new Review { Id = 8, Content = "I love nursing", Rating = 5, MajorId = 3}
            );
        }

        public DbSet<User> Users {get;set;}
        public DbSet<Major> Major {get; set;}
        public DbSet<Review> Review {get; set;}
    }
} 