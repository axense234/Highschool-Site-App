// Express
import { ErrorRequestHandler } from "express";

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  return res
    .status(err.statusCode || err.status || 500)
    .json({ msg: err.msg || err.message || "Server error:500." });
};

export default errorHandlerMiddleware;
