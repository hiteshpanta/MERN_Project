import path from 'path';
import { v4 as uuidv4 } from 'uuid';
const supportedExts = ['.png', '.jpg', '.jpeg', '.gif'];


export const checkFile = (req, res, next) => {
  const file = req.files?.image;


  //checking file
  if (!file) return res.status(400).json({
    status: 'Error',
    data: 'please provide image file'
  });
  const fileExts = path.extname(file.name);


  //checking valid imageFile
  if (!supportedExts.includes(fileExts)) return res.status(400).json({
    status: 'Error',
    data: 'please provide valid image file'
  });

  const imagePath = `${uuidv4()}-${file.name}`;
  file.mv(`./uploads/${imagePath}`, (err) => {
    req.imagePath = imagePath;
    next();
  });





}


export const updateCheckFile = (req, res, next) => {
  const file = req.files?.image;


  //checking file
  if (!file) return next();
  const fileExts = path.extname(file.name);


  //checking valid imageFile
  if (!supportedExts.includes(fileExts)) return res.status(400).json({
    status: 'Error',
    data: 'please provide valid image file'
  });

  const imagePath = `${uuidv4()}-${file.name}`;
  file.mv(`./uploads/${imagePath}`, (err) => {
    req.imagePath = imagePath;
    next();
  });





}