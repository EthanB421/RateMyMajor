public class AddReviewDto
{
    public int Rating { get; set; } // Rating from 1 to 5
    public string Content { get; set; } // Review text
    public int CollegeId { get; set; } // ID of the major being reviewed

}