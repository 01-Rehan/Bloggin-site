import express from "express";
import multer from "multer";
import path from "path";
import blog from "../models/blog.model.js";
import user from "../models/users.model.js";


const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage })

router.get("/add-new",(req,res) => {
    res.render("addBlog",{
        user : req.user
    });
});

router.get("/:id", async (req,res) => {
    const Blog = await blog.findById(req.params.id).populate("createdBy");
    res.render("blogPage",{
        user : req.user,
        blog : Blog
    });
})

router.post("/",upload.single("coverImage") , async (req,res) => {
    const {title,body} = req.body;
    const Blog = await blog.create({
        title,
        body,
        createdBy : req.user._id,
        coverImage : `/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${Blog._id}`); 
})

export default router;