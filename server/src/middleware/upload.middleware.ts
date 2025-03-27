import multer from 'multer'
import fs from 'fs'
import path from 'path'

const uploadDir = path.join(__dirname,"../../public/images")
// let dirStatus = fs.existsSync(uploadDir) // this is to check if dir exists

const storage = multer.diskStorage(
    {
        destination : (req, file, cb)=>{
            cb(null, uploadDir);
        },
        filename : (req, file, cb)=>{
            const ext = path.extname(file.originalname);
            cb(null,Date.now()+ext);
        }
    }
)

const fileFilter = (req:any, File:Express.Multer.File, cb:any)=>{
    if (file.mimetype.startsWith("image/")){
        cb(null,true);
    }
    else{
        cb(new Error("only Image files are allowed!"),false);
    }
}

const upload = multer({storage,fileFilter});
export default upload;