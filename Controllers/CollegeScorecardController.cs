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

    [HttpGet("{unitId}")]
    public async Task<IActionResult> GetCollegeData(string unitId)
    {
        var result = await _collegeService.GetCollegeDataAsync(unitId);
        return Content(result, "application/json");
    }

    [HttpGet("test")]
    public IActionResult Test() => Ok("API is working");
}
