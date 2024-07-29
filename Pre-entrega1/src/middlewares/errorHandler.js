function errorHandler (error, req, res, next) {
    console.log(error);
    return res.json({
        statusCode: error.statusCode || 500,
        message: error.message || "An error occurred in the coder api",
    });
}

export default errorHandler;