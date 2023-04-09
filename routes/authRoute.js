import express from "express";
import { 
    registerController,
    loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";

//router object
const router = express.Router();


//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//test routes
router.get("/test",requireSignIn,isAdmin ,testController);

//forgot password
router.post("/forgot-password", forgotPasswordController);

//protected user routes
router.get("/user-auth", requireSignIn,(req ,res) => {
    res.status(200).send({ok: true});
});
//update profile
router.put("/profile", requireSignIn, updateProfileController);


//protected admin routes
router.get("/admin-auth", requireSignIn, isAdmin, (req ,res) => {
    res.status(200).send({ok: true});
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//order
router.get("/orders", requireSignIn, getOrdersController);
//all order
router.get("/all-orders", requireSignIn,isAdmin, getAllOrdersController);

//order status update
router.put("/order-status/:orderId", requireSignIn,isAdmin, orderStatusController);


export default router;