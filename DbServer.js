const express = require("express")
const app = express()
const bodyParser = require("body-parser");
const fs = require("node:fs");

app.use(bodyParser.json());

app.post('/add', (req,res)=>{
	const projectName = req.body.projectName;
	const projectDescription = req.body.projectDescription
	
	const db = require('./db.json')
	const id = db[db.length-1].id+1;
	db.push(
		{
			id:id,
			name:projectName,
			desc:projectDescription
		}
	);

	console.log(db);
	fs.writeFile('db.json', JSON.stringify(db), function (err) {
  		console.log(err);
	});
	res.sendStatus(200)
})

app.get('/projects', (req,res)=>{
	const db = require('./db.json')
	res.send(200,db)
})

app.delete('/remove', (req,res)=>{
	const db = require('./db.json')
	for(let i=0;i<db.length;i++){
		if(db[i].id==req.body.id){
			db.splice(i, 1);
		}
	}
})

app.listen(94)
