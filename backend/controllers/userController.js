const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/UserModel');
const catchAsync = require('../utility/catchAsync');
const AppError = require('../utility/AppError');
const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	}
	else {
		cb(new AppError('Not an image! Please upload only images.', 400), false);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
	if (!req.file) return next();
	req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

	await sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat('jpeg')
		.jpeg({ quality: 90 })
		.toFile(`public/img/users/${req.file.filename}`);
	next();
});

const filterObject = (obj, ...allowedFiled) => {
	const newObj = {};
	Object.keys(obj).forEach((el) => {
		if (allowedFiled.includes(el)) {
			newObj[el] = obj[el];
		}
	});
	return newObj;
};

exports.getMe = (req, res, next) => {
	req.params.id = req.user._id;
	next();
};
exports.updateMe = catchAsync(async (req, res, next) => {
	//1)create error if user put password
	if (req.body.password || req.body.passwordconfirm) {
		return next(new AppError('This is not for password update. Please use URL:/updateMyPassword', 400));
	}
	//2)Filtered out unwanted fields names that are not allowed to be updated
	const filteredBody = filterObject(
		req.body,
		'name',
		'email',
		'address',
		'eduction',
		'job',
		'phoneNo',
		'website',
		'facebookLink',
		'instagramLink',
		'linkedInLink'
	);
	if (req.file) {
		const host = req.get('host');
		filteredBody.photo = `${req.protocol}://${host}/api/v1/users/img-90568426958?photo=${req.file.filename}`;
	}

	//3)updated user document
	const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({
		status: 'success',
		data: {
			user: updateUser,
		},
	});
});

exports.deleteMe = catchAsync(async (req, res, next) => {
	await User.findByIdAndUpdate(req.user.id, { active: false });
	res.status(200).json({
		status: 'success',
		data: null,
	});
});

exports.createUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not defined! Please use /signup insted',
	});
};

exports.getphoto = (req, res) => {
	res.sendFile(req.query.photo, {
		root: path.join(__dirname, '../public/img/users'),
	});
};

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);

exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
