const  Joi =  require('joi');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const router = require('./router');
const template = require('./welcome');
const schema =  Joi.object().keys({
    name:Joi.string().min(3),
});

app = express();

app.use(bodyParser.json());


const courseList = [
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

app.param('courseId', (req, res, next, id) => {
    const courseId = Number(id);
    courseIndex = courseList.findIndex(course => course.id === courseId);
    if(courseIndex !== -1) {
        req.courseIndex = courseIndex;
        next();
    }
    else {
        res.status(404).send();
    }
});


app.get('/api/courses/:courseId', (req, res, next) => {
    res.status(200).send(courseList[req.courseIndex]);
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