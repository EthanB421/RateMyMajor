using RateMyMajor.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace RateMyMajor.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // VERY important!

            modelBuilder.Entity<ApplicationUser>().HasData(
                new ApplicationUser
                {
                    Id = "1", // Use string IDs for Identity by default (GUID or string)
                    UserName = "ethanbautista",
                    NormalizedUserName = "ETHANBAUTISTA",
                    Email = "fugazy@gmail.com",
                    NormalizedEmail = "FUGAZY@GMAIL.COM",
                    FirstName = "Ethan",
                    LastName = "Bautista",
                    EmailConfirmed = true,
                    PasswordHash = "hashed-password-here", // You must create this properly
                    SecurityStamp = Guid.NewGuid().ToString()
                });

            modelBuilder.Entity<College>().HasData(
                new College { Id = 1, Name = "Computer Science", Description = "Its cooked", Rating = 1 },
                new College { Id = 2, Name = "Neuroscience", Description = "You must be smart", Rating = 1 },
                new College { Id = 3, Name = "Nursing", Description = "Job market is always good", Rating = 1 }
            );

            modelBuilder.Entity<Review>().HasData(
                new Review { Id = 1, UserId="1", Content = "Challenging but rewarding.", Rating = 5, CollegeId = 1 },
                new Review { Id = 2, UserId="1",Content = "A lot of math and theory.", Rating = 4, CollegeId = 1 },
                new Review { Id = 3, UserId="1",Content = "Man this major stinks", Rating = 4, CollegeId = 1 },
                new Review { Id = 4, UserId="1",Content = "Very hands-on and practical.", Rating = 5, CollegeId = 2 },
                new Review { Id = 5, UserId="1",Content = "Brain power!", Rating = 5, CollegeId = 2 },
                new Review { Id = 6, UserId="1",Content = "A lot of butt wiping", Rating = 5, CollegeId = 3 },
                new Review { Id = 7, UserId="1",Content = "THis is really hard", Rating = 2, CollegeId = 3 },
                new Review { Id = 8, UserId="1",Content = "I love nursing", Rating = 5, CollegeId = 3 },
                new Review { Id = 9, UserId="1",Content = "I HATE nursing", Rating = 1, CollegeId = 3 },
                new Review { Id = 10, UserId="1",Content = "I wanna do nursing", Rating = 4, CollegeId = 3 },
                new Review { Id = 11, UserId="1",Content = "Please please please nursing", Rating = 3, CollegeId = 3 }
            );
        }

        public DbSet<College> College { get; set; }
        public DbSet<Review> Review { get; set; }
        public DbSet<Vote> Votes { get; set; }


        // Note: You don't need to explicitly define Users DbSet,
        // it's included in IdentityDbContext<ApplicationUser>
    }
}
