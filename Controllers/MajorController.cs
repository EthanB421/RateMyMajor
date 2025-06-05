using Microsoft.AspNetCore.Mvc;
using RateMyMajor.Data;
using RateMyMajor.Models;

namespace RateMyMajor.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MajorController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public MajorController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("GetMajors")]
    public IActionResult GetMajors()
    {
        var majors = _context.Major.ToList();
        return Ok(majors);
    }
}
