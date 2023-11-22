const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404)
    next(error)
  }
  
  const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message

    //cast error handling
    if(err.name === 'CastError'){
      message = 'Invalid ID'
      statusCode = 400
    }
    res.status(statusCode).json({
      message: message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
  }
  
  export { notFound, errorHandler }