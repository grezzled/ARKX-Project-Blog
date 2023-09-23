module.exports = function (err, req, res, next) {
    (err instanceof SyntaxError && err.status === 400 && 'body' in err) ?
        res.status(400).json({ error: 'Invalid JSON' }) :
        next()
}
