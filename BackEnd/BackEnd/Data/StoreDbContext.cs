using BackEnd.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Data
{
    public class StoreDbContext :DbContext
    {
        public StoreDbContext(DbContextOptions<StoreDbContext> dbContextOptions)
            :base(dbContextOptions)
        {

        }


        public DbSet<Product> Products { get; set; }

        public DbSet<Basket> Baskets { get; set; }
    }
}
