import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// Setup penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Pastikan folder 'uploads' ada
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname); // Ambil ekstensi file
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

// Filter jenis file
const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/; // Ekstensi yang diperbolehkan
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/; // MIME Type yang diperbolehkan

  const extname = path.extname(file.originalname);
  const mimetype = file.mimetype;

  // Cek apakah ekstensi dan MIME Type cocok
  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true); // File diterima
  } else {
    cb(new Error("Images only"), false); // File ditolak
  }
};

// Setup multer
const upload = multer({ storage, fileFilter });

// Middleware untuk upload file tunggal
const uploadSingleImage = upload.single("image");

// Route untuk upload
router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      return res.status(400).send({ message: err.message }); // Jika error, kirimkan pesan error
    }

    if (req.file) {
      // Jika file berhasil di-upload
      res.status(200).send({
        message: "Image uploaded successfully",
        image: `/${req.file.path}`, // Path file yang di-upload
      });
    } else {
      // Jika tidak ada file yang di-upload
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

export default router;
