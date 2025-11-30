const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Регистрация
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        user = new User({ name, email, password });
        await user.save();

        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ token });
    } catch (err) {
        res.status(500).send("Server error");
    }
};

// Логин
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        if (user.password !== password)
            return res.status(400).json({ msg: "Invalid credentials" });

        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ token });
    } catch (err) {
        res.status(500).send("Server error");
    }
};

exports.me = async (req, res) => {
    try {
        const user = await User.findById(req.user).select("-password");
        if (!user) return res.status(404).json({ msg: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).send("Server error");
    }
};
