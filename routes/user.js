import express from "express";
import user from "../models/users.model.js";

const router = express.Router();

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await user.create({
    fullName,
    email,
    password,
  });
  res.redirect("/");
});
router.post("/signin",async (req,res) => {
  const {email,password} = req.body;
  try{
    const token = await user.matchPasswordAndGenerateToken(email,password);
    return res.cookie("token",token).redirect("/");
  } catch (err) {
    return res.render("signin",{
      error : "incorrect password or email"
    });
  }

})
router.get("/logout" ,(req,res) => {
  res.clearCookie("token").redirect("/");
})

export default router;
