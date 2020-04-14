const jwt = require('jsonwebtoken');
module.exports = {
    
    setAuthToken(contributorID, email, name){
        return jwt.sign({contributorID, email, name}, process.env.SECRET_KEY, {
            expiresIn: 1440
        });
    }

}