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

const list = (tabla) => {
    return new Promise(async(resolve,reject) => {
        await connection.query(`SELECT * FROM ${tabla}`, (err, result) => {
            if(err) return reject(err);
            resolve(result);
        })
    })
}

const posts = (tabla) => {
    return new Promise(async(resolve,reject) => {
        await connection.query(`SELECT * FROM ${tabla} 
        INNER JOIN Users ON ${tabla}.Post_from = Users.Id_User`, (err, result) => {
            if(err) return reject(err);
            resolve(result);
        })
    })
}

const listPost = (tabla,id) => {
    return new Promise(async(resolve,reject) => {
        await connection.query(`SELECT * FROM ${tabla} 
        INNER JOIN Users ON ${tabla}.Post_from = Users.Id_User
        WHERE Id_User = ${id}`, (err, result) => {
            if(err) return reject(err);
            resolve(result);
        })
    })
}


const get = (tabla,id) => {
    return new Promise(async(resolve,reject) => {
        await connection.query(`SELECT * FROM ${tabla} WHERE Id_User = ${id}`, (err, result) => {
            if(err) return reject(err);
            resolve(result);
        })
    })
}

const insert = (tabla,data) => {
    return new Promise(async(resolve,reject) => {
        await connection.query(`INSERT INTO ${tabla} SET ?`,data, (err, result) => {
            if(err) return reject(err);
            resolve(result);
        })
    })
}

const update = (tabla,data) => {
    return new Promise(async(resolve,reject) => {
        await connection.query(`UPDATE ${tabla} SET ? WHERE Id_User = ?`,[data,data.Id_User], (err, result) => {
            if(err) return reject(err);
            resolve(result);
        })
    })
}


const query = (tabla,data) => {
    return new Promise(async(resolve,reject) =>{
        await connection.query(`SELECT * FROM ${tabla} WHERE ?`,data, (err,result) => {
            if(err) reject(err);
            resolve(result[0] || null);
        })
    })
}


const following = (tabla,id) => {
    return new Promise(async(resolve,reject) =>{
        await connection.query(`SELECT * FROM ${tabla}
                                INNER JOIN Users ON User_follow.User_to = Users.Id_User
                                WHERE User_from = '${id}';`, (err,result) => {
            if(err) reject(err);
            resolve(result || null);
        })
    })
}

module.exports = {
    list,
    get,
    insert,
    update,
    query,
    following,
    listPost,
    posts
}