export const errorResponse = (res, statusCode, message, code) => {
    return res.status(statusCode).json({
        success: false,
        code,
        message,
        timestamp: new Date().toISOString(),
    });
}