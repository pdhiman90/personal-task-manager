import User from "../models/user.model";



class AuthService {
    registerUser = async (payload:any) => {
        const user = new User({ username: payload.username, email: payload.email, password: payload.password });
        const response = await user.save(); //responseawait user.save();
         console.log(response);
         if(!response){
            return false;
         }
        return response;
    }

    loginUser = async (payload:any) => {
        const user = await User.findOne({ email: payload.email });
        if (!user) {
          return null;
        }
        const isPasswordValid = await user.comparePassword(payload.password);
        if (!isPasswordValid) {
          return null;
        }
        return user;
      };
   
      findUser = async (payload:any) => {
        const user = await User.findOne({ email: payload.email });
        if (!user) {
          return null;
        }
        return user;
      };
    
    
};

export default AuthService;



