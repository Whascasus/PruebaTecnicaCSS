using Microsoft.AspNetCore.Mvc;
using PruebaTecnica.Models;

namespace PruebaTecnica.Services.Contrato
{
    public interface ILoginService
    {
        Task<bool> AuthenticateAsync(string usuario, string contrasena);
    }
}
