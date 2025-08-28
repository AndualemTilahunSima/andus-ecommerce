export const errorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
        timestamp: new Date().toISOString(),
    });
}