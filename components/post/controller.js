const TABLA = 'Post';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    function list() {
        return store.posts(TABLA);
    }

    function listPost(id) {
        return store.listPost(TABLA,id);
    }

    return {
        list,
        listPost,
    };
}