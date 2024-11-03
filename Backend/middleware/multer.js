<<<<<<< HEAD
import multer from 'multer'

const storage = multer.memoryStorage();

export const singleUpload = multer({ storage }).single('file');

=======
import multer from 'multer'

const storage = multer.memoryStorage();

export const singleUpload = multer({ storage }).single('file');

>>>>>>> ca04c13ac29814a6e1da2ade11b554cb71d21910
