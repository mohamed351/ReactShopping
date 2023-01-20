using BackEnd.Data;
using BackEnd.DTOS;
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
        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrevieBasket();

            if (basket == null)
            {
                return NotFound();
            }
            return MapObjectToDto(basket);
        }

       


        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {

            var i = Request.Cookies["buyerId"];
            var basket = await RetrevieBasket();
            if(basket == null)
            {
              basket = await CreateBasket();
             
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
                return CreatedAtRoute("GetBasket", MapObjectToDto(basket));
            }

            return BadRequest(new ProblemDetails() { Title = "Problem saving items to basket" });

            
        }

        private async Task<Basket> CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions() { IsEssential = true, Expires = DateTime.Now.AddDays(30), SameSite = SameSiteMode.None, HttpOnly = false , Secure = true };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket() { BuyerId = buyerId };
            context.Baskets.Add(basket);
           await context.SaveChangesAsync();
            return basket;
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItemBasket(int productId, int quantity)
        {
            var basket = await RetrevieBasket();
            if(basket == null)
            {
                return NotFound();
            }
            var product = await context.Products.FirstOrDefaultAsync(a => a.Id == productId);
            if(product == null)
            {
                return NotFound();
            }
            basket.RemoveItem(productId, quantity);
            var result = (await context.SaveChangesAsync()) > 0;
            if(result) return Ok();

            return BadRequest(new ProblemDetails() { Title = "Problem removing item from the basket" });

        }
        private async Task<Basket> RetrevieBasket()
        {
            return await context.Baskets
                .Include(a => a.Items)
                .ThenInclude(a => a.Product)
                .FirstOrDefaultAsync(a => a.BuyerId == Request.Cookies["buyerId"]);
        }

        private BasketDto MapObjectToDto(Basket basket)
        {
            return new BasketDto()
            {
                BuyerId = basket.BuyerId,
                Id = basket.Id,
                Items = basket.Items.Select(a => new BasketItemDto()
                {
                    Brand = a.Product.Brand,
                    Name = a.Product.Name
                ,
                    PictureUrl = a.Product.PictureUrl
                ,
                    Price = a.Product.Price
                ,
                    ProductId = a.ProductId
                ,
                    Quantity = a.Quantity
                ,
                    Type = a.Product.Type
                }).ToList()
            };
        }




    }
}
