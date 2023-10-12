import path from 'path'
import express from 'express'
import multer from 'multer'


const router = express.Router();

const storage =multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads/');
    },
    filename(req, res, cb){
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
})

function checkFileType(file,cb){
    const filetypes ='/jpg|jpeg|png|webp/';
    const extname= filetypes.test(path.extname(file.originalname).toLocaleLowerCase());

    const mimetype = filetypes.test(file.mimetype);

    if(extname && mimetype){
        return cb(null, true);
    }else{
        cb('Image only!')
    }
}

const upload = multer({
    storage, checkFileType
});
const uploadSingleImage= upload.single('image');

router.post('/', (req, res) => {
    uploadSingleImage(req, res, function (err) {
        if (err) {
        return res.status(400).send({ message: err.message });
        }
    
        res.status(200).send({
        message: 'Image uploaded successfully',
        image: `/${req.file.path}`,
        });
    });
    });


export default router