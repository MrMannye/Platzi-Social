const AUTH = 'auth';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/dummy');
    }

    const upsert = async (data) => {
        const user = {
            id: data.id,
        }
        if (data.username) {
            user.username = data.username;
        }
        if (data.password) {
            user.password = data.password;
        }
        try {
            const authUser = await store.upsert(AUTH, user);
            return authUser;
        } catch (error) {
            return "Error de autenticacion"
        }
    }

    return {
        upsert
    };
}