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

router.route('/').post(regUser).get(getUsers);
router.post('/logout',logoutUser);
router.post('/login',authUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile)
router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser);



export default router;