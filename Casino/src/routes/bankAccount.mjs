import mysqlConnection from "../database/connection.mjs";
import  express  from "express";
export const bankRouter = express.Router();

//METHODS GET
bankRouter.get('/', (req,res)=>{
    mysqlConnection.query("SELECT * FROM cuentas_bancarias;", (err, rows, fields) =>{
        if (!err) {
            res.json(rows);
        }else{
            console.error(err);
        }
    });
});

//METHODS POST


//METHODS PUT

//METHODS DELETE


