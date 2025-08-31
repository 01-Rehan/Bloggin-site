import exporess from "express";
import path from "path";
import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";
import ConnectDB from "./connections/Database.js";
import cookieParser from "cookie-parser";
import checkAuthCookie from "./middleware/authentication.js";
import blog from "./models/blog.model.js";

const app = exporess();
const port = 3000;
ConnectDB("mongodb://localhost:27017/blogify")
.then(() => console.log("database connected"))
.catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set('views' ,path.resolve("./views"));

app.use(exporess.urlencoded({extended:true}));
app.use(cookieParser());
app.use(checkAuthCookie("token"));
app.use(exporess.static(path.resolve("./public")));

app.get("/", async (req,res)=> {
    const allBlogs = await blog.find({}).sort({createdAt : -1}).populate("createdBy");
    res.render("home" ,{
        user : req.user,
        blogs : allBlogs
    });
})

app.use("/user",userRouter);
app.use("/blog",blogRouter)

app.listen(port, ()=> console.log("app is running at :",port));
