import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

//@desc Auth user & get the token 
//@route POST /api/users/login
//@access Public

const authUser = asyncHandler(async (req, res) =>{
    const{email , password} = await req.body;
    const user = await User.findOne({email});
    
    if(user && (await user.matchPassword(password))){
        res.json({
            
            _id: user._id,
            name: user.name,
            email:user.email,
            isAdmin:user.isAdmin,

        })
    }else{
        res.status (401);
        throw new Error('Invalid email or password')
    }
});
//@desc Regis user & get the token 
//@route POST /api/users
//@access Public

const regUser = asyncHandler(async (req, res) =>{
   res.send('register  user')
});
//@desc logout user & clear the cookie   
//@route POST /api/users/logout
//@access Private

const logoutUser = asyncHandler(async (req, res) =>{
    res.send('logout   user')
});
//@desc get user profile 
//@route GET /api/users/profile
//@access Private

const getUserProfile = asyncHandler(async (req, res) =>{
    res.send('user profile')
});
//@desc Update user profile 
//@route PUT /api/users/profile
//@access Private

const updateUserProfile = asyncHandler(async (req, res) =>{
    res.send('update user profile')
});
//@desc get all user profile 
//@route PUT /api/users
//@access Private/admin

const getUsers= asyncHandler(async (req, res) =>{
    res.send('get all users')
});
//@desc delete users
//@route DELETE /api/users/:id
//@access Private/admin

const deleteUser= asyncHandler(async (req, res) =>{
    res.send('delete user')
});
//@desc Get user by Id
//@route GET /api/users/:id
//@access Private/admin

const getUserById = asyncHandler(async (req, res) =>{
    res.send('get user by id ')
});

//@desc update user by admin 
//@route PUT /api/users/:id
//@access Private/admin

const updateUser = asyncHandler(async (req, res) =>{
    res.send('updating user by admin  ')
});

export {
    authUser,
    regUser,
    logoutUser,
    updateUser,
    updateUserProfile,
    getUsers,
    getUserProfile,
    getUserById,
    deleteUser

}


