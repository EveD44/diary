import express from "express";
import bodyParser from "body-parser";
import  entries_data from './diary-entries.json'  with { type: "json" };

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let entry_data;
//console.log(entries_data[1]);

app.get("/", (req, res) => {
  res.render("index.ejs", { 
    username: "Eve" });
    //console.log(entries_data);
});

app.get("/view-posts", (req, res) => {
    res.render("index.ejs", { 
      entry: entries_data, 
      username: "Eve" });
      console.log(entry);
  });

app.get("/new-post", (req, res) => {
    res.render("add-post.ejs");
})




app.listen(port, () => {
  console.log(`Server running on port: ${port}`); 
});

