import mysql from 'mysql2';
import { HOST, USER, PASSWORD } from "../config.mjs";

const mysqlConnection = mysql.createConnection({
    host: HOST,
    user: USER,
    password:PASSWORD,
    database:'casino'
});

mysqlConnection.connect(function (err){
    if (err) {
        console.log(err);
        return;
    }else{
        console.log('Db is connected');
    }
});

export default mysqlConnection;