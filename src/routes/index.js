const { Router } = require("express");
const router = Router();
const { get, run } = require("../services/db");
const { validatePostFields } = require("../middlewares/validatePostFields");
const { validateDeleteId } = require("../middlewares/validateDeleteId");
const { v4: uuidv4 } = require("uuid");

// api/
router.get("/", async (req, res, next) => {
  try {
    const toDos = await get("SELECT * FROM todos");
    const data = toDos.map((toDo) => {
      return {
        id: toDo.id,
        title: toDo.title,
        description: toDo.description,
        isDone: Boolean(toDo.isDone),
        showDescription: Boolean(toDo.showDescription),
        url: toDo.url,
        data_time: toDo.data_time,
        data_time_edit: toDo.data_time_edit,
      };
    });
    res.status(200).json({ message: "To-dos retrieved successfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el servidor", error });
  }
});

router.post("/", validatePostFields, async (req, res, next) => {
  try {
    const { title, description, url } = req.body;
    const id = uuidv4();
    const data = await run(
      "INSERT INTO todos (id, title, description, url) VALUES (?, ?, ?, ?)",
      [id, title, description, url]
    );

    res.status(200).json({
      message: "To-do created successfully",
      toDo: {
        id,
        title,
        description,
        isDone: false,
        showDescription: false,
        url,
        data_time: new Date(),
        data_time_edit: new Date(),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el servidor", error });
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const toDo = await get("SELECT * FROM todos WHERE id = ?", [id]); // []
    if (toDo.length === 0) {
      return res
        .status(404)
        .json({ message: `el ID no se encuentra en la db` });
    }
    let { title, description, isDone, showDescription, url, data_time_edit } =
      req.body;

    if (typeof data_time_edit == "undefined") {
      data_time_edit = toDo[0].data_time_edit;
    }

    if (typeof url == "undefined") {
      url = toDo[0].url;
    }

    if (typeof showDescription !== "boolean") {
      showDescription = !!showDescription;
    }

    if (typeof isDone !== "boolean") {
      isDone = !!isDone;
    }
    if (typeof title == "undefined") {
      title = toDo[0].title;
    }
    if (typeof description == "undefined") {
      description = toDo[0].description;
    }
    const isDoneNumber = Number(isDone);
    const showDescriptionNumber = Number(showDescription);

    await run(
      `UPDATE todos SET title = ?, description = ?, isDone = ?, showDescription = ?, url = ?, data_time_edit = CURRENT_TIMESTAMP WHERE id = ?`,
      [title, description, isDoneNumber, showDescriptionNumber, url, id]
    );
    res.status(200).json({
      message: `To-do updated successfully`,
      toDo: {
        id,
        title,
        description,
        isDone: Boolean(isDone),
        showDescription: Boolean(showDescription),
        url,
        data_time_edit,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el servidor", error });
  }
});

router.delete("/:id", validateDeleteId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const toDo = await get("SELECT * FROM todos WHERE id = ?", [id]);
    await run("DELETE FROM todos WHERE id = ?", [id]);
    res.status(200).json({
      message: `To-do with ID ${id} deleted successfully`,
      toDo: {
        id: toDo[0].id,
        title: toDo[0].title,
        description: toDo[0].description,
        isDone: Boolean(toDo[0].isDone),
        showDescription: Boolean(toDo[0].showDescription),
        url: toDo[0].url,
        data_time: toDo[0].data_time,
        data_time_edit: toDo[0].data_time_edit,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor", error });
  }
});

module.exports = router;
