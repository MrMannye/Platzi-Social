const {nanoid} = require('nanoid')
const auth = require('../auth')
const TABLA = 'Users';
const T_FOLLOW = 'User_follow'

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
                Nombre: body.name,
                Username: body.username,
            }
            if (body.id) {
                user.Id_User = body.id;
            } else {
                user.Id_User = nanoid();
            }
            if(body.password || body.username){
                await auth.upsert({
                    Id_Auth:user.Id_User,
                    username: user.Username,
                    password: body.password
                })
            }
            try {
                const newUser = await store.insert(TABLA,user);
                resolve(newUser);
            } catch (error) {
                reject("[controller] " + error);
            }
        })
    }

    const update = async(body) =>{
        const userUpdated = {
            Id_User: body.id,
            Username: body.username,
            Nombre: body.name
        }
        try {
            const userUpdate = await store.update(TABLA,userUpdated);
            return userUpdate
        } catch (error) {
            return error.message
        }
    }

    const follow = async (from, to) => {
        return await store.insert(T_FOLLOW, {User_from: from, User_to: to});
    }

    const following = async (id) => {
        return await store.following(T_FOLLOW, id);
    }

    return {
        list,
        get,
        upsert,
        update,
        follow,
        following
    };
}