
//setup, aka boiler code 

const express = require("express");  // Import Express framework
require("./db");                     // Import database connection (Mongoose)
const User = require("./models/Users"); // Import Mongoose User model
const app = express();                // Create Express application
const PORT = process.env.PORT || 3000; // Default to port 3000 if not specified
// Middleware to parse incoming JSON bodies
app.use(express.json());

app.post("/users", async (req, res) => {
    const { name } = req.body;
    const user = new User({ name });      // Create new user object
    await user.save();                    // Save user to MongoDB
    res.status(201).json(user);            // Respond with created user
});

app.get("/users", async (req, res) => {
    const users = await User.find();      // Find all users
    res.json(users);                      // Return users as JSON
});

app.post("/deposit", async (req, res) => {
    const { name, amount } = req.body;
    const user = await User.findOne({ name });    // Find user by name
    if (!user) return res.status(404).json({ error: "User not found" }); // Error if not found
    user.balance += amount;                      // Increase user's balance
    user.transactions.push({ type: "deposit", amount }); // Record transaction
    await user.save();                           // Save updated user to database
    res.json({ message: `Deposited $${amount}`, balance: user.balance }); // Response
});




//always have at bottom

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
