import { User } from "../model/user.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
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
    "-password -refreshToken"
  )

  // send back a response
  if (!currentUser) {
    return res.status(500).json({ message: "User not created" });
  }

  return res.status(201).json({
    message: "User created",
    createdUser,
  })
}

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
  await user.save();
  // generate access and refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    secure: true,
    httpOnly: true,
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json({ user: loggedInUser, accessToken, refreshToken });
};

const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "Logged out successfully" });
};

const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken = req.body?.refreshToken

  console.log(incomingRefreshToken)
  if (!incomingRefreshToken) {
    return res.status(401).json({ message: "Unauthorized Access" })

  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )
    console.log(decodedToken)
    const user = await User.findById(decodedToken?._id)

    if (!user) {
      console("User not found")
      return res.status(401).json({ message: "Invalid Refresh Token" })

    }

    if (incomingRefreshToken !== user?.refreshToken) {
      console("Invalid refresh token")
      return res.status(401).json({ message: "Refresh token is expired or used" })
    }

    const options = {
      httpOnly: true,
      secure: true
    }

    const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id)

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        { accessToken, refreshToken: newRefreshToken, message: "Access token refreshed" },
      )
  } catch (error) {
    return res.status(401).json({ message: "Refresh Token Verification Error" })
  }

}

const currentUser = async (req, res) => {
  return res.status(200).json({ user: req.user });
}

export { registerUser, loginUser, logoutUser, refreshAccessToken, currentUser };
