require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cors = require("cors");
const bodyParser = require("body-parser");
const categoriesRoutes = require("./routes/categories");
const subCategories = require("./routes/subCategory");

// express app
const app = express();
const nodemailer = require("nodemailer");
// middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(req.path, req.url);
  next();
});

//Routes
app.use("/api/user", userRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/subCategories", subCategories);

app.post("/send-email", (req, res) => {
  const { name, message, email } = req.body;

  // Replace with your email credentials
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rawanh.abuhajer@gmail.com",
      pass: "jizt ocbb prnt xfty",
    },
  });

  const mailOptions = {
    from: `${email}`,
    to: "rawanh.abuhajer@gmail.com",
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nMessage: ${message}\nUser's Email: ${email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error sending email");
    }

    console.log("Email sent:", info.response);
    res.status(200).send("Email sent successfully");
  });
});

//connect to db
mongoose.connect(process.env.MONGO_URI).then(() => {
  //listen for requests
  app.listen(process.env.PORT, () => {
    console.log("Connect to db & listen to port", process.env.PORT);
  });
});
