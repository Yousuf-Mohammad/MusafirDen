import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) { 
    cb(null, 'frontend/build/Images/');
    },
    filename(req, file, cb) {
    cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
    },
});

function fileFilter(req, file, cb) {
    const filetypes = /jpeg|png|webp|jpg/;
    const mimetypes = /image\/jpeg|image\/png|image\/webp|image\/jpg/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mimetypes.test(file.mimetype);

    if (extname && mimetype) {
    cb(null, true);
    } else {
    cb(new Error('Images only!'), false);
    }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
    uploadSingleImage(req, res, function (err) {
    if (err) {
        return res.status(400).send({ message: err.message });
    }
    
    res.status(200).send({
        message:  req.file,
        image: `/${req.file.filename}`,
       
    });
    });
});

export default router;