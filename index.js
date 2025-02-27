const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

mongoose.connect("mongodb://127.0.0.1:27017/superDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


const superSchema = new mongoose.Schema({
    name: { type: String, required: true },  
    email: { type: String, required: true }
});

const Super = mongoose.model("Super", superSchema);





app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 



app.get("/",(req,res)=>{
    res.render("index")
})



app.post("/show",async(req,res)=>{
    const {name,email} = req.body;

    try {
        if (!name || !email) {
            return res.status(400).send("⚠️ Name and email are required!");
        }

        const newSuper = new Super({ name, email });
        await newSuper.save();
        res.send("✅ Data saved successfully!");
    } catch (err) {
        console.error("❌ Error saving data:", err);
        res.status(500).send("❌ Error saving data.");
    }
})


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// app.listen(4000,()=>{
//     console.log("APP LISTEN 4000")
// })