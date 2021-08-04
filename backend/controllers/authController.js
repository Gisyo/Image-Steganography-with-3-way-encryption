const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');
const AppError = require('../utility/AppError');
const Email = require('../utility/email');
const catchAsync = require('../utility/catchAsync');

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES,
	});
};

const createSendToken = (user, statusCode, req, res) => {
	const token = signToken(user._id);

	// Remove password from output
	user.password = undefined;
	res.status(statusCode).json({
		status: 'success',
		token,
		data: user,
	});
};

exports.signup = catchAsync(async (req, res, next) => {
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordconfirmed: req.body.passwordconfirmed,
	});
	newUser.role = undefined;
	newUser.__v = undefined;
	createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	//1)there is password and email
	if (!email || !password) {
		if (!password && email) {
			return next(new AppError('Please enter password'));
		}
		else {
			return next(new AppError('Please enter email and password', 400));
		}
	}
	//2)Find the user is exit in our DB and password correct
	const user = await User.findOne({ email }).select('+password');

	if (!user || !await user.correctPassword(password, user.password)) {
		return next(new AppError('Incorrect email or password', 401));
	}

	//3)everything ok
	createSendToken(user, 201, req, res);
});

exports.logout = (req, res) => {
	res.cookie('jwt', 'logout', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});
	res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
	//1)Getting token and check if there it'status
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	}
	else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (!token) {
		return next(new AppError('You are not logged in. Please login', 401));
	}

	//2)verfiy Token Verify
	const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	//3)check if user still exit in DB
	const currentUser = await User.findById(decode.id);
	if (!currentUser) {
		return next(new AppError('The user belong to this token does not exist', 401));
	}

	//4)chech if user changed password after the token was issued
	if (currentUser.changePassAfter(decode.iat)) {
		return next(new AppError('User recently changed password. Please login again', 401));
	}

	//Grant access to protected route
	req.user = currentUser;
	res.locals.user = currentUser;
	next();
});

exports.isLoggedIn = async (req, res, next) => {
	if (req.cookies.jwt) {
		try {
			//1)verfiy token
			const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

			//2)check if user still exists
			const currentUser = await User.findById(decoded.id);
			if (!currentUser) {
				return next();
			}

			//3)chech if user changed password after the token was issued
			if (currentUser.changePassAfter(decoded.iat)) {
				return next();
			}

			//there is a logged in user
			res.locals.user = currentUser;
			return next();
		} catch (err) {
			return next();
		}
	}
};

exports.restrictTo = (...role) => {
	return (req, res, next) => {
		//role['user','admin']

		if (!role.includes(req.user.role)) {
			return next(new AppError('You do not have to premisson to do this action', 403));
		}
		next();
	};
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
	//1)get user base on post request
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(new AppError('There is no user with that email', 404));
	}

	//2)generate random tokrn and send
	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });

	//3)send it to userModel email
	try {
		// const resetURL = `${req.protocal}:||${req.get(
		//    'host'
		//  )}/api/v1/users/resetPassword/${resetToken}`;
		const resetURL = `${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
		console.log(resetURL);
		await new Email(user, resetURL).sendPasswordReset();
	} catch (err) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save({ validateBeforeSave: false });
		console.log(err);
		return next(new AppError('There was an error sending the email. Try again later!'));
	}
	res.status(200).json({
		status: 'success',
	});
});

exports.resetPassword = catchAsync(async (req, res, next) => {
	//1)get user base  resetToken
	const hashedToken = crypto.createHash('sha256').update(req.parans.token).digest('hex');
	const user = await User.findOne({
		createPasswordResetToken: hashedToken,
		passwordResetExpires: { $gte: Date.now() },
	});

	//2)if token has not expired and there is user, ser the new password
	if (!user) {
		return next(new AppError('token is invalid or has expired', 400));
	}
	user.password = req.body.Password;
	user.passwordconfirmed = req.body.Passwordconfirmed;
	user.passwordResetExpires = undefined;
	user.passwordResetToken = undefined;
	await user.save();
	//3)update changed passwordAt perporty for the user(document middleware)

	//4)log the user and send token
	createSendToken(user, 200, req, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
	//1)get user from collection
	const user = await User.findById(req.user.id).select('+password');

	//2)check if POST password is correct
	if (!await user.correctPassword(req.body.passwordcurrent, user.password)) {
		return next(new AppError('Your current password is worng', 401));
	}

	//3)if all correct than updata password
	user.password = req.body.password;
	user.passwordconfirmed = req.body.passwordconfirmed;
	await user.save();
	console.log('update3');
	createSendToken(user, 200, req, res);
});
