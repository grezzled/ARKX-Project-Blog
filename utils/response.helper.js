const strings = require('../config/strings.config')

exports.generateResponse = (error, status, message, data) => {
    const response = {
        error: error,
        status: status,
        message: message,
        data: data
    };
    return JSON.stringify(response);
}
exports.postResponse = (data, error = false) => {
    const response = {
        error: error,
        status: !error ? strings.STATUS_SUCCESS : strings.STATUS_FAILURE,
        message: !error ? strings.POST_SUCCESS_MESSAGE : strings.POST_FAILURE_MESSAGE,
        data: data
    };
    return JSON.stringify(response);
}

exports.patchResponse = (data, error = false) => {
    const response = {
        error: error,
        status: !error ? strings.STATUS_SUCCESS : strings.STATUS_FAILURE,
        message: !error ? strings.PATCH_SUCCESS_MESSAGE : strings.PATCH_FAILURE_MESSAGE,
        data: data
    };
    return JSON.stringify(response);
}