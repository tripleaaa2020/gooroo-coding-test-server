module.exports = {
    success(res, data) {
        var code = 200;
        var format = {
            code,
            status: true,
            data: data
        };
        res.json(format)
    },
    successWithExpired(res, data, expired_at) {
        var code = 200;
        var format = {
            code,
            status: true,
            data: data,
            expired_at
        };
        res.json(format)
    },
    fail(res, message) {
        var code = 300;
        var format = {
            code,
            status: false,
            msg: message
        };
        res.json(format)
    },
    failWithData(res, message,data) {
        var code = 300;
        var format = {
            code,
            status: false,
            msg: message,
            data:data
        };
        return res.json(format)
    },
    error(res, message) {
        var code = 400;
        var format = {
            code,
            status: false,
            msg: message
        };
        res.json(format)
    },
    rejectUnauthorized(res, message) {

        var code = 403;
        var format = {
            code,
            status: false,
            msg: message.toString()
        };
        res.json(format)
    },
    validationFound({
        msg,
        param,
        value,
        nestedErrors
    }) {
        var code = 300;
        var format = {
            code,
            status: false,
            message: msg,
            param: param,
            value: value,
            nestedErrors: nestedErrors
        };
        return format;
    }
};
