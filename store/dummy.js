const db = {
    'users': [
        {id: '1', name: 'Carlos'},
        {id: '2', name: 'Miguel'},
        {id: '3', name: 'Zuriel'},
    ],
    'auth':[

    ]
};

const list = (tabla) => {
    return db[tabla];
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

const remove = async (tabla,id) => {
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove
}