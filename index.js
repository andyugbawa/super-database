// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const path = require("path");
// require("dotenv").config();

// const MONGO_URI = process.env.VERCEL_ENV === 'production' 
//     ? process.env.MONGO_URI_PROD 
//     : process.env.MONGO_URI_PROD;


//     if (!MONGO_URI) {
//         console.error("❌ MongoDB URI is missing! Check your .env file.");
//         process.exit(1); 
//     }

//     console.log("✅ Using MongoDB URI:", MONGO_URI);

// mongoose.connect(MONGO_URI, { dbName: 'superDB' })
// .then(() => {
//     console.log("✅ Connected to MongoDB successfully!");
// }).catch(err => {
//     console.error("❌ MongoDB Connection Error:", err);
//     process.exit(1); 
// });

// mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));


// const superSchema = new mongoose.Schema({
//     name: { type: String, required: true },  
//     email: { type: String, required: true }
// });

// const Super = mongoose.model("Super", superSchema);





// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json()); 



// app.get("/",(req,res)=>{
//     res.render("index")
// })



// app.post("/show",async(req,res)=>{
//     const {name,email} = req.body;

//     try {
//         if (!name || !email) {
//             return res.status(400).send("⚠️ Name and email are required!");
//         }

//         const newSuper = new Super({ name, email });
//         await newSuper.save();
//         res.send("✅ Data saved successfully!");
//     } catch (err) {
//         console.error("❌ Error saving data:", err);
//         res.status(500).send("❌ Error saving data.");
//     }
// })


// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
// });







require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware setup (before routes)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Correct MongoDB connection setup
const MONGO_URI = process.env.VERCEL_ENV === 'production' 
    ? process.env.MONGO_URI_PROD 
    : process.env.MONGO_URI_PROD;

if (!MONGO_URI) {
    console.error("❌ MongoDB URI is missing! Check your .env file.");
    process.exit(1);
}

mongoose.connect(MONGO_URI, {
    dbName: "superDB",
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB successfully!"))
.catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
});

// Mongoose Schema & Model
const superSchema = new mongoose.Schema({
    name: { type: String, required: true },  
    email: { type: String, required: true }
});
const Super = mongoose.model("Super", superSchema);

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/show", async (req, res) => {
    const { name, email } = req.body;

    try {
        if (!name || !email) {
            return res.status(400).json({ error: "⚠️ Name and email are required!" });
        }

        const newSuper = new Super({ name, email });
        await newSuper.save();
        res.status(201).json({ message: "✅ Data saved successfully!" });
    } catch (err) {
        console.error("❌ Error saving data:", err);
        res.status(500).json({ error: "❌ Error saving data." });
    }
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// app.listen(4000,()=>{
//     console.log("APP LISTEN 4000")
// })