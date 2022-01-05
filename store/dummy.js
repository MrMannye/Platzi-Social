const db = {
    'users': [
        {id: '1', name: 'Carlos'},
        {id: '2', name: 'Miguel'},
        {id: '3', name: 'Zuriel'},
    ],
    'auth':[
        {
            id: 'VnEdhD38beHW4fgdTm6iq',
            username: 'manu',
            password: '123456789'
        },
    ]
};

const list = (tabla) => {
    return db[tabla] || [];
}

const get = async (tabla,id) => {
    let col = await list(tabla);
    return col.filter(item => item.id === id)[0] || null;
}

const upsert = (tabla,data) => {
    db[tabla].push(data);
    console.log(db)
    return data
}

const query = async(tabla,data) => {
    let col = await list(tabla);
    let keys = Object.keys(data);
    let key = keys[0]; 
    return col.filter(item => item[key] === data[key])[0] || null;
}  

const remove = async (tabla,id) => {
    return true;
}

const updated = async (tabla,data) => {
    const newPassword = null;
    for (let index = 0; index < db[tabla].length; index++) {
        if(data.id === db[tabla][index].id){
            password = db[tabla][index].password;
            db[tabla].splice(index,1);
            break;
        }
    }
    data.password = newPassword;
    upsert(tabla,data);
    return data;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query,
    updated
}