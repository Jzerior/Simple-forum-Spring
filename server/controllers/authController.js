const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')

var dotenv = require('dotenv')
dotenv.config()

const User = require("../database/models/User");

module.exports = {
    async register(req, res) {
        const { login, email, password } = req.body;

        try {
            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    status: 400,
                    message: "User already exists",
                });
            }
            console.log(login)
            // Encrypt the password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create a new user instance
            const user = new User({
                login,
                email,
                password: hashedPassword,
            });

            // Save the user to the database
            await user.save();

            res.status(200).json({
                status: 200,
                message: "User registered successfully",
            });
        } catch (err) {
            res.status(400).json({
                status: 400,
                message: err.message.toString(),
            });
        }
    },

    async login(req, res) {
        const { login, password } = req.body;

        try {
            // Check if the user exists
            const user = await User.findOne({ login });
            if (!user) {
                return res.status(400).json({
                    status: 400,
                    message: "User not found",
                });
            }

            // Compare the provided password with the stored hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    status: 400,
                    message: "Invalid password",
                });
            }

            const accessToken = jwt.sign(
                {
                    //id: loggingUser?.id,
                    login: user?.login,
                    email: user?.email,
                    role: user?.role
                },
                process.env.TOKEN_SECRET,
                { expiresIn: '1h' }
            )
            const infoToken =
                {
                    //id: loggingUser?.id,
                    login: user?.login,
                    email: user?.email,
                    role: user?.role
                }
            res.cookie('jwt', accessToken, {
                maxAge: 3600000,
                secure: false,
                httpOnly: true,
                sameSite: 'strict'
            });
            console.log('Setting cookie:', accessToken);
            // If both checks pass, return a success message
            res.status(200).json({
                status: 200,
                message: "Login successful",
                accessToken: infoToken,
            });
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: err.message.toString(),
            });
        }
    },
    async authenticate(req, res, next) {
        const authHeader = req.headers
        const token = authHeader['authorization']
        if (token == null || token == '') return res.status(401).json({ message: 'Unauthorized' })

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: 'Token is not valid' })
            req.user = user
            next()
        })
    },
    checkRole(roles) {
        return (req, res, next) => {
            const userRole = req.user.role
            if (roles.includes(userRole)) {
                next()
            } else {
                return res.status(403).json({ message: 'Unauthorized access' });
            }
        }
    },
    // Middleware do weryfikacji tokena JWT
    verifyToken(req, res, next){
        const token = req.cookies.jwt;
        console.log(req.cookies)
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token '+error });
        }
    }
};
