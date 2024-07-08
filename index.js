// const { exec } = require("child_process");
// const isPortReachable = require('is-port-reachable');

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const authRoute = require("./routes/auth");
const { ordersRoute, getOrder } = require("./routes/orders");
const userRoute = require("./routes/users");
const { NpRoute } = require("./routes/np");
const { botRoute } = require("./routes/bot");
const productsRoute = require("./routes/products");
const { PayRoute, changePayStatus } = require("./routes/pay");
const SocketServer = require("socket.io").Server;
// console.log(botRoute);
// const filtersRoute = require("./routes/filters");
// const checkRoute = require("./routes/check");

// const axios = require("axios");
// const CryptoJS = require("crypto-js");
// const fs = require('fs')

//modelsControl

//const axios = require("axios");

dotenv.config();

// const DEV = process.env.PROJECT_STATUS === "develop";
// console.log(DEV);

const PORT = process.env.SERVER_PORT || 3000;
const CLIENT_CORS_URL = process.env.CLIENT_CORS_URL || "*";
const CLIENT_CORS_METHODS = process.env.CLIENT_CORS_METHODS || "GET,POST";
//app.set("trust proxy", true);
console.log(CLIENT_CORS_METHODS);

//"https://chillbar.com.ua"
var corsOptions = {
    origin: "*",
    methods: CLIENT_CORS_METHODS,
};

// const corsDelegate = (req, callback) => {
//     console.log(req.header("Origin"));
//     callback(null, { origin: true });
// };
app.use(cors(corsOptions));
app.use(express.json());

const server = http.createServer(app);

const io = new SocketServer(server, {
    cors: {
        origin: CLIENT_CORS_URL,
        methods: ["GET", "POST"],
    },
});

mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connected!"))
    .catch((err) => {
        console.log(err);
    });

app.get("/", (req, res) => {
    res.status(200).send("ok");
});
app.get("/images/:file", function (req, res) {
    // console.log(req.params);
    const { file } = req.params;
    console.log(file);

    res.sendFile(__dirname + `/images/${file}`);
});

app.post("/pay-status", async (req, res) => {
    console.log("PAY DATA POST:");
    // console.log(req.params);
    // console.log(req.query);
    console.log(req.body);
    await changePayStatus(req.body, io);
    res.send("MOSKALI SOSAT`");
});

app.use("/api/auth", authRoute);
app.use("/api/order", ordersRoute);
app.use("/api/user", userRoute);
app.use("/api/np", NpRoute);
app.use("/api/bot", botRoute);
app.use("/api/products", productsRoute);
app.use("/api/pay", PayRoute);

io.on("connection", (socket) => {
    // console.log("connected");
    socket.on("join room", async (id) => {
        socket.join(id);
        console.log(id);
        // socket.emit("connected room");
        const order = await getOrder(id);
        // console.log(order);

        io.to(id).emit("order", order);
        // console.log("ok globe!");
    });
});

/*
file upload 
app.use(express.json({limit: '90mb'}));
app.use(fileUpload());  = npm
router.post("/new", verifyAdmin, async (req, res) => {
   
    const  { image } = req.files;
    let  { product }  = req.body;
    console.log()
    if(image){
        product = JSON.parse(product);
    if (!(/^image/.test(image.mimetype))) return res.sendStatus(400);
        image.mv(pathToPublicProducts + image.name);
        product.image = image.name;
    }
    console.log(product)
    const prod = await addProduct(product)
    
    
    res.status(200).json(prod);
});
*/

// app.post("/", async (req, res) => {
//     console.log("POOOOOOOST");
//     console.log("req.params");
//     console.log(req.params);

//     console.log("req.query");
//     console.log(req.query);

//     console.log("req.body");
//     console.log(req.body);
// });

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

server.listen(PORT, () => {
    console.log("Backend server is running! port:  *:" + PORT);
    // exec(`start http://localhost:${PORT}`);
});
