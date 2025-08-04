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
            
                new College { Id = 1,  Name = "University of California, Los Angeles (UCLA)",           Description = "Flagship UC campus in Los Angeles",                  Rating = 5.0, FederalSchoolCode = "001315" },
                new College { Id = 2,  Name = "University of California, San Diego (UCSD)",            Description = "Public UC in La Jolla (R1 research)",                 Rating = 5.0, FederalSchoolCode = "001317" },
                new College { Id = 3,  Name = "University of California, Irvine (UCI)",               Description = "Public UC in Orange County",                         Rating = 5.0, FederalSchoolCode = "001314" },
                new College { Id = 4,  Name = "University of California, Santa Barbara (UCSB)",       Description = "Coastal UC campus",                                   Rating = 4.5, FederalSchoolCode = "001320" },
                new College { Id = 5,  Name = "University of California, Riverside (UCR)",           Description = "Inland Empire UC campus",                             Rating = 4.0, FederalSchoolCode = "001316" },
                new College { Id = 6,  Name = "University of California, San Francisco (UCSF)",       Description = "Graduate‑only UC campus in health sciences",          Rating = 4.5, FederalSchoolCode = "001319" },
                new College { Id = 7,  Name = "San Diego State University (SDSU)",                  Description = "Major public research university in San Diego",       Rating = 4.5, FederalSchoolCode = "001151" },
                new College { Id = 8,  Name = "California State University, Long Beach (CSULB)",       Description = "CSU public campus in Long Beach",                      Rating = 4.5, FederalSchoolCode = "001139" },
                new College { Id = 9,  Name = "California State University, Fullerton (CSUF)",         Description = "Large CSU in Orange County",                          Rating = 4.0, FederalSchoolCode = "001137" },
                new College { Id = 10, Name = "California State University, Los Angeles (CSULA)",       Description = "Urban CSU campus in Los Angeles",                     Rating = 4.0, FederalSchoolCode = "001140" },
                new College { Id = 11, Name = "California State Polytechnic University, Pomona",       Description = "Polytechnic CSU in Pomona",                           Rating = 4.5, FederalSchoolCode = "001144" },
                new College { Id = 12, Name = "California State University, Northridge (CSUN)",         Description = "CSU campus in the San Fernando Valley",               Rating = 4.0, FederalSchoolCode = "001153" },
                new College { Id = 13, Name = "California State University, San Bernardino (CSUSB)",  Description = "CSU campus in Inland Empire",                          Rating = 4.0, FederalSchoolCode = "001142" }
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
