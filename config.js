

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

module.exports ={
    api:{
        PORT: process.env.PORT || 3001,
        SECRET_TOKEN: process.env.SECRET_TOKEN,
    },
    mysql: {
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD
    }
}