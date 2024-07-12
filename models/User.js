const { Schema, models, model } = require("mongoose");
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
});

UserSchema.pre('save', async function(){
    try{
        var user = this;
        const salt = await(bcrypt.genSalt(10));
        const hashpass = await bcrypt.hash(user.password, salt);

        user.password = hashpass;
    }catch(err){
        throw err;
    }
});

UserSchema.methods.comparePassword = async function(userPassword){
    try {
      const isMatch = await bcrypt.compare(userPassword, this.password);
      return isMatch;
    } catch (error) {
      throw error;
    }
}

const User = models?.User || model('User', UserSchema);
export default User;