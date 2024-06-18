import express from "express";
import bodyParser from "body-parser";
import  entries_data from './diary-entries.json'  with { type: "json" };
import * as fs from "fs";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Add Entry
function addEntry(inputTitle, inputContent, inputImage) {

    const d = new Date();
    const newID = (entries_data[entries_data.length - 1].id) + 1;

    var entry = {
        id: newID,
        title: inputTitle,
        content: inputContent,
        image: inputImage,
        date: {
            year: d.getFullYear(),
            month: d.getMonth(), 
            day: d.getDay()
        }
    }

    // Adding new data to entries object 
    entries_data.push(entry);

    // Writing to a file 
    fs.writeFile(
        "diary-entries.json",
        JSON.stringify(entries_data),
        err => {
            // Checking for errors 
            if (err) throw err;

            // Success 
            console.log("Done writing");
        }); 
}


let entry_data;
let entry;

app.get("/", (req, res) => {
  res.render("index.ejs", { 
    username: "Eve" });
});

// Connect to weather API 
app.get("/view-posts", async (req, res) => {
    res.render("index.ejs", { 
        entry: entries_data, 
        username: "Eve"
    })
});

app.get("/add-post", async (req, res) => {
    try {
        // const response = await axios.get("http://dataservice.accuweather.com/forecasts/v1/daily/1day/328328?apikey=nGHMG1Kk32ed9149Q6f5LTLQuu2m7AqT");
        //console.log(response.data.DailyForecasts[0].Day.Icon);
        res.render("add-post.ejs", { 
           activity: 1
            //activity: response.data
        })
    } catch(error) {
        console.error("Failed to make request:", error.message);
        res.render("add-post.ejs", { 
            activity: 45
        })
    }
    res.render("add-post.ejs");
})

app.get("/success", (req, res) => {
    res.render("add-post.ejs", {message: "NEW DIARY ENTRY CREATED!"})
})



app.post("/submit", (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let image = req.body.weathericon;
    console.log(image);
    addEntry(title, content, image);
    res.redirect("/success")
})


app.listen(port, () => {
  console.log(`Server running on port: ${port}`); 
});

