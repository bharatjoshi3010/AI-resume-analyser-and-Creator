const {Router} = require('express')   //we requiring router by destructuring it
const authController = require("../controllers/auth.controller")

const authRouter = Router()


//these are js doc comments, it hepls to create documantation for the routes and functions (when you hover over this route anywhere in this code base you get all these info there)
/**
 * @route POST /api/auth/register
 * @description  Register a new user
 * @access Public
 */

authRouter.post("/register", authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @description  login user with email and password
 * @access Public
 */
authRouter.post("/login", authController.loginUserController)

module.exports = authRouter