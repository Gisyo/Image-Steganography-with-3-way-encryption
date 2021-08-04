/* eslint-disable array-callback-return */
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const AppError = require('../utility/AppError');
const Message = require('../models/messageModel');
const catchAsync = require('../utility/catchAsync');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});
exports.stego = upload.single('photo');

exports.createMassege = catchAsync(async (req, res, next) => {
  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .toFormat('jpeg')
    .toFile(`public/img/mesag/${req.file.filename}`);
  const doc = await Message.findOne({ user: req.user._id });
  if (doc) {
    await Message.findOneAndUpdate(
      {
        user: req.user._id
      },
      {
        $push: {
          images: {
            stego: req.file.filename,
            messageCreateDate: Date.now()
          }
        }
      }
    );
  } else {
    await Message.create({
      user: req.user._id,
      images: {
        stego: req.file.filename,
        messageCreateDate: Date.now()
      }
    });
  }
  res.status(200).json({
    status: 'success'
  });
});

exports.GetAllMassege = catchAsync(async (req, res, next) => {
  const doc = await Message.find({ user: req.user._id });

  res.status(200).json({
    status: 'success',
    data: doc
  });
});

exports.GetMeassage = (req, res) => {
  console.log(req.query);
  res.sendFile(req.query.stego, {
    root: path.join(__dirname, '../public/img/mesag')
  });
};

exports.deleteMassege = catchAsync(async (req, res, next) => {
  const doc = await Message.findOne({ user: req.user._id });
  doc.images.map(image => {
    if (image._id.equals(req.params.id)) {
      const name = image.stego;
      const url = path.join(__dirname, `../public/img/mesag/${name}`);
      fs.unlink(url, err => {
        if (err) console.log(err);
      });
    }
  });
  doc.images.pull(req.params.id);
  await doc.save();
  res.status(200).json({
    status: 'success'
  });
});
