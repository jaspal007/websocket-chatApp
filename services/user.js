const { default: User } = require("../models/User");

class userService{
    static async checkUser(key){
        try {
            return await User.findOne({key});
        } catch (error) {
            console.log(error);
        }finally{
            return false;
        }
    }
}

export default userService;