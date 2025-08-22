public class AddReviewDto
{
    public int Rating { get; set; } // Rating from 1 to 5
    public int Location { get; set; }

    public int Gym { get; set; }

    public int Classrooms { get; set; }

    public int Sports { get; set; }

    public int Food { get; set; }

    public int Happiness { get; set; }

    public int Safety { get; set; }

    public int Community { get; set; }
    public int Opportunities { get; set; }
    public int Faculty { get; set; }
    public string Content { get; set; } // Review text
    public int CollegeId { get; set; } // ID of the major being reviewed

}