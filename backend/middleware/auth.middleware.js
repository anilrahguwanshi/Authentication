const jwt = require("jsonwebtoken")
const userModel = require("../model/user.model")


const authentication = async (req, res, next) => {
    try {

        let token = req.cookies.token

        if (!token)
            return res.status(401).json({
                message: "token is not found"
            })
        let decoded = jwt.verify(token, process.env.jwt_secret_key)

        if (!decoded)
            return res.status(401).json({
                message: "token invalid"
            })
        let user = await userModel.findById(decoded.id)

        req.user =user
        next()

    } catch (error) {
        return res.status(401).json({
            message: "invalid or toke is not found ",
            error: error
        })
    }
}
module.exports = authentication