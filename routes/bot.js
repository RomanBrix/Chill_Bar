const router = require("express").Router();
const BotSettings = require("../models/BotSettings");
const BotUsers = require("../models/BotUsers");
const Telegraf = require("telegraf").Telegraf;
const { verifyTokenAndAuthorization } = require("./verifyToken");

// bot = new Telegraf("");

//INIT BOT
bot = null;
BotSettings.findOne({
    id: 1,
}).then((doc) => {
    if (!doc) {
        console.log("no bot api");
    } else {
        console.log("loading bot api!");
        changeToken(doc.token);
        startBot(bot);
    }
});

//bot API
router.post("/token", verifyTokenAndAuthorization, async (req, res) => {
    // console.log()

    try {
        const { token } = req.body;
        await BotSettings.deleteMany({});
        const newBot = await BotSettings.create({
            token,
        });
        // console.log(newBot);
        changeToken(newBot.token);
        startBot(bot);
        // console.log();

        return res.status(200).json(true);
    } catch (err) {
        console.log(err);
        return res.status(500).json(false);
    }
});

router.get("/token", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const botSett = await BotSettings.findOne({
            id: 1,
        }).lean();
        // console.log(botSett);
        if (botSett) {
            const data = await bot.telegram.getMe();
            return res.status(200).json({
                status: true,
                name: data.first_name,
                username: data.username,
                token: botSett.token,
            });
        } else {
            return res.status(200).json({ status: false });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.get("/users", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const users = await BotUsers.find({}).sort({ createdAt: -1 }).lean();
        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.post("/user", verifyTokenAndAuthorization, async (req, res) => {
    const { id } = req.body;

    try {
        if (!id) throw new Error("lalal");
        const chat = await bot.telegram.getChat(id);
        // console.log("chat");
        // console.log(chat);
        const name = `${chat.first_name ? chat.first_name : "Name"} ${
            chat.last_name ? chat.last_name : ""
        }`;
        const newUser = {
            username: chat.username.length > 0 ? chat.username : name,
            id: chat.id,
        };
        await BotUsers.create(newUser);
        notifyAllWithBot(
            `Пользватель "${name}" ( @${chat.username} ) добавлен для оповещения`
        );
        return res.status(200).json(true);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);

    const { id } = req.params;
    try {
        if (!id) throw new Error("lalal");
        const chat = await BotUsers.findById(id);
        await BotUsers.findByIdAndRemove(id);
        // const chat = await bot.telegram.getChat(id);
        // const name = `${chat.first_name ? chat.first_name : "Name"} ${
        //     chat.last_name ? chat.last_name : ""
        // }`;
        notifyAllWithBot(`Пользватель @${chat.username} удален!`);
        return res.status(200).json(true);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

//BOT FUNCS

async function notifyAllWithBot(text) {
    try {
        const users = await BotUsers.find({}).sort({ createdAt: -1 }).lean();
        users.forEach((user) => {
            bot.telegram.sendMessage(
                user.id,
                text,
                (parse_mode = "MarkdownV2")
            );
        });
        console.log("Сообщения отправленны!");
        return true;
    } catch (err) {
        console.log(err);
    }
}

if (bot) {
    initBotCommands();
    bot.launch();
}
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

function initBotCommands() {
    bot.hears(/id/gi, (ctx) => {
        const id = ctx.message.chat.id;
        // console.log(id);
        ctx.reply(`Ваш ID: ${id}`);
    });
}
function startBot(bot) {
    initBotCommands();
    bot.launch();
}

function stopBot(bot) {
    bot.stop();
}

function changeToken(token) {
    bot = new Telegraf(token);
}
// module.exports = router;
exports.botRoute = router;
exports.notifyAllWithBot = notifyAllWithBot;
