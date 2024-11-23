/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');*/

import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';


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

// POST route for login
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
          res.json({ success: true, message: results[0].Status });
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
        res.json({ success: true, message: results[0].Status});
      } else {
        res.json({ success: false, message: '用户名或密码错误' });
      }
    }
  );
}
});

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

// Start the server on port 5000
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});