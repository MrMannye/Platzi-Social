const auth = require('../../auth')
const bcrypt = require('bcrypt')
const TABLA = 'auth';


module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/dummy');
    }

    const get = async () => {
        try {
            return await store.list(TABLA);
        } catch (error) {
            return error
        }
    }

    const login = async (username, password) => {
        const userLoged = await store.query(TABLA, { username: username })
        return bcrypt.compare(password, userLoged.password)
        .then((response) => {
            if (response === true) {
                return auth.sign(userLoged);
            } else {
                throw new Error('Informacion invalida')
            }
        }).catch((error)=>{
            return error.message;
        })
        
    }

    const upsert = async (data) => {
        const user = {
            id: data.id,
        }
        if (data.username) {
            user.username = data.username;
        }
        if (data.password) {
            user.password = await bcrypt.hash(data.password,10);
        }
        try {
            const authUser = await store.upsert(TABLA, user);
            return authUser;
        } catch (error) {
            return "Error de autenticacion"
        }
    }

    return {
        upsert,
        login,
        get
    };
}