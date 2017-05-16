exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    (process.env.NODE_ENV === 'production' ?
        'mongodb://admin:password@ds143181.mlab.com:43181/active-api-hiking-search' :
        'mongodb://admin:password@ds143181.mlab.com:43181/active-api-hiking-search');
exports.PORT = process.env.PORT || 5002;
