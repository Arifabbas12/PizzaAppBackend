const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({

    firstName : {
        type: String,
        required: [true, "First Name is required"],
        minlength: [5, "First Name must be atleast 5 characters long"],
        lowercase: true,
        trim: true,
        maxlength: [20,"First Name should be less than equal to 20 characters"]
    },

    lastName : {
        type: String,
        required: [true, "Last Name is required"],
        minlength: [5, "Last Name must be atleast 5 characters long"],
        lowercase: true,
        trim: true,
        maxlength: [20,"Last Name should be less than equa; to 20 charactors"]
    },
    
    mobileNumber: {
        type: String,
        trim: true,
        maxlength: [10, "Phone number should be of length 10"],
        minlength: [10, "Phone number should be of length 10"],
        unique: [true, "Phone Number is already in use"],
        required: [true, "Phone number should be provided"]
    },

    email: {
        type: String,
        trim: true,
        required: [true, "Email should be provided"],
        unique: [true, "Email is already in use"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    passWord: {
        type: String,
        required: [true, "PassWord should be provided"],
        minlength: [6,"PassWord should be minimum 6 character long"]
    },

    Department: {
        type: String,
        unique: [true, "Department is already in use"],
        minlength: [4, "Department should be minimum 4 characters long"]
    },

    role : {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }

}, {
    timestamps: true
});

userSchema.pre('save', async function () {
    // here you can modify your user before it is saved in mongoDB
    
    const hashPassword = await bcrypt.hash(this.passWord, 10);
    console.log(hashPassword);
    this.passWord = hashPassword;
    
    
    
});


const user = mongoose.model("user", userSchema);  // collection

module.exports = user;