using Microsoft.AspNetCore.Mvc;
using RateMyMajor.Data;
using RateMyMajor.Models;
using RateMyMajor.Repository.IRepository;

namespace RateMyMajor.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MajorController : ControllerBase
{
    private readonly IMajorService _majorService;

    public MajorController(IMajorService majorService)
    {
        _majorService = majorService;
    }

    // [HttpGet("GetMajors")]
    // public IActionResult GetMajors()
    // {
    //     var majors = _majorService.Major.GetAll();
    //     return Ok(majors);
    // }

[HttpGet("search")]
public async Task<IActionResult> SearchMajor([FromQuery] string keyword)
{
    var major = await _majorService.GetMajorByKeywordAsync(keyword);
    return major == null? NotFound("Major not found.") : Ok(major);
}

}
