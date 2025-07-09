using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RateMyMajor.Data;
using RateMyMajor.Models;

[ApiController]
[Route("api/[controller]")]
public class VotesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public VotesController(ApplicationDbContext context)
    {
        _context = context;
    }

    // POST: api/votes
    // Body: { "reviewId": 1, "value": 1 }
    [HttpPost]
public async Task<IActionResult> Vote([FromBody] VoteDto voteDto)
{
    if (voteDto.Value != 1 && voteDto.Value != -1)
    {
        return BadRequest("Value must be 1 (upvote) or -1 (downvote).");
    }

    var reviewExists = await _context.Review.FindAsync(voteDto.ReviewId);
    if (reviewExists == null)
    {
        return NotFound("Review not found.");
    }

    var vote = new Vote
    {
        ReviewId = voteDto.ReviewId,
        Value = voteDto.Value
        // Optionally set UserId if you want to track who voted
    };

    _context.Votes.Add(vote);
    await _context.SaveChangesAsync();

    return Ok(new { message = "Vote registered." });
}


    // GET total votes for a review: api/votes/review/1
    [HttpGet("review/{reviewId}")]
    public async Task<IActionResult> GetVotesForReview(int reviewId)
    {
        var votes = await _context.Votes
            .Where(v => v.ReviewId == reviewId)
            .ToListAsync();

        int totalScore = votes.Sum(v => v.Value);

        return Ok(new { reviewId, totalScore, count = votes.Count });
    }
}
