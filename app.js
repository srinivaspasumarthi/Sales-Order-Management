console.log('This is node app.js');
var express= require("express");
var bodyParser = require("body-parser"); //to pull data
var app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// parse various different custom JSON types as JSON
// app.use(bodyParser.json({ type: 'application/*+json' }))
 
// parse some custom thing into a Buffer
// app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
 
// // parse an HTML body into a string
// app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Mysql Database connection
var mysql = require("mysql");
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'online_crud'
  });

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });

//To create a service on port 9999
app.listen("9999", function(error){
    if(error){
        console.log(error);
    }
    else{
        console.log('Port working on 9999');
    }
})
//middleware to check the URL values
//If below function doesn't return 
//anything then code won't progress
app.use( function(req, res , next){
    console.log('token checking');
    next(); //this tells code to progress to next
})
//API
//To create POST service with some URL
//http://localhost:9999/crud/user/create
app.post("/crud/user/create" , function(req, res){
    console.log('In post printing req');
    console.log(req.headers);
    console.log('In post printing req.body');
    console.log(req.body);
    console.log('In post before');

	
    var name= req.body.name || null;
    var email= req.body.email || null;
    var phone= req.body.phone || null;
    var username= req.body.username || null;
    var password= req.body.password || null;
  
    var data={
        name:name,
        email:email,
        phone:phone,
        username:username,
        password:password
    }
    console.log(data);
   // res.send('successfully created account');
    var query = connection.query('INSERT INTO user SET ?', data, function (error, results, fields) {
      if (error) {throw error}
      else {
          res.json({
              status:200,
              message:'successfully created user account',
              userid:'78787878'
          })
      };
      // Neat!
    });
    console.log(query.sql);
});

//http://localhost:9999/crud/user/viewall
app.get("/crud/user/viewall" , function(req, res){
   // res.send('successfully retrieved users');
   // res.send("{name:Srinivas, age: 30}");
   var name=req.query.name;
   console.log('Paased param name is: '+ name)
   if(name=='' || name == undefined || name ==null)
   {
    var sql    = 'SELECT * FROM user ';
   }
   else{
    var sql    = 'SELECT * FROM user where name= "' + name +'"'  ;
   }
   console.log('sql is: '+ sql)
   connection.query(sql, function (error, results, fields) {
    if (error) {throw error;}
    else {
        res.json({
            status:200,
            data: results 
        })
    }
    // ...
  });
   });

//http://localhost:9999/crud/user/edit
   app.post("/crud/user/edit" , function(req, res){
    res.send('edit record');
   // res.send("{name:Srinivas, age: 30}");
 
   });

//http://localhost:9999/crud/user/login
app.post("/crud/user/login" , function(req, res){
    var username=req.body.username;
    var password=req.body.password;
    console.log('Paased param name is: '+ username)
    var sql    = 'SELECT * FROM user where username= "' + username +'" and password = "'+ password +'"';
    console.log('sql is: '+ sql)
    connection.query(sql, function (error, results, fields) {
     if (error) {throw error;}
     else {
         if(results.length >= 1){
             var response =1;
         } else {
             var response=0;
         }
         res.json({
             status:200,
             data: results ,
             response : response
         })
     }
     // ...
   });
    
    //res.send('user login');
   
   });

//http://localhost:9999/crud/user/view
app.get("/crud/user/view" , function(req, res){
    res.send('user view');
   });

//http://localhost:9999/crud/user/delete
app.get("/crud/user/delete" , function(req, res){
    res.send('user delete');
   });
   
//To create POST service with some URL
//http://localhost:9999/crud/order/header/create
app.post("/crud/order/header/create" , function(req, res){
    console.log('In post headers req');
    console.log(req.headers);
    console.log('In post headers req.body');
    console.log(req.body);
    console.log('In post before');

    var orderNumber= req.body.order_number || null;
    var custName= req.body.cust_name || null;
    var custAddress= req.body.cust_address || null;
    var paymentType= req.body.payment_type || null;
    var custType= req.body.cust_type || null;
    var orderTotal= req.body.order_total || null;
    var header_id = req.body.header_id || null ;

    var data={
        header_id : header_id ,
        order_number:orderNumber,
        cust_name:custName,
        cust_address:custAddress,
        payment_type:paymentType,
        cust_type:custType,
        order_otal:orderTotal
    }
    console.log(data);
   // res.send('successfully created account');
    var query = connection.query('INSERT INTO order_headers SET ?', data, function (error, results, fields) {
      if (error) {throw error}
      else {
          res.json({
              status:200,
              message:'successfully created order Header',
              userid:'78787878'
          })
      };
      // Neat!
    });
    console.log(query.sql);
});

//http://localhost:9999/crud/update/header
app.post("/crud/update/header" , function(req, res){
    var cust_name=req.body.cust_name;
    var cust_address=req.body.cust_address;
	var cust_type=req.body.cust_type;
    var payment_type=req.body.payment_type;
	var order_number=req.body.order_number;
    console.log(req.body);
    var sql    = 'update order_headers set cust_name ="'+ cust_name +'", cust_address ="'+ cust_address +'", cust_type ="'+ cust_type +'", payment_type ="'+ payment_type +'" where order_number='+order_number;
    console.log('sql is: '+ sql)
    connection.query(sql, function (error, results, fields) {
     if (error) {throw error;}
     else {
         if(results.length >= 1){
             var response =1;
         } else {
             var response=0;
         }
         res.json({
             status:200,
             data: results ,
             response : response
         })
     }
     // ...
   });
    
    //res.send('user login');
   
   });
//http://localhost:9999/crud/header/maxordernumber
app.get("/crud/header/maxordernumber" , function(req, res){
   // res.send('successfully retrieved users');
   // res.send("{name:Srinivas, age: 30}");
   var sql    = 'SELECT nvl(max(order_number),0) AS max_order_number FROM order_headers';
   
   console.log('sql is: '+ sql)
   connection.query(sql, function (error, results, fields) {
    if (error) {throw error;}
    else {
        res.json({
            status:200,
            data: results 
        })
    }
    // ...
  });
 });
 
 //http://localhost:9999/crud/get/headers
app.get("/crud/get/headers" , function(req, res){
   // res.send('successfully retrieved users');
   // res.send("{name:Srinivas, age: 30}");
   var sql    = 'SELECT oh.order_number , oh.cust_name , ol.line_number , ol.item_name ,  ol.quantity , oh.order_otal FROM order_headers oh LEFT JOIN order_lines ol on oh.order_number=ol.order_number';
   console.log('sql is: '+ sql)
   connection.query(sql, function (error, results, fields) {
    if (error) {throw error;}
    else {
        res.json({
            status:200,
            data: results 
        })
    }
    // ...
  });
 });
 
 //http://localhost:9999/crud/header/getheader
 app.get("/crud/get/header" , function(req, res){
   // res.send('successfully retrieved users');
   // res.send("{name:Srinivas, age: 30}");
   console.log(req.query);
   console.log(req.query.id);
   var id=req.query.id;
   var sql    = 'SELECT order_number , cust_name , cust_address , payment_type , cust_type ,order_otal FROM order_headers where order_number='+id;
   console.log('sql is: '+ sql);
   connection.query(sql, function (error, results, fields) {
    if (error) {throw error;}
    else {
        res.json({
            status:200,
            data: results 
        })
    }
    // ...
  });
 });
 
//To create POST service with some URL
//http://localhost:9999/crud/order/lines/create
app.post("/crud/order/lines/create" , function(req, res){
    console.log('In post line create req');
    console.log(req.headers);
    console.log('In post lines req.body');
    console.log(req.body);
    console.log('In post before');
   var jsondata=req.body;
   var values=[];

   for(var i=0 ; i < jsondata.length ; i++)
   {
       values.push([jsondata[i].linenum, jsondata[i].itemname , jsondata[i].quantity , jsondata[i].warehouse , jsondata[i].custname , jsondata[i].ordernumber]);
   }
   console.log(values);
    var query = connection.query('INSERT INTO order_lines ( line_number, item_name, quantity, warehouse, cust_name, order_number ) values ?', [values], function (error, results, fields) {
      if (error) {throw error}
      else {
          res.json({
              status:200,
              message:'successfully created order Header',
              userid:'78787878'
          })
      };
      // Neat!
    });
	
    console.log(query.sql);
});

//http://localhost:9999/crud/update/line
app.post("/crud/update/line" , function(req, res){
    console.log('In put line update req.headers');
   // console.log(req.headers);
    console.log('In put line req.body');
    console.log(req.body);
    console.log('In put before');
   var jsondata=req.body;
   var values=[];
   var sql="";
   var sql1;

  /* for(var i=0 ; i < jsondata.length ; i++)
   {
       values.push([ jsondata[i].itemname , jsondata[i].quantity , jsondata[i].warehouse  , jsondata[i].ordernumber , jsondata[i].line_number ]) ;
   }
   console.log(values);
   jsondata.forEach(function (item )
   {
       
      // sql1.format("update order_lines set item_name = ? , quantity = ? , warehouse = ? , price = ?  WHERE order_number = ?; ", item);
      sql1    = 'update order_lines set item_name ="'+ item.item_name +'", quantity ='+ item.quantity +', warehouse ="'+ item.warehouse +'" where order_number='+item.order_number +' and line_number= '+ item.line_number +'; ';
       sql=sql + sql1 ; 
       
   }
   );
    console.log('sql is: '+ sql);*/
   // var query = connection.query('INSERT INTO order_lines ( line_number, item_name, quantity, warehouse, cust_name, order_number ) values ?', [values], function (error, results, fields) {
      // Neat!
     // sql ='UPDATE order_lines set item_name = ? , quantity = ? , warehouse = ? , price = ? Where order_number = ?';
     sql ='update order_lines set item_name ="'+ jsondata.item_name +'", quantity ='+ jsondata.quantity +', warehouse ="'+ jsondata.warehouse +'" where order_number='+jsondata.order_number +' and line_number= '+ jsondata.line_number +'; ';
      var query = connection.query(sql  , function (error, results, fields) {
        if (error) {throw error;}
        else {
            res.json({
                status:200,
                message:'successfully updated order line: '+ jsondata.line_number,
                userid:'78787878'
            })
        }
    });
   console.log(query.sql);
});

 //http://localhost:9999/crud/get/lines
app.get("/crud/get/lines" , function(req, res){
   // res.send('successfully retrieved users');
   // res.send("{name:Srinivas, age: 30}");
   console.log(req.query);
   console.log(req.body);
   console.log(req.query.id);
   var id=req.query.id;
   var sql    = 'SELECT line_number, item_name, quantity, warehouse, cust_name, order_number , price FROM order_lines  where order_number= '+id;
   console.log('sql is: '+ sql)
   connection.query(sql, function (error, results, fields) {
    if (error) {throw error;}
    else {
        res.json({
            status:200,
            data: results 
        })
    }
    // ...
  });
 });

 //Deleting orders
 //http://localhost:9999/crud/orders/delete
 app.delete('/crud/orders/delete', function(req, res) {
    console.log("Handling delete request...");
    console.log(req.query);
    var id=req.query.id;
    var sql, sqllines ;
    if(id != null)
    {
        sql    = 'delete from order_headers where order_number ='+id;
        sqllines = 'delete from order_lines where order_number ='+id;

    }
    console.log('sql is: '+ sql);
    console.log('sqllines is: '+ sqllines);
    var query = connection.query(sql, function (error, results, fields) {
        if (error) {
            console.log('query Sql is: '+query);
            throw error;
        }
    });
    var querylines = connection.query(sqllines, function (error, results, fields) {
        if (error) {
            console.log(' querylines Sql is: '+querylines);
            throw error;}
        else {
        res.json({
            status:200,
            message:'successfully deleted order header and line',
            userid:'121212'
        })
    } 
    });
    console.log(' Delete completed ');
});