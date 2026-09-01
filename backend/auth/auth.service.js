import jwt from 'jsonwebtoken';

const ADMIN_USER = { username: 'admin', password: '1234' };

export const authService = {
    login({ username, password }) {
        if (username !== ADMIN_USER.username || password !== ADMIN_USER.password) {
            throw new Error('Usuario o contraseña incorrectos');
        }
        return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    },
};