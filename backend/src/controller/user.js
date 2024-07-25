import { User } from "../model/user.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();

    return { accessToken };
  } catch (error) {
    return error;
  }
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // check if all fields are filled
  if ([username, email, password].some((field) => field?.trim() === "")) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check if user already exists
  const duplicate = await User.findOne({ email });
  if (duplicate) {
    return res.status(409).json({ message: "User already exists" });
  }

  // create new user
  const userObject = { username: username, email: email, password: password };
  const user = await User.create(userObject);

  const createdUser = await User.findById(user._id).select(
    "-password "
  );

  // check if user was created
  if (!currentUser) {
    return res.status(500).json({ message: "User not created" });
  }

  // send response
  return res.status(201).json({
    message: "User created",
    createdUser,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // check if all fields are filled
  if (email == "" || password == "") {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // check if password is correct
  const validPassword = await user.isValidPassword(password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // set the status to online
  user.status = "online";
  await user.save({ validateBeforeSave: false });

  // generate access
  const { accessToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password "
  );

  const options = {
    secure: true,
    httpOnly: true,
  };

  // set the access  in the response
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json({ user: loggedInUser, accessToken});
};

const logoutUser = async (req, res) => {
  console.log()
  const resp = await User.findByIdAndUpdate(
    req.body.userId,
    {
      $set: {
        status: "offline", // set the status to offline
      },
    },
    {
      new: true,
    }
  );
 console.log(resp);
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json({ message: "Logged out successfully" });
};

const currentUser = async (req, res) => {
  return res.status(200).json({ user: req.user });
};

export { registerUser, loginUser, logoutUser, currentUser };
