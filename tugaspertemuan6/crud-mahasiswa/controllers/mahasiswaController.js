const Mahasiswa = require("../models/Mahasiswa");

module.exports = {
  // VIEW
  viewMahasiswa: async (req, res) => {
    const mahasiswa = await Mahasiswa.find();
    res.render("index", { mahasiswa, title: "CRUD Mahasiswa" });
  },

  // ADD PAGE
  addPage: (req, res) => {
    res.render("add");
  },

  // CREATE
  createMahasiswa: async (req, res) => {
    const { nama, nim, jurusan, alamat } = req.body;
    await Mahasiswa.create({ nama, nim, jurusan, alamat });
    res.redirect("/mahasiswa");
  },

  // EDIT PAGE
  editPage: async (req, res) => {
    const mahasiswa = await Mahasiswa.findById(req.params.id);
    res.render("edit", { mahasiswa });
  },

  // UPDATE
  updateMahasiswa: async (req, res) => {
    const { nama, nim, jurusan, alamat } = req.body;

    await Mahasiswa.updateOne(
      { _id: req.params.id },
      { nama, nim, jurusan, alamat },
    );

    res.redirect("/mahasiswa");
  },

  // DELETE
  deleteMahasiswa: async (req, res) => {
    await Mahasiswa.deleteOne({ _id: req.params.id });
    res.redirect("/mahasiswa");
  },
};
