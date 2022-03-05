const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const path = require('path');

app.use(cors())

app.use(express.static('public'));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get("/api/test", (req, res) => {
    res.json({ msg: 'idstudio api is working!!!' })
})

app.post("/api/contact", (req, res) => {
    var body = req.body;
    const ORG_EMAIL = "idstudio360@gmail.com";
    console.log("\n  \n  ~🚀 app.post \n  ~🚀 body", body)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: ORG_EMAIL,
            pass: 'darsh9080'
        }
    });

    var mailOptions = {
        from: body.email,
        to: ORG_EMAIL,
        subject: body.subject,
        html: `<b>Name:</b>${body.username}<br/> 
               <b>Email:</b>${body.email}<br/>
               <b>Mobile:</b>${body.mobile}<br/>
               <b>Message:</b>${body.msg}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("error", error);
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ msg: "Email sent successfully!!!" })
        }
    });

})


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})




app.listen(PORT, () => {
    console.log(`App is running on port no ${PORT}`)
})