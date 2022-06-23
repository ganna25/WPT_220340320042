// const cors = require('cors');
// app.use(cors());
// const bodyParser = require('body-parser');
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));
// //whether you want nested objects support  or not
// var result;

// app.post('/poc1', function (req, res) {
	
// 		console.log("reading input " + req.body.v1 +  "  second " + req.body.v2)
		
//     	var xyz ={ v1:37, v2:35};
//         res.send(xyz);
//     });
let datab={
	host:"localhost",
	user:"GaneshW",
	password:"1234",
	database:"Wptstudy",
	port:3306
};
const express = require('express');
const app = express();
const mysql=require("mysql2");
const con=mysql.createConnection(datab);
app.use(express.static('abc'));

app.get('/Blur', function (req, res) {
	let data={status:false,Bookdata:[]};
	let input=req.query.input;
	con.query("select * from book where bookid=?",[input],(err,rows)=>{

		if(err){
			console.log("Bood details not found");
		}else{
			if(rows.length>0){
				console.log("Book details found");
				data.status=true;
				data.Bookdata=rows;
				// console.log(rows[0].bookid+" "+rows[0].bookname+" "+rows[0].price);
			}
		}

		res.send(data);
	});

	});

app.get('/Update',(req,res)=>{
	// console.log("Update clicked");
	let data={status:false};
	let input={bookid:req.query.bookid,price:req.query.price};
	
	con.query("update book set price=? where bookid=?",[input.price,input.bookid],
	(err,resp)=>{
		if(err){
			console.log("Data not updated");
		}else{
			if(resp.affectedRows>0){
				console.log("Bookdetails updated");
				data.status=true;
			}
		}
		res.send(data);
	});



});


app.listen(8081, function () {
    console.log("server listening at port 8081...");
});