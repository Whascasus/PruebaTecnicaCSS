using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaTecnica.Models;
using PruebaTecnica.Services.Contrato;

namespace PruebaTecnica.Services.Implementacion
{
    public class LoginService : ILoginService
    {
        private DbPruebaTecnicaContext _dbContext;
        public LoginService(DbPruebaTecnicaContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> AuthenticateAsync(string usuario, string contrasena)
        {
            var usuarioEncontrado = await _dbContext.Login.FirstOrDefaultAsync(u => u.Usuario == usuario && u.contrasena == contrasena);

            return usuarioEncontrado != null;
        }
    }
}
