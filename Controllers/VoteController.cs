using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
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
[Authorize]
[HttpPost]
public async Task<IActionResult> Vote([FromBody] VoteDto voteDto)
{
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

    if (string.IsNullOrEmpty(userId))
        return Unauthorized();

    var reviewExists = await _context.Review.FindAsync(voteDto.ReviewId);
    if (reviewExists == null)
        return NotFound("Review not found.");

    var existingVote = await _context.Votes
        .FirstOrDefaultAsync(v => v.ReviewId == voteDto.ReviewId && v.UserId == userId);

    if (existingVote != null)
    {
        if (existingVote.Value == voteDto.Value)
        {
            // User clicked same vote → remove it
            _context.Votes.Remove(existingVote);
        }
        else
        {
            // User changed vote → update it
            existingVote.Value = voteDto.Value;
            _context.Votes.Update(existingVote);
        }
    }
    else
    {
        // No vote yet → create one
        _context.Votes.Add(new Vote
        {
            ReviewId = voteDto.ReviewId,
            Value = voteDto.Value,
            UserId = userId
        });
    }

    await _context.SaveChangesAsync();

    var newVoteScore = await _context.Votes
        .Where(v => v.ReviewId == voteDto.ReviewId)
        .SumAsync(v => v.Value);

    var userVote = await _context.Votes
        .Where(v => v.ReviewId == voteDto.ReviewId && v.UserId == userId)
        .Select(v => v.Value)
        .FirstOrDefaultAsync(); // 0 if removed

    return Ok(new
    {
        reviewId = voteDto.ReviewId,
        newVoteScore,
        userVote
    });
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
