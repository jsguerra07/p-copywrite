const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"))
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });


app.get("/home", (req, res) => {
    const text = req.query.text
    console.log(text)
    if(text) {
        var reverseString = function (text) {
            //ws = without Space
            let ws = (s) => s.split(" ").join("")

            let textws = ws(text)
            let reverseText = text.split("").reverse().join("")
            let reverseTextws = ws(reverseText)

            if (textws === reverseTextws) {
                return { text: reverseText, palindrome: "true" };
            } else {
                return { text: reverseText, palindrome: "false" }
            }    
        }
        res.status(200).send(reverseString(text))
    } else {
        res.status(400).json({error: "no text"})
    }    
})



app.listen(3001, () => {
    console.log("listen on port 3001")
})