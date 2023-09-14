const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key'; // Replace with your actual secret key

function verifyToken(token) {
    try {
        // Verify the token and decode the user data
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded; // Return the decoded user data
    } catch (error) {
        // Token verification failed
        throw new Error('Token verification failed'+error);
    }
}

module.exports = function authenticate(req, res, next) {
    const token = req.cookies.jwt;

    if (token) {
        try {
            // Verify the JWT token here
            const userData = verifyToken(token);

            // Set user data in req.user for use in other routes
            req.user = userData;

            next(); // User is authenticated
        } catch (error) {
            // Token verification failed
            console.error('Token verification failed:', error);

            // Clear the JWT cookie
            res.clearCookie('jwt');

            // Redirect to the login page
            res.redirect('/login'); // Replace with your login route
        }
    } else {
        // Redirect to the login page if no JWT cookie is found
        res.redirect('/login'); // Replace with your login route
    }
};
