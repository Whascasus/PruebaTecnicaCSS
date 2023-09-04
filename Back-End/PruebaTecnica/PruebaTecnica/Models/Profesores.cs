using System;
using System.Collections.Generic;

namespace PruebaTecnica.Models;

public partial class Profesores
{
    public int Identificacion { get; set; }

    public int TipoIdentificacion { get; set; }

    public string Nombres { get; set; } = null!;

    public string Apellidos { get; set; } = null!;

    public string CorreoElectronico { get; set; } = null!;

    public long TelefonoCelular { get; set; }

    public int NumeroContrato { get; set; }

    public string? CiudadResidencia { get; set; }

    public int EscalafonTecnico { get; set; } 

    public int EscalafonExtension { get; set; }
}
