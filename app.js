const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// app.get('/',(req,res)=>{
//     res.status(200).json({message:'Hello from server',app:'Natours'});
// });


// app.post('/',(req,res)=>{
//     res.status(200).send('you can now post on this endpoint...');
// });

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

app.get('/api/v1/tours',(req,res)=>{
    res.status(200).json({
        status:'success',
        results:tours.length,
        data:{
            tours
        }
    });
    
});

app.get('/api/v1/tours/:id',(req,res)=>{
    const id = req.params.id*1;
    const tour = tours.find(el=>el.id===id);
    if(!tour){
        res.status(404).json({
            'status':'fail',
            'message':'Invalid ID'
        });
    }
    res.status(200).json({
        status:'success',
        results:tour.length,
        data:{
            tour 
        }
    });
    
});

app.post('/api/v1/tours',(req,res)=>{
    console.log(req.body);
    const newID = tours[tours.length-1].id+1;
    const newTour = Object.assign({id:newID},req.body);
    tours.push(newTour);

    fs.writeFile('./dev-data/data/tours-simple.json',JSON.stringify(tours),error=>{
        res.status('201').json({
            status:'success',
            data:{
                tour:newTour 
            }
        });
    });

});

const port = 3000;

app.listen(port,()=>{
    console.log(`App runding on port ${port}...`);
});