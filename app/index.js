/**
 * Created by Nikita on 01.10.2015.
 */
require('./main.css');
var component = require('./component');
var app = document.createElement('div');

document.body.appendChild(app);

app.appendChild(component());