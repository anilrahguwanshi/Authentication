const userModel = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRegister = async (req, res) => {
    try {
        let { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "all fields are required"
            })
        }
        let hashpass = await bcrypt.hash(password, 10)
        let newUser = await userModel.create({
            name,
            email,
            password: hashpass,
            isverified: true
        })

        let token = jwt.sign({ id: newUser._id }, process.env.jwt_secret_key, {
            expiresIn: "1h",
        })
        res.cookie("token", token)

        return res.status(201).json({
            message: "user registered",
            user: newUser,
        })

    } catch (error) {
        console.log("user not register", error);
        return res.status(500).json({
            message: "internal server error",
            error: error,
        })
    }
}
const userLogin = async (req, res) => {
    try {
        let { email, password } = req.body

        if (!email || !password)
            return res.status(400).json({
                message: "email or password  are required"
            })
        let user = await userModel.findOne({ email })
        if (!user)
            return res.status(404).json({
                message: "user not found, please register"
            })
        if (!user.isVerified) {
            return res.status(403).json({
                message: "Please verify your email first"
            });
        }

        let isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch)
            return res.status(400).json({
                message: "invalid user"
            })

        let token = jwt.sign({ id: user._id }, process.env.jwt_secret_key, {
            expiresIn: "1h",
        })

        res.cookie("token", token)

        return res.status(200).json({
            message: "user login successfully",
            user,
        })

    } catch (error) {
        console.log("error in login", error);
        return res.status(500).json({
            message: "internal server error",
            error: error,
        })

    }
}
const userLogout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "lax",
        });

        return res.status(200).json({
            message: "User logged out successfully"
        });

    } catch (error) {
        console.log("error in logout", error);
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
};
module.exports = { userRegister, userLogin, userLogout }