CREATE DATABASE PruebaTecnica

USE PruebaTecnica

CREATE TABLE Profesores (
Identificacion INT NOT NULL PRIMARY KEY,
TipoIdentificacion INT NOT NULL,
Nombres VARCHAR(45) NOT NULL,
Apellidos VARCHAR(45) NOT NULL,
CorreoElectronico VARCHAR(45) NOT NULL,
TelefonoCelular BIGINT NOT NULL,
NumeroContrato INT NOT NULL,
CiudadResidencia VARCHAR(45),
EscalafonTecnico INT NOT NULL,
EscalafonExtension INT NOT NULL
)

CREATE TABLE Login (
IdUser INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
Usuario VARCHAR(45) NOT NULL,
contrasena VARCHAR(45) NOT NULL,
)

INSERT INTO Login (Usuario, contrasena) VALUES ('Whascasus','Whascasus2023')

SELECT * FROM Login

INSERT INTO Profesores (Identificacion, TipoIdentificacion,Nombres,Apellidos,CorreoElectronico,TelefonoCelular,NumeroContrato,CiudadResidencia, EscalafonTecnico, EscalafonExtension)
VALUES (10019318, 1, 'Esteban', 'Tabares Cañas', 'Tebantabares2003@gmail.com', 3245814106, 1,'Medellin', 1, 1)

SELECT * FROM Profesores