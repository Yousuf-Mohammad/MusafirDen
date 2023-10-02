import express from "express";
const router = express.Router();
import {
    authUser,
    regUser,
    logoutUser,
    updateUser,
    updateUserProfile,
    getUsers,
    getUserProfile,
    getUserById,
    deleteUser
} from "../controllers/userController.js"
import {protect, admin} from "../middleware/authMiddleware.js"

router.route('/').post(regUser).get(protect,admin,getUsers);
router.post('/logout',logoutUser);
router.post('/auth',authUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser);



export default router;