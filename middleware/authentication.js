import { validateToken } from "../utils/authentication.js";


function checkAuthCookie(cookieName){
    return (req,res,next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue)
            return next();

        try{
            const userPayload = validateToken(tokenCookieValue)
            req.user = userPayload;
            res.locals.user = userPayload;
        }catch (err) {
            res.clearCookie(cookieName);
        }
        return next();
    }
}

export default checkAuthCookie;