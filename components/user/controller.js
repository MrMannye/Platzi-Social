const {nanoid} = require('nanoid')
const auth = require('../auth')
const TABLA = 'users';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/dummy');
    }

    const list = async () => {
        try{
            return await store.list(TABLA);
        } catch(error){
            return error
        }
    }

    const get = (id) => {
        return new Promise(async(resolve,reject) =>{
            if(!id){
                reject("[controller-user] Datos faltantes");
            }
            resolve(await store.get(TABLA, id));
        }) 
    }

    const upsert = (body) =>{
        return new Promise(async(resolve,reject) => {
            const user = {
                id: nanoid(),
                username: body.username,
                name: body.name,
            }
            if(body.password || body.username){
                await auth.upsert({
                    id:user.id,
                    username: user.username,
                    password: body.password
                })
            }
            try {
                const newUser = await store.upsert(TABLA,user);
                resolve(newUser);
            } catch (error) {
                reject("[controller] Error agregar usuario");
            }
        })
    }

    return {
        list,
        get,
        upsert
    };
}