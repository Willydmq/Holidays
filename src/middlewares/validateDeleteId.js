const { get } = require("../services/db");

const validateDeleteId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const toDo = await get("SELECT * FROM todos WHERE id = ?", [id]);
    if (toDo.length === 0) {
      return res
        .status(404)
        .json({ message: "El ID no se encuentra en la base de datos" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

module.exports = {
  validateDeleteId,
};
