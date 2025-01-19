import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config.js";

export const authenticateToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    debug.magenta(authHeader);
    //console.log("token es: ", token)

    if(!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err) return res.sendStatus(403); // Forbidden
        req.user = user;

    // si la llave es correcta
    next();

    })
}