
global._handleResponse = function (req, res, err, response) {
	// logger.info(response);
	if (err) {
        return res.status(err.statusCode || 400).json({
            status: 'error',
            ok: false,
            code: err.code || err.name || "BadRequest",
            message: err.message || err,
            result: ""
        })
    }
    return res.status(200).json({
        status: 'success',
		ok: true,
		code: response.code || 200,
		message: '',
		result: response,
    })
};