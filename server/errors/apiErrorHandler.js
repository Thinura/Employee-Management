const ApiError = require('./apiError');
const LOG = require('../logger');

function apiErrorHandler(err, req, res, next) {
    // in prod, don't use console.error or console.log
    // because it is not async
    LOG.warn(err);

    if (err instanceof ApiError) {
        return res.status(err.code).json({ error: err.message?.message });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = apiErrorHandler;