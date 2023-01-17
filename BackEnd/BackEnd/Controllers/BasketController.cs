using BackEnd.Data;
using BackEnd.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly StoreDbContext context;

        public BasketController(StoreDbContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasket()
        {
            var basket = await RetrevieBasket();

            if (basket == null)
            {
                return NotFound();
            }
            return basket;
        }

       

        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {

            var basket = await RetrevieBasket();
            if(basket == null)
            {
                CreateBasket();
            }
            var product = await context.Products.FirstOrDefaultAsync(a => a.Id == productId);
            if(product == null)
            {
                return NotFound();
            }

            basket.AddItem(product, quantity);

            var result = await context.SaveChangesAsync() > 0;

            if (result)
            {
                return StatusCode(201);
            }

            return BadRequest(new ProblemDetails() { Title = "Problem saving items to basket" });

            
        }

        private void CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions() { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);

        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItemBasket(int productId, int quantity)
        {
            return Ok();
        }
        private async Task<Basket> RetrevieBasket()
        {
            return await context.Baskets
                .Include(a => a.Items)
                .ThenInclude(a => a.Product)
                .FirstOrDefaultAsync(a => a.BuyerId == Request.Cookies["buyerId"]);
        }




    }
}
