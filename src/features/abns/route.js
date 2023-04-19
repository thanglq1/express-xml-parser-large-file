const controller = require("./controller");
const router = require("express").Router();

//CRUD
router
  .get("/", controller.getAll)
  .get("/:id", controller.getOne)
  .put("/:id", controller.updateOne)
  .delete("/:id", controller.deleteOne);

module.exports = router;
