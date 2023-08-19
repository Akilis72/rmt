import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import {v4 as uuidv4} from "uuid";
import bcrypt from "bcrypt";
const app = express();

app.use(cors()); //WHAT IS THIS
app.use(express.json()); //WHAT IS THIS
const api_key = "vkxvnn24rxs7";
const api_secret = "gezzxrfsgjh64nwvf4yenn4fnhz44zvr76th87k3x2gvn5dzyjmvapc8pz344c5b";
const serverClient = new StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async(req, res) => {
    try{
        const {firstName, lastName, username, password} = req.body;
        const userId = uuidv4(); //ID generator
        const hashedPassword = bcrypt.hash(password, 10);
        const token = serverClient.createToken(userId);
        res.json({token, userId, firstName, lastName, username, hashedPassword });
    }
    catch (error) {
        res.json(error);
    }
});

app.post("/login");

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});