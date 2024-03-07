const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const sendMail = require('./sendMail');


const app = express();

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.static('public'));

// Set EJS as view engine
app.set('view engine', 'ejs');

// Route to render index page
app.get('/', (req, res) => {
    res.render('index');
});

// Route to send email
app.post('/sendMail',upload.single('attachment'), (req, res) => {
    console.log(req.body)
    const {  to, subject, company_name } = req.body;

    if (!to) {
        return res.status(400).json({ error: 'Recipient email address is required' });
    }

    const attachment = req.file;

    // Implement your logic to send email using 'sendMail' function
    sendMail( req.body, attachment)
        .then(() => {
            res.status(200).json({ message: 'Email sent successfully' });
        })
        .catch(error => {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email. Please try again later.' });
        });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
