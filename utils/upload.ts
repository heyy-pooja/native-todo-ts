import multer, { StorageEngine } from "multer";
import path from 'path';

const storage: StorageEngine = multer.diskStorage({
    filename: (req, file, cb) => {
        const filename = Date.now() + path.extname(file.originalname)
        cb(null, filename)
    }
})

export const upload = multer({ storage }).single("hero")