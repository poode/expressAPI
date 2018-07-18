const  Joi =  require('joi');
const express = require('express');

const PORT = process.env.PORT || 3000;
const router = require('./router');
const template = require('./welcome');
const schema =  Joi.object().keys({
    name:Joi.string().min(3),
});

app = express();

app.use(express.json());

let courseList = [
    {id: 1, name:"First Course"},
    {id: 2, name:"Second Course"},
    {id: 3, name:"Third Course"},
    {id: 4, name:"Fourth Course"},
]

app.get('/', (req, res) => {
    res.format({
        'text/html': function(){
            res.send(template);
          },
    });
});

app.get('/api/courses', (req, res) => {
    res.send(courseList);
});

app.post('/api/courses', (req, res) => {
    const newCourse = {
        id: courseList.length + 1,
        name: req.body.name,
    }

    courseList.push(newCourse);

    res.send(newCourse);

});




app.listen(PORT, () => console.log(`Listening on port ${PORT}`));