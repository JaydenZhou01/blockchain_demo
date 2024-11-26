/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');*/

import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';
import Cookies from "js-cookie";

// Initialize the app
const app = express();
app.use(cors());

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',        // Your MySQL host (usually 'localhost' for local dev)
  user: 'root',             // MySQL username (usually 'root' for local dev)
  password: '',             // MySQL password (empty by default on XAMPP/WAMP)
  database: 'dapp', // Replace with your actual database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// login
app.post('/login', (req, res) => {
  const { username, password,walletaddress } = req.body;

  // Check if the username and password are provided

  // Query the database to check for matching username and password
  console.log(walletaddress)
  if (walletaddress!=''){
    pool.execute(
      'SELECT * FROM customer WHERE wallet=?',
      [walletaddress],
      (err, results) => {
        if (err) {
          console.error('Database query failed:', err);
          return res.status(500).json({ success: false, message: '服务器错误' });
        }
  
        if (results.length > 0) {
          console.log(results);
          res.json({ success: true, message: {status:results[0].Status,walletaddress:walletaddress}});
        } else {
          res.json({ success: false, message: '用户名或密码错误' });
        }
      }
    );
  }
  else{
  pool.execute(
    'SELECT * FROM customer WHERE name = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) {
        console.error('Database query failed:', err);
        return res.status(500).json({ success: false, message: '服务器错误' });
      }

      if (results.length > 0) {
        res.json({ success: true, message: {status:results[0].Status,walletaddress:walletaddress}});
      } else {
        res.json({ success: false, message: '用户名或密码错误' });
      }
    }
  );
}
});

// Sign up
app.post('/signup', (req, res) => {
  const { username, password,walletaddress } = req.body;

  // Check if the username and password are provided
  if (username==""||password==""||walletaddress==""){
    return res.json({ success: false, message:"1" });
  }
  // Query the database to check for matching username and password
  pool.execute(
    'SELECT * FROM customer WHERE wallet=?',
    [walletaddress],
    (err, results) => {
      if (err) {
        console.error('Database query failed:', err);
        return res.status(500).json({ success: false, message: '服务器错误' });
      }

      if (results.length > 0) {
        res.json({ success: false, message:"0" });
      } 
      else {
        pool.execute(
          'INSERT INTO customer (name,password,wallet) VALUES (?, ?, ?);',
          [username, password,walletaddress],
          (err, results) => {
            if (err) {
              console.error('Database query failed:', err);
              return res.status(500).json({ success: false, message: '服务器错误' });
            }
            else {
              res.json({ success: true, message: 'ok' });
            }
          }
        );
      }
    }
  );
 
});

//Real name authentication
app.post('/real', (req, res) => {
  const { realname, HKID,walletaddress } = req.body;

  // Check if the username and password are provided
  if (realname==""||HKID==""||walletaddress==""){
    return res.json({ success: false, message:"1" });
  }
  // Query the database to check for matching username and password
pool.execute(
          'UPDATE customer SET real_name = ?, HKID = ?,Status=1 WHERE wallet = ?;',
          [realname, HKID,walletaddress],
          (err, results) => {
            if (err) {
              console.error('Database query failed:', err);
              return res.status(500).json({ success: false, message: '服务器错误' });
            }
            else {
              res.json({ success: true, message:"12" });
            }
          }
        );
      });

// add order
app.post('/setdish', (req, res) => {
  const { dishname, dishprice,dishimage,name } = req.body;
  const now = new Date();
  const priceNumber = parseFloat(dishprice.replace('DT', ''));

  // Query the database to check for matching username and password
  pool.execute(
    'SELECT * FROM orderdetail WHERE name=? AND paid = 0;',
    [name],
    (err, results) => {
      if (err) {
        console.error('Database query failed:', err);
        return res.status(500).json({ success: false, message: '服务器错误' });
      }

      if (results.length > 0) {
        const current_order = JSON.parse(results[0].content);
        var flag=true;
        for(var i=0;i<current_order.length;i++){
          if(current_order[i].name==dishname){
            current_order[i].count=current_order[i].count+1;
            flag=false;
            break
          }
        }
        if(flag){
          current_order.push({name:dishname,price:priceNumber,image:dishimage,count:1})
        }
        var now_order=JSON.stringify(current_order);
        pool.execute(
          'UPDATE orderdetail SET content = ? , time = ? WHERE name = ? AND paid = 0;',
          [now_order,now,name],
          (err, results) => {
            if (err) {
              console.error('Database query failed:', err);
              return res.status(500).json({ success: false, message: '服务器错误' });
            }
            else {
              res.json({ success: true, message:'1'});
            }
          }
        );
        
      } 
      else {
        var now_order=JSON.stringify([{name:dishname,price:priceNumber,image:dishimage,count:1}]);
        pool.execute(
          'INSERT INTO orderdetail (name,content,time) VALUES (?, ?, ?);',
          [name, now_order,now],
          (err, results) => {
            if (err) {
              console.error('Database query failed:', err);
              return res.status(500).json({ success: false, message: '服务器错误' });
            }
            else {
              res.json({ success: true, message: 'ok' });
            }
          }
        );
      }
    }
  );
 
});

//get order
app.post('/getorder', (req, res) => {
  const { name} = req.body;
  pool.execute(
    'SELECT * FROM orderdetail WHERE name=? AND paid = 0;',
    [name],
    (err, results) => {
      if (err) {
        console.error('Database query failed:', err);
        return res.status(500).json({ success: false, message: '服务器错误' });
      }
      
      if (results.length > 0) {
        res.json({ success: true, message:results[0].content});
      } else {
        res.json({ success: false, message: '用户名或密码错误' });
      }
    }
  );
});

//set order
app.post('/setorder', (req, res) => {
  const { name,order_list,des1,des2,timerange,service} = req.body;
  const now = new Date();
  pool.execute(
    'UPDATE orderdetail SET paid = 1 WHERE name = ? AND paid = 0;',
    [name],
    (err, results) => {
      if (err) {
        console.error('Database query failed:', err);
        return res.status(500).json({ success: false, message: '服务器错误' });
      }
      else{
        var destination=des1+','+des2;
        var now_order=JSON.stringify([{name:name,order:order_list,des:destination,time:timerange,fee:service}]);
        pool.execute(
          'INSERT INTO delivery (name,content,time) VALUES (?, ?, ?);',
          [name,now_order,now],
          (err, results) => {
            if (err) {
              console.error('Database query failed:', err);
              return res.status(500).json({ success: false, message: '服务器错误' });
            }
            else{
              res.json({ success: true});
            }
          }
        );
       
      }
    }
  );
});

//get all delivery
app.post('/getallD', (req, res) => {
  pool.execute(
    'SELECT * FROM delivery WHERE settle=0',
    (err, results) => {
      if (err) {
        console.error('Database query failed:', err);
        return res.status(500).json({ success: false, message: '服务器错误' });
      }
      
      if (results.length > 0) {
        res.json({ success: true, message:results});
      } else {
        res.json({ success: false, message: '用户名或密码错误' });
      }
    }
  );

});
//get delivery
app.post('/getdelivery', (req, res) => {
  const { id} = req.body;
  pool.execute(
    'SELECT * FROM delivery WHERE id=? AND settle=0',
    [id],
    (err, results) => {
      if (err) {
        console.error('Database query failed:', err);
        return res.status(500).json({ success: false, message: '服务器错误' });
      }
      
      if (results.length > 0) {
        console.log(results.length);
        res.json({ success: true, message:results});
      } else {
        res.json({ success: false, message: '用户名或密码错误' });
      }
    }
  );
});

//settle delivery
app.post('/settledelivery', (req, res) => {
  const {id} = req.body;
  pool.execute(
    'UPDATE delivery SET settle = 1 WHERE id=?',
    [id],
    (err, results) => {
      if (err) {
        console.error('Database query failed:', err);
        return res.status(500).json({ success: false, message: '服务器错误' });
      }
      else{
          console.log("success");
      }
      
    }
  );
});
// Start the server on port 5000
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});