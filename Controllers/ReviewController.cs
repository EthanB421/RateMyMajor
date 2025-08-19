using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ReviewController : ControllerBase
{
    private readonly IReviewService _reviewService;

    public ReviewController(IReviewService reviewService)
    {
        _reviewService = reviewService;
    }
    [Authorize]
    [HttpPost("add")]
    public async Task<IActionResult> AddReview([FromBody] AddReviewDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _reviewService.AddReviewAsync(dto, User); // Pass in User if you're getting user ID from token

        if (!result.Succeeded)
            return BadRequest(result.Message);

        return Ok(new { message = result.Message });
    }
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            //gets used id
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
                return Unauthorized();

            var result = await _reviewService.DeleteReviewAsync(id, userId);

            if (!result.Succeeded)
                return BadRequest(result.Message);

            return Ok(new { message = result.Message });
        }

}
