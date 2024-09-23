import express from "express";
import bodyParser from "body-parser";
import  dotenv  from "dotenv";
import projects from '../projects.js';
import mailController from '../controller/mailController.js'; // Add .js extension for Node.js to recognize the file


const app = express();
const port = process.env.PORT || 3000;
dotenv.config();


app.set("view engine","ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let formSubmitted = false; // Initialize formSubmitted as false initially

app.get("/", async (req, res) => {
    res.render("pages/index", { projects });
  });

app.get("/download-file", (req,res)=>{
  res.download("./public/doc/Smit_Parekh_Resume.pdf")
})


// Handle POST requests to /mail
app.post('/mail', (req, res) => {
  // Your mail sending logic here
  mailController.sendMail(req, res);
  // Set the flag to true after successful form submission
  formSubmitted = true;
  // Redirect to /success after form submission
  res.redirect('/success');
});

// Protect the /success route
app.get('/success', (req, res) => {
  if (formSubmitted) {
    res.render("pages/success");
    formSubmitted = false; // Reset formSubmitted after rendering success page
  } else {
    res.status(404).render("pages/404");
  }
});


app.use((req, res, next) => {
  res.status(404).render("pages/404");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

