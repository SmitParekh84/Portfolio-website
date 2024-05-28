import express from "express";
import bodyParser from "body-parser";
import  dotenv  from "dotenv";

import mailController from './controller/mailController.js'; // Add .js extension for Node.js to recognize the file


const app = express();
const port = 3000;
dotenv.config();


app.set("view engine","ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())

app.get("/", async (req, res) => {
    res.render("pages/index");
  });

app.get("/download-file", (req,res)=>{
  res.download("./public/doc/Smit_Parekh_Resume.pdf")
})
// Handle POST requests to /mail

app.post('/mail', mailController.sendMail);

app.get('/success', (req, res) => {
  res.render("pages/success");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });