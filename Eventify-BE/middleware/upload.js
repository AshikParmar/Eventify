import multer from "multer";
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null,  Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});
