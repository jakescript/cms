const express = require("express");
const app = express();
const path = require("path");
const {conn, seed } = require("./db");

const adminRoutes = require("../routes/admin");

app.use(require("method-override")("_method"));
app.use(express.urlencoded({extended: false}));
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(require("morgan")("dev"));


app.use("/api", adminRoutes);
app.get("/", (req, res, next) => res.sendFile(path.join(__dirname, "../public/index.html")));

const init = async () => {
    try {
        await conn.authenticate();
        await seed();
        app.listen(process.env.PORT || 8080, () => console.log("Listening"));
    } catch (error) {
        console.log(error);
    };
};

init();
