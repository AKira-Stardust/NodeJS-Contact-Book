const { constants } = require("../constants")

const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    let title = ""

    switch (statusCode) {
        case constants.VALIDATION_ERROR: {
            title = "Validation failed!"
            break
        }
        case constants.UNAUTHORIZED: {
            title = "Unauthorized!"
            break
        }
        case constants.FORBIDDEN: {
            title = "Forbidden!"
            break
        }
        case constants.NOT_FOUND: {
            title = "File Not Found!"
            break
        }
        case constants.SERVER_ERROR: {
            title = "Server Error!"
            break
            
        }
        default : {
            console.log("No Errors! Good to go!")
            break
        }
    }
    res.json({ title: title, message: error.message, stackTrace: error.stack })
}

module.exports = errorHandler