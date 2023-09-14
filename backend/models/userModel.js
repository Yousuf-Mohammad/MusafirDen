import mongoose  from "mongoose";


const userSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    email: {
        type: String,
        // required:  [true, "Email required"],
        unique: true 
    },
    passwoed: {
        type: String,
    //     required: [true, "required"],
    },
    isAdmin:{
        type:Boolean,
        // required:[true, "required"],
        default:false,
    }

},{
    timestamps: true,
});

const User = mongoose.model("User",userSchema);

export default User