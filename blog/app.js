const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configura EJS come template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servire file statici dalla cartella public
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index'); // Usa render invece di send
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});