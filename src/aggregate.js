db.social.aggregate([
    //Seleccionar aquellos que nacieron antes de 1980
    {
        $match: {
            $expr: {
                $lt: [{ $year: "$FechaNac" }, 1980]
            }
        }
    },
    //Mostrar algunos datos de los usuarios anteriores
    {
        $project: {
            _id: 0,
            Nombre: 1,
            Apellido1: 1,
            Género: 1,
            Nacionalidad: 1,
            Correo: 1,
            Validado: 1,
            Seguidores: 1
        }
    },
    //Agruparlos por su Nacionalidad
    {
        $group: {
            _id: "$Nacionalidad",
            Influencia: { $sum: "$Seguidores" }
        }
    },
    //Seleccionar solo cuya influencia sea mayor a 90000
    {
        $match: {
            Influencia: { $gt: 90000 }
        }
    }
]).pretty()
