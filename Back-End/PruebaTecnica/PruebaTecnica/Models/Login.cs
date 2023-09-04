using System;
using System.Collections.Generic;

namespace PruebaTecnica.Models;

public partial class Login
{
    public int IdUser { get; set; }

    public string Usuario { get; set; } = null!;

    public string contrasena { get; set; } = null!;
}
