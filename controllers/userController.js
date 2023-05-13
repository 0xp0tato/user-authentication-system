import UserModel from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/emailConfig.js";

async function userRegistration(req, res) {
  const { name, email, password, confirm_password, tc } = req.body;

  const user = await UserModel.findOne({ email: email });
  if (user) {
    res.status(201).send({ status: "failed", message: "Email already exists" });
  } else {
    if (name && email && password && confirm_password && tc) {
      if (password === confirm_password) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            tc,
          });
          await newUser.save();

          //Generate JWT Token
          const createdUser = await UserModel.findOne({ email: email });
          const token = jwt.sign(
            { userID: createdUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );

          res.send({
            status: "success",
            message: "User Registered Successfully",
            token: token,
          });
        } catch (error) {
          res.send({
            status: "failed",
            message: "Unable to register",
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "Password and Confirm password does not match",
        });
      }
    } else {
      res.send({ status: "failed", message: "All feilds are required" });
    }
  }
}

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );
          res.send({
            status: "success",
            message: "Successfully Logged In",
            token: token,
          });
        } else {
          res.send({
            status: "failed",
            message: "Invalid Credentials",
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "Not a Registered User",
        });
      }
    } else {
      res.send({
        status: "failed",
        message: "All fields are required",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function changeUserPassword(req, res) {
  const { password, confirm_password } = req.body;
  if (password && confirm_password) {
    if (password === confirm_password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await UserModel.findByIdAndUpdate(req.user._id, {
        $set: { password: hashedPassword },
      });
      res.send({
        status: "success",
        message: "Password changed Successfully",
      });
    } else {
      res.send({
        status: "failed",
        message: "Passwords do not match",
      });
    }
  } else {
    res.send({
      status: "failed",
      message: "All fields are required",
    });
  }
}

async function loggedUser(req, res) {
  res.send({ user: req.user });
}

async function sendUserPasswordResetEmail(req, res) {
  const { email } = req.body;
  if (email) {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const secret = user._id + process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ userID: user._id }, secret, {
        expiresIn: "15m",
      });
      const link = `http://localhost:3000/api/user/rest/${user._id}/${token}`;
      console.log(link);
      let info = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Password Reset Link",
        html: `<a href=${link}>Click Here</a> to Reset Password`,
      });
      res.send({
        status: "Success",
        message: "Password Reset Email Sent",
        info: info,
      });
    } else {
      res.send({
        status: "failed",
        message: "Email does not exists",
      });
    }
  } else {
    res.send({
      status: "failed",
      message: "No Email provided",
    });
  }
}

async function userPasswordReset(req, res) {
  const { password, confirm_password } = req.body;
  const { id, token } = req.params;

  const user = await UserModel.findById(id);

  const new_secret = user._id + process.env.JWT_SECRET_KEY;

  try {
    jwt.verify(token, new_secret);
    if (password && confirm_password) {
      if (password === confirm_password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await UserModel.findByIdAndUpdate(user._id, {
          $set: { password: hashedPassword },
        });
        res.send({
          status: "success",
          message: "Password Reset Successfully",
        });
      } else {
        res.send({
          status: "failed",
          message: "Passwords do not match",
        });
      }
    } else {
      res.send({
        status: "failed",
        message: "Password and Confirm Password does not match",
      });
    }
  } catch (error) {
    res.send({
      status: "failed",
      message: "Invalid Token",
    });
  }
}

export {
  userRegistration,
  userLogin,
  changeUserPassword,
  loggedUser,
  sendUserPasswordResetEmail,
  userPasswordReset,
};
