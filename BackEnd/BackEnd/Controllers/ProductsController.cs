using BackEnd.Data;
using BackEnd.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly StoreDbContext context;

        public ProductsController(StoreDbContext context)
        {
            this.context = context;
        }
        [HttpGet()]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await context.Products.ToListAsync();
            return Ok(products);
        }
        [HttpGet("{ID?}")]
        public async Task<ActionResult<Product>> GetProduct(int? ID)
        {
            var product = await context.Products.FindAsync(ID);

            return Ok(product);
        }
    }
}
