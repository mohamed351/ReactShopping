using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController : ControllerBase
    {
        [HttpGet("not-found")]
        public IActionResult GetNotfound()
        {
            return NotFound();
        }
        [HttpGet("bad-request")]
        public IActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails() { Detail = "This a bad Request" });
           // return BadRequest("This is a bad request");
        }
        [HttpGet("unauth")]
        public IActionResult GetUnAuthrized()
        {
            return Unauthorized("The user is unauth");
        }
        [HttpGet("validation-error")]
        public IActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem 1", "There is a problem");
            ModelState.AddModelError("Problem 2", "There is a problem");
            return ValidationProblem();
        }
        [HttpGet("server-error")]
        public IActionResult GetServerError()
        {
            throw new Exception("This Server Error");
        }



    }
}
