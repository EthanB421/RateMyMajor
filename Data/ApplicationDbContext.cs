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
            new College { Id = 1, Name = "Stanford University", Description = "Prestigious private research university in Northern CA", Rating = 5 },
            new College { Id = 2, Name = "University of California - Los Angeles", Description = "Top public university in LA", Rating = 5 },
            new College { Id = 3, Name = "University of Southern California", Description = "Leading private research university in LA", Rating = 5 },
            new College { Id = 4, Name = "University of California - San Diego", Description = "Top UC campus in San Diego", Rating = 5 },
            new College { Id = 5, Name = "University of California - Irvine", Description = "Highly ranked UC in Orange County", Rating = 4 },
            new College { Id = 6, Name = "University of California - Santa Barbara", Description = "Strong UC campus on the coast", Rating = 4 },
            new College { Id = 7, Name = "California Institute of Technology", Description = "Elite engineering science school in Pasadena", Rating = 5 },
            new College { Id = 8, Name = "University of California - Riverside", Description = "UC campus in Inland Empire", Rating = 4 },
            new College { Id = 9, Name = "California State University - Long Beach", Description = "Large CSU campus in Long Beach", Rating = 3 },
            new College { Id = 10, Name = "University of San Diego", Description = "Private university near San Diego", Rating = 4 },
            new College { Id = 11, Name = "San Diego State University", Description = "R1 public research university in San Diego", Rating = 4 },
            new College { Id = 12, Name = "Pepperdine University", Description = "Private Christian university in Malibu", Rating = 4 },
            new College { Id = 13, Name = "Loyola Marymount University", Description = "Private university in Los Angeles", Rating = 4 },
            new College { Id = 14, Name = "Occidental College", Description = "Liberal arts college in Los Angeles", Rating = 3 },
            new College { Id = 15, Name = "Pitzer College", Description = "Selective liberal arts college in Claremont", Rating = 4 },
            new College { Id = 16, Name = "Claremont McKenna College", Description = "Highly ranked private college in Claremont", Rating = 5 },
            new College { Id = 17, Name = "Pomona College", Description = "Top liberal arts college in Claremont", Rating = 5 },
            new College { Id = 18, Name = "Harvey Mudd College", Description = "STEM-focused liberal arts college in Claremont", Rating = 5 },
            new College { Id = 19, Name = "University of California - San Marcos", Description = "CSU campus in North County San Diego", Rating = 3 },
            new College { Id = 20, Name = "Soka University of America", Description = "Small private university in Aliso Viejo", Rating = 3 },
            new College { Id = 21, Name = "California State University - Fullerton", Description = "Large CSU known for business and teaching", Rating = 3 },
            new College { Id = 22, Name = "California State Polytechnic University - Pomona", Description = "Polytechnic CSU with STEM focus", Rating = 4 },
            new College { Id = 23, Name = "Chapman University", Description = "Private university in Orange with strong film and business programs", Rating = 4 },
            new College { Id = 24, Name = "California Lutheran University", Description = "Private liberal arts university in Thousand Oaks", Rating = 3 },
            new College { Id = 25, Name = "University of Redlands", Description = "Private liberal arts university in Inland Empire", Rating = 3 },
            new College { Id = 26, Name = "Biola University", Description = "Christian university in La Mirada", Rating = 3 },
            new College { Id = 27, Name = "Whittier College", Description = "Liberal arts college in Whittier", Rating = 3 },
            new College { Id = 28, Name = "Azusa Pacific University", Description = "Private Christian university in Azusa", Rating = 3 },
            new College { Id = 29, Name = "California State University - Northridge", Description = "CSU with strong programs in media and education", Rating = 3 },
            new College { Id = 30, Name = "California State University - San Bernardino", Description = "CSU serving the Inland Empire region", Rating = 3 },
            new College { Id = 31, Name = "Mount Saint Mary's University", Description = "Women's college in Los Angeles", Rating = 3 },
            new College { Id = 32, Name = "Point Loma Nazarene University", Description = "Christian liberal arts college with ocean views", Rating = 4 },
            new College { Id = 33, Name = "National University", Description = "Private nonprofit university catering to adult learners", Rating = 2 },
            new College { Id = 34, Name = "Westmont College", Description = "Christian liberal arts college in Santa Barbara", Rating = 3 },
            new College { Id = 35, Name = "California Baptist University", Description = "Private Christian university in Riverside", Rating = 3 },
            new College { Id = 36, Name = "Vanguard University of Southern California", Description = "Private Christian college in Costa Mesa", Rating = 3 },
            new College { Id = 37, Name = "La Sierra University", Description = "Private Seventh-day Adventist university in Riverside", Rating = 2 },
            new College { Id = 38, Name = "ArtCenter College of Design", Description = "Renowned design and art school in Pasadena", Rating = 4 },
            new College { Id = 39, Name = "Otis College of Art and Design", Description = "Private art school in Los Angeles", Rating = 3 },
            new College { Id = 40, Name = "The Master's University", Description = "Christian liberal arts university in Santa Clarita", Rating = 2 },
            new College { Id = 41, Name = "California State University - Los Angeles", Description = "Public university with strong ties to LA industries", Rating = 3 },
            new College { Id = 42, Name = "California State University - Channel Islands", Description = "Newest CSU campus with growing reputation", Rating = 3 },
            new College { Id = 43, Name = "Santa Monica College", Description = "Top transfer community college near Los Angeles", Rating = 3 },
            new College { Id = 44, Name = "Pasadena City College", Description = "Highly regarded community college in the SGV", Rating = 3 },
            new College { Id = 45, Name = "Cypress College", Description = "Community college in Orange County with strong nursing programs", Rating = 2 },
            new College { Id = 46, Name = "Moorpark College", Description = "Community college with a focus on STEM and transfer programs", Rating = 3 },
            new College { Id = 47, Name = "El Camino College", Description = "Large community college serving South Bay area", Rating = 2 },
            new College { Id = 48, Name = "Glendale Community College", Description = "Community college in northeast LA County", Rating = 3 },
            new College { Id = 49, Name = "Irvine Valley College", Description = "OC community college with high transfer rates", Rating = 3 },
            new College { Id = 50, Name = "Los Angeles City College", Description = "Historic urban community college in LA", Rating = 2 },
            new College { Id = 51, Name = "Fullerton College", Description = "One of the oldest community colleges in California", Rating = 3 },
            new College { Id = 52, Name = "Orange Coast College", Description = "Top-rated community college in Costa Mesa", Rating = 3 },
            new College { Id = 53, Name = "Saddleback College", Description = "Strong community college in south Orange County", Rating = 3 },
            new College { Id = 54, Name = "Golden West College", Description = "Community college in Huntington Beach", Rating = 2 },
            new College { Id = 55, Name = "Rio Hondo College", Description = "Whittier-based college with strong public safety programs", Rating = 2 },
            new College { Id = 56, Name = "Chaffey College", Description = "Well-established community college in Rancho Cucamonga", Rating = 2 },
            new College { Id = 57, Name = "San Bernardino Valley College", Description = "Community college in the Inland Empire", Rating = 2 },
            new College { Id = 58, Name = "Mt. San Antonio College", Description = "Top transfer community college in Walnut", Rating = 3 },
            new College { Id = 59, Name = "East Los Angeles College", Description = "One of the largest community colleges in California", Rating = 2 },
            new College { Id = 60, Name = "College of the Desert", Description = "Community college serving Palm Desert and Coachella Valley", Rating = 2 },
            new College { Id = 61, Name = "Crafton Hills College", Description = "Community college in Yucaipa focused on health and safety programs", Rating = 2 },
            new College { Id = 62, Name = "Antelope Valley College", Description = "Community college in Lancaster with strong career tech programs", Rating = 2 },
            new College { Id = 63, Name = "Barstow Community College", Description = "Small community college serving high desert area", Rating = 1 },
            new College { Id = 64, Name = "Palo Verde College", Description = "Remote community college in Blythe serving the Colorado River region", Rating = 1 },
            new College { Id = 65, Name = "Victor Valley College", Description = "Community college in Victorville focused on local workforce needs", Rating = 2 },
            new College { Id = 66, Name = "Norco College", Description = "Growing community college in the Inland Empire", Rating = 2 },
            new College { Id = 67, Name = "Moreno Valley College", Description = "Community college with health and STEM emphasis", Rating = 2 },
            new College { Id = 68, Name = "Imperial Valley College", Description = "Community college serving Imperial County", Rating = 2 },
            new College { Id = 69, Name = "Allan Hancock College", Description = "Community college in Santa Maria, just north of SoCal border", Rating = 2 },
            new College { Id = 70, Name = "Mt. San Jacinto College", Description = "Multi-campus community college in Riverside County", Rating = 2 },
            new College { Id = 71, Name = "College of the Canyons", Description = "Santa Clarita-based community college with strong arts and media programs", Rating = 3 },
            new College { Id = 72, Name = "Los Angeles Mission College", Description = "Community college in the San Fernando Valley", Rating = 2 },
            new College { Id = 73, Name = "Los Angeles Valley College", Description = "Valley-based community college with transfer opportunities", Rating = 2 },
            new College { Id = 74, Name = "Los Angeles Harbor College", Description = "Serving the South Bay and port areas of LA", Rating = 2 },
            new College { Id = 75, Name = "Los Angeles Southwest College", Description = "Community college near Inglewood with cultural programs", Rating = 2 },
            new College { Id = 76, Name = "Los Angeles Trade-Technical College", Description = "Career-focused community college in downtown LA", Rating = 2 },
            new College { Id = 77, Name = "Compton College", Description = "Independent college formerly partnered with El Camino", Rating = 1 },
            new College { Id = 78, Name = "West Los Angeles College", Description = "Community college near Culver City with growing programs", Rating = 2 },
            new College { Id = 79, Name = "LA Pierce College", Description = "Woodland Hills-based college with agriculture programs", Rating = 2 },
            new College { Id = 80, Name = "LA Occidental College", Description = "Private liberal arts college with historic campus", Rating = 4 },
            new College { Id = 81, Name = "University of La Verne", Description = "Private university with strong adult education and business programs", Rating = 3 },
            new College { Id = 82, Name = "Azusa Pacific University", Description = "Christian university in the San Gabriel Valley", Rating = 3 },
            new College { Id = 83, Name = "California Baptist University", Description = "Private Christian university in Riverside", Rating = 3 },
            new College { Id = 84, Name = "Hope International University", Description = "Christian university in Fullerton with global mission emphasis", Rating = 2 },
            new College { Id = 85, Name = "Whittier College", Description = "Private liberal arts college with Quaker roots", Rating = 3 },
            new College { Id = 86, Name = "The Master's University", Description = "Christian university in Santa Clarita", Rating = 2 },
            new College { Id = 87, Name = "Providence Christian College", Description = "Small Reformed Christian liberal arts college in Pasadena", Rating = 2 },
            new College { Id = 88, Name = "La Sierra University", Description = "Seventh-day Adventist university in Riverside", Rating = 2 },
            new College { Id = 89, Name = "California Institute of Integral Studies - SoCal", Description = "Alternative and integrative education programs", Rating = 2 },
            new College { Id = 90, Name = "University of Redlands", Description = "Private liberal arts and professional university", Rating = 3 },
            new College { Id = 91, Name = "Pacific Oaks College", Description = "Education and human development focused private college", Rating = 2 },
            new College { Id = 92, Name = "Southern California Institute of Architecture (SCI-Arc)", Description = "Renowned independent architecture school in downtown LA", Rating = 4 },
            new College { Id = 93, Name = "California Institute of the Arts (CalArts)", Description = "World-class arts school in Valencia", Rating = 5 },
            new College { Id = 94, Name = "American Jewish University", Description = "Private Jewish university in Bel-Air", Rating = 2 },
            new College { Id = 95, Name = "Life Pacific University", Description = "Pentecostal Christian university in San Dimas", Rating = 2 },
            new College { Id = 96, Name = "Design Institute of San Diego", Description = "Interior design-focused college", Rating = 3 },
            new College { Id = 97, Name = "FIDM – Fashion Institute of Design & Merchandising", Description = "Downtown LA college for fashion and creative business", Rating = 3 },
            new College { Id = 98, Name = "Otis College of Art and Design", Description = "Art and design college near LAX", Rating = 4 },
            new College { Id = 99, Name = "Westcliff University", Description = "Private university in Irvine focused on business and technology", Rating = 3 },
            new College { Id = 100, Name = "University of Antelope Valley", Description = "For-profit university in Lancaster", Rating = 1 }


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
