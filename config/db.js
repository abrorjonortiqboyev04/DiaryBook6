const { Pool }=require('pg')

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'lg',
    password: '1234',
    user: 'postgres'
})

module.exports=pool