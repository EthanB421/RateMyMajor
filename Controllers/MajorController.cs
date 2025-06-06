using Microsoft.AspNetCore.Mvc;
using RateMyMajor.Data;
using RateMyMajor.Models;
using RateMyMajor.Repository.IRepository;

namespace RateMyMajor.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MajorController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IWebHostEnvironment _webHostEnvironment;


    public MajorController(IUnitOfWork db, IWebHostEnvironment webHostEnvironment)
    {
        _unitOfWork = db;
        _webHostEnvironment = webHostEnvironment;
    }

    [HttpGet("GetMajors")]
    public IActionResult GetMajors()
    {
        var majors = _unitOfWork.Major.GetAll();
        return Ok(majors);
    }
}
