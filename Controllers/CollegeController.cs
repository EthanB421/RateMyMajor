using Microsoft.AspNetCore.Mvc;
using RateMyMajor.Data;
using RateMyMajor.Models;
using RateMyMajor.Repository.IRepository;

namespace RateMyMajor.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CollegeController : ControllerBase
{
    private readonly ICollegeService _collegeService;

    public CollegeController(ICollegeService collegeService)
    {
        _collegeService = collegeService;
    }

    [HttpGet("GetColleges")]
    public async Task<IActionResult> GetAllCollegesAsync()
    {
        var majors = await _collegeService.GetAllCollegesAsync();
        return majors != null ? Ok(majors) : NotFound("No majors found.");
    }

[HttpGet("search")]
public async Task<IActionResult> SearchCollege([FromQuery] string keyword)
{
    var major = await _collegeService.GetCollegeByKeywordAsync(keyword);
    return major == null? NotFound("College not found.") : Ok(major);
}

}
