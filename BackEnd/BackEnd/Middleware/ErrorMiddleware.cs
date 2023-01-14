using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace BackEnd.Middleware
{
    public class ErrorMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger<ErrorMiddleware> logger;
        private readonly IHostEnvironment hostEnvironment;

        public ErrorMiddleware(RequestDelegate next, ILogger<ErrorMiddleware> logger , IHostEnvironment hostEnvironment)
        {
            this.next = next;
            this.logger = logger;
            this.hostEnvironment = hostEnvironment;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {

                await next(context);
            }
            catch(Exception ex)
            {
                logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = 500;
                var option = new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var problem = new ProblemDetails()
                {
                    Title = ex.Message,
                    Detail = hostEnvironment.IsDevelopment() ? ex.StackTrace?.ToString() : null,
                    Status = 500
                    
                   
                };
               var problemInJsonFormat = JsonSerializer.Serialize(problem, option);
            
               await context.Response.WriteAsync(problemInJsonFormat);


            }

        }
    }
}
