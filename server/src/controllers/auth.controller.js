const db = require("../DB/index");
const jwt = require("jsonwebtoken");
const { genPassword, comparePassword } = require("../utils/authUtils");

exports.createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log(req.body);
    const existingUser = await db.user.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await genPassword(password);
    const data = {
      email,
      password: hashedPassword,
      role,
    };
    const User = await db.user.create(data);
    res.status(201).json({
      data: User,
      Success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const User = await db.user.findOne({ where: { email } });

    const match = await comparePassword(password, User.password);

    if (!match) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: User.id,
          email,
          role: User.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3h",
      }
    );

    const refreshToken = jwt.sign(
      {
        id: User.id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "3h",
      }
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 3 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ Success: true, token: accessToken, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.refresh = async (req, res) => {
  try {
    const cookies = req.cookies;

    // Check if the JWT cookie exists
    if (!cookies?.jwt) {
      return res.status(401).json({ message: "Unauthorized", success: true });
    }

    const refreshToken = cookies.jwt;

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    let foundUser;

    // Determine if the user is of a specific type and find them in the database
    foundUser = await db.user.findOne({
      where: { id: decoded.id },
    });

    // If the user is not found, respond with Unauthorized
    if (!foundUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Create a new access token
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: foundUser.id,
          email: foundUser.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3h" }
    );

    res.json({ accessToken });
  } catch (err) {
    // Handle errors that occur during JWT verification or database operations
    if (err.name === "TokenExpiredError") {
      return res
        .status(403)
        .json({ message: "Token expired, please login again." });
    }
    if (err.name === "JsonWebTokenError") {
      return res
        .status(403)
        .json({ message: "Invalid token, please login again." });
    }
    // Handle other errors
    return res.status(500).json({ message: "Internal server error." });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.user.findAll();
    res.status(200).json({ data: users, Success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id, newEmail, newPassword } = req.body;

    const user = await db.user.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (newEmail) {
      user.email = newEmail;
    }

    if (newPassword) {
      user.password = await genPassword(newPassword);
    }
    await user.save();
    res
      .status(200)
      .json({ Success: true, message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await db.user.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res
      .status(200)
      .json({ Success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
