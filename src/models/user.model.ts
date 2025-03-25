// This is the schema for our user data similar to when we define the attributes of a table in sql
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
    username : {type:String, required:true, unique: true},
    email : {type:String, required:true, unique:true},
    password : {type:String, required:true}
});

// pre activity on the password for encryption
UserSchema.pre("save",async function (next){
    if(!this.isModified("password"))return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

// compare stored hash from the entered password
UserSchema.methods.comparePassword = async function (enteredPassword:string) {
    const status = await bcrypt.compare(enteredPassword, this.password);
    return status;
}

export default model("User",UserSchema);