using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

[Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
[ApiController]
public class CollegeScorecardController : ControllerBase
{
    private readonly ICollegeScorecardService _collegeService;

    public CollegeScorecardController(ICollegeScorecardService collegeService)
    {
        _collegeService = collegeService;
    }

    [HttpGet("{collegeName}")]
    public async Task<IActionResult> GetCollegeData(string collegeName)
    {
        var result = await _collegeService.GetCollegeDataAsync(collegeName);
        return Content(result, "application/json");
    }

    [HttpGet("test")]
    public IActionResult Test() => Ok("API is working");
}
