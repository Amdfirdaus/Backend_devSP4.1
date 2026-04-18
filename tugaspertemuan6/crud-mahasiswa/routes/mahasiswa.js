const router = require("express").Router();
const mahasiswaController = require("../controllers/mahasiswaController");

router.get("/", mahasiswaController.viewMahasiswa);

router.get("/add", mahasiswaController.addPage);
router.post("/add", mahasiswaController.createMahasiswa);

router.get("/edit/:id", mahasiswaController.editPage);
router.post("/edit/:id", mahasiswaController.updateMahasiswa);

router.get("/delete/:id", mahasiswaController.deleteMahasiswa);

module.exports = router;
