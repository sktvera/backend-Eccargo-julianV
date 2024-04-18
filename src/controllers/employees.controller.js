import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM employees WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "quotation not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM employees WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "quotation not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};


export const createEmployee = async (req, res) => {
  try {
    // Convertir el objeto req.body a JSON
    const requestBody = JSON.parse(JSON.stringify(req.body));

    // Verificar si el objeto requestBody está vacío
    if (Object.keys(requestBody).length === 0) {
      return res.status(400).json({ message: 'El objeto requestBody está vacío' });
    }

    const { service, mode, cargoType, origin, destination } = requestBody;

    console.log(requestBody)

    // Ejecutar la consulta SQL utilizando el pool de conexiones
    const [result] = await pool.execute(
      "INSERT INTO employees (service, mode, cargoType, origin, destination) VALUES (?, ?, ?, ?, ?)",
      [service, mode, cargoType, origin, destination]
    );

    // Verificar si se insertaron los datos correctamente
    if (result.affectedRows === 1) {
      res.status(201).json({ message: 'Datos insertados correctamente' });
    } else {
      res.status(500).json({ message: 'No se pudo insertar el empleado' });
    }
  } catch (error) {
    console.error('Error al insertar datos:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};





export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { service, mode, cargoType, origin, destination } = req.body[0];

    const [result] = await pool.query(
      "UPDATE employees SET service = IFNULL(?, service), mode = IFNULL(?, mode), cargoType = IFNULL(?, cargoType), origin = IFNULL(?, origin), destination = IFNULL(?, destination) WHERE id = ?",
      [service, mode, cargoType, origin, destination, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Cotizacion no encontrada" });

    const [rows] = await pool.query("SELECT * FROM employees WHERE id = ?", [id]);

    res.json(rows[0]);
  } catch (error) {
    console.error("Error update quotation:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
