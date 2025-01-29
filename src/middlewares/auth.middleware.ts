import Jwt from "jsonwebtoken";
import { HTTPStatusCodes } from "@bizcuit/httpstatuscodes";
// import User from "../models/user.model";



const verifyToken = async (req: any, res: any, next: any) => {
    try {
        const bearerHeader = req.headers['authorization'];
        
        if (!bearerHeader) {
            return res.status(HTTPStatusCodes.UNAUTHORIZED).json({ 
                status: false, 
                message: "Authorization header missing" 
            });
        }

        const [bearer, token] = bearerHeader.split(" ");
        
        if (bearer !== 'Bearer' || !token) {
            return res.status(HTTPStatusCodes.UNAUTHORIZED).json({ 
                status: false, 
                message: "Invalid token format" 
            });
        }

        req.token = token;

        // Verify the token
        Jwt.verify(token, "secretkey", async (err: any, authdata: any) => {
            if (err) {
                return res.status(HTTPStatusCodes.FORBIDDEN).json({ 
                    status: false, 
                    message: "Invalid token" 
                });
            }
            // Set user data from token
           
            req.id = authdata.id;
            req.logedInUseremail = authdata.email;
          
            next();
        });

    } catch (error: any) {
        return res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: "Error occurred while verifying the token"
        });
    }
};


export default verifyToken;