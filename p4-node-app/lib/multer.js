import multer from "multer";

const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    const prefix = Date.now();
    callback(null, `${prefix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
