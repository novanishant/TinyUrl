const PORT = 6000;
const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
connectToMongoDB("mongodb://localhost:27017/tiny-url").then(() =>
  console.log("mongodbConnected successfully")
);
const app = express();

app.use(express.json());
connectToMongoDB;
app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectURL);
});
app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
