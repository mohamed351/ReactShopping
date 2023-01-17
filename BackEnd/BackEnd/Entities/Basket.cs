using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Entities
{
    public class Basket
    {
        public int Id { get; set; }

        public string BuyerId { get; set; }

        public List<BasketItem> Items { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            if (Items.All(a => a.ProductId != product.Id))
            {
                Items.Add(new BasketItem { ProductId = product.Id, Quantity = 1 });
            }
            else
            {
                var existingItem = Items.FirstOrDefault(a => a.ProductId == product.Id);
                if (existingItem != null)
                {
                    existingItem.Quantity += quantity;
                }




            }
        }
        public void RemoveItem(int productId, int quantity)
        {
            var item = Items.FirstOrDefault(a => a.ProductId == productId);
            if(item == null)
            {
                return;
            }
            item.Quantity -= quantity;
            if(item.Quantity == 0)
            {
                Items.Remove(item);
            }
        }
    }
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }


        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}
