const jwt = require("jsonwebtoken");

const login = async (req, res) => {

  const { email, password } = req.body;

  if (
    email === "harsha@gmail.com" &&
    password === "123456"
  ) {

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET || "SECRET_KEY",
      { expiresIn: "1d" }
    );

    return res.json({
      token,
    });
  }

  return res.status(401).json({
    message: "Invalid credentials",
  });
};

module.exports = {
  login,
};