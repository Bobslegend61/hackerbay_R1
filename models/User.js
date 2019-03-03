const jwt = require('jsonwebtoken');

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    generateToken() {
        return jwt.sign({ username: this.username }, 'secret', { expiresIn: '1h' });
    }

    sendUserDetails() {
        return {
            username: this.username,
            token: this.generateToken()
        };
    }
}

module.exports = User;