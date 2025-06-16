﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace mdf
{
    public class OptionsMiddleware
    {
        private readonly RequestDelegate _next;

        public OptionsMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public Task Invoke(HttpContext context)
        {
            return BeginInvoke(context);
        }

        private Task BeginInvoke(HttpContext context)
        {
            if (context.Request.Method != "OPTIONS") return _next.Invoke(context);
            context.Response.Headers.Add("Access-Control-Allow-Origin",
                new[] {(string) context.Request.Headers["Origin"]});
            context.Response.Headers.Add("Access-Control-Allow-Headers",
                new[] {"Origin, X-Requested-With, Content-Type, Accept"});
            context.Response.Headers.Add("Access-Control-Allow-Methods", new[] {"GET, POST, PUT, DELETE, OPTIONS"});
            context.Response.Headers.Add("Access-Control-Allow-Credentials", new[] {"true"});
            context.Response.StatusCode = 200;
            return context.Response.WriteAsync("OK");
        }
    }

    public static class OptionsMiddlewareExtensions
    {
        public static IApplicationBuilder UseOptions(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<OptionsMiddleware>();
        }
    }
}