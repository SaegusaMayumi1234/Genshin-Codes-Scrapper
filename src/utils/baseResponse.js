module.exports = {
    successResponse: (url, data) => {
        return {
            success: true,
            url,
            data,
        }
    },
    errorResponse: (url, message) => {
        return {
            success: false,
            url,
            data: message, 
        }
    }
}