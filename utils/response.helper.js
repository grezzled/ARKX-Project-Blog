const strings = require('../config/strings.config')

exports.postResponse = (data, error = false) => {

    const response = {
        error: error,
        status: !error ? strings.STATUS_SUCCESS : strings.STATUS_FAILURE,
        message: !error ? strings.POST_SUCCESS_MESSAGE : strings.POST_FAILURE_MESSAGE,
        result: data
    };
    return JSON.stringify(response);
}

exports.patchResponse = (data, error = false) => {
    const response = {
        error: error,
        status: !error ? strings.STATUS_SUCCESS : strings.STATUS_FAILURE,
        message: !error ? strings.PATCH_SUCCESS_MESSAGE : strings.PATCH_FAILURE_MESSAGE,
        result: data
    };
    return JSON.stringify(response);
}

exports.getResponse = (data, error = false) => {
    const response = {
        error: error,
        status: !error ? strings.STATUS_SUCCESS : strings.STATUS_FAILURE,
        message: !error ? strings.GET_SUCCESS_MESSAGE : strings.GET_FAILURE_MESSAGE,
        result: data
    };
    return JSON.stringify(response);
}
