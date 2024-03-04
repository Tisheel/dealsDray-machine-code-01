import mysql from 'mysql2'

const client = mysql.createConnection({
    host: 'mysql-7355ff6-tisheelbashyam-30a5.a.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_liSfoj0rDRxiwP_8jro',
    port: 28654,
    database: 'db0'
}).promise()

try {

    await client.connect()
    console.log('mySql connected')

} catch (error) {

    console.log(error)

}

export default client