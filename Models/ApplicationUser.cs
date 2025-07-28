using Microsoft.AspNetCore.Identity;

public class ApplicationUser : IdentityUser
{
    // Add custom fields if needed (e.g., FirstName, LastName)
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
}
