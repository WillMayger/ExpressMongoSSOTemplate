const User = require('../../models/User');

// CONTAINS METHODS TO CHECK LEVELS OF AUTHENTICATION TO GRANT ACCESS TO ROUTES
const ensure = {
    // FOR STANDARD USER AUTHENTICATION PERMISSIONS
    authenticated: (req, res, next) => {
        if (process.env.NODE_ENV === 'test') return next();

        if (req.isAuthenticated()) {
            return next();
        }

        return res.json({
            success: false,
            data: [],
            message: 'You must login at /login to access this page',
        });
    },

    // FOR ADMIN LEVEL USER AUTHENTICATION PERMISSIONS
    admin: (req, res, next) => {
        if (process.env.NODE_ENV === 'test') return next();

        if (!req.isAuthenticated()) {
            return res.json({
                success: false,
            });
        }

        return User.findOne({
            userid: req.user.userid,
        }, (err, user) => {
            if (user.admin) {
                return next();
            }

            return res.json({
                success: false,
            });
        });
    },
};

module.exports = ensure;
