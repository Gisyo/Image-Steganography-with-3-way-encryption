const catchAsync = require('../utility/catchAsync');
const AppError = require('../utility/AppError');

const sendresponse = (doc, statusCode, res, next) => {
  if (!doc) {
    return next(new AppError('No document found with that id.'));
  }
  res.status(statusCode).json({
    status: 'success',
    data: doc
  });
};

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    sendresponse(doc, 204, res);
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByAndUpdate(req.params.id, req.body, {
      new: true,
      runvalidators: true
    });
    if (!doc) {
      return next(new AppError('No document found with that id'));
    }
    sendresponse(doc, 200, res);
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    sendresponse(doc, 201, res);
  });

exports.getOne = (Model, popOptins) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptins) query = query.populate(popOptins);
    const doc = await query;
    sendresponse(doc, 200, res);
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find({});
    res.status(200).json({
      status: 'success',
      result: doc.length,
      data: {
        data: doc
      }
    });
  });
