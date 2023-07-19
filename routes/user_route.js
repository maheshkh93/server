import { Router } from "express";
import jwt from "jsonwebtoken";
import { encryptString } from "../utils/utilities.js";
import User from "../models/user_schema.js";

const userRoutes = Router();

//loging in User
userRoutes.get("/user/login", async (req, res) => {
  const email = req.query.email;
  const password = encryptString(req.query.password);

  const matching = await User.find({ email, password });

  const isAuthenticated = matching && matching.length > 0;

  let token = "";
  if (isAuthenticated) {
    token = jwt.sign(
      {
        data: req.query.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
  }
  let responseObj = {
    result: isAuthenticated,
    token: token,
  };

  return res.json(responseObj);
});

//creating new User
userRoutes.post("/user/signup", async (req, res) => {
  const email = req.body.email;
  const matching = await User.findOne({ email });

  const isPresent = matching && matching.length > 0;
  if (isPresent == true) {
    return res.json({
      result: false,
    });
  } else {
    let obj = req.body;
    obj.password = encryptString(obj.password);

    await User.create(obj);

    return res.json({
      result: true,
    });
  }
});

//update password through otp
userRoutes.put("/user/forgot-pssword", async (req, res) => {});

export default userRoutes;
