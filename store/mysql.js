const mysql = require('mysql')
const config = require('../config')

const dbconf = {
    host: config.mysql.DB_HOST,
    user: config.mysql.DB_USER,
    password: config.mysql.DB_PASSWORD,
    database: config.mysql.DB_NAME,
}

let connection;

async function handleConnection(){
    connection = mysql.createPool(dbconf);
    // connection.connect((err) => {
    //     if(err){
    //         console.error("[DB] Loged failed")
    //         setTimeout(handleConnection, 2000);
    //     }else{
    //         console.log('[DB] Connected')
    //     }
    // })
    connection.on('error', err => {
        console.error("[DB] Loged failed")
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            handleConnection();
        }else{
            throw err;
        }
    })
}

handleConnection();

const list = (tabla,id) => {
    return new Promise(async(resolve,reject) => {
        connection.query(`SELECT * FROM ${tabla}`, (err, result) => {
            if(error) return reject(err);
            resolve(result);
        })
    })
}

module.exports = {
    list
}