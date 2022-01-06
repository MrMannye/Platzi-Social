module.exports ={
    mysql: {
        DB_HOST: process.env.DB_HOST || "http://localhost",
        DB_PORT: process.env.DB_PORT || 3306,
        DB_NAME: process.env.DB_NAME || "platziVideos",
        DB_USER: process.env.DB_USER || "root",
        DB_PASSWORD: process.env.DB_PASSWORD || "123456789"
    }
}