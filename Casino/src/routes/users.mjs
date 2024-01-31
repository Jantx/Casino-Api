import mysqlConnection from "../database/connection.mjs";
import  express  from "express";
export const usersRouter = express.Router();
import users from "../models/users.mjs";
import UserDTO from "../dtos/userDto.mjs";

//METHODS GET
usersRouter.get('/', (req, res)=>{
    mysqlConnection.query('SELECT * FROM usuarios;', (err, rows, fields) =>{
        if (!err) {
            res.json(rows);
        }else{
            console.error(err);
        }
    });

});

usersRouter.get('/:id', (req, res)=>{
    const {id} = req.params;

    mysqlConnection.query('SELECT * FROM usuarios WHERE id=?;',[id], (err, rows, fields) =>{
        if (!err) {
            res.json(rows[0]);
        }else{
            console.error(err);
        }
    });

});

//METHODS POST

usersRouter.post('/', (req, res)=>{
    const {id, name, age, isAdult, password, email} = req.body;
    const userdto = new UserDTO(email,isAdult,password);
    const user = new users(id, name, age, userdto.isAdult, userdto.password, userdto.email);

    const query = "CALL AddOrEdit(?,?,?,?,?,?)"
    mysqlConnection.query(query,[user.id,user.name,user.age,user.isAdult,user.password,user.email],(err,rows,fields)=>{
        if (!err) {
            res.json({status:"User Saved"});
        }else{
            console.error(err);
        }
    });

})

//METHODS PUT
usersRouter.put('/:id', (req, res)=>{
    const {id} = req.params;
    const {name, age, isAdult, password, email} = req.body;
    const userdto = new UserDTO(email,isAdult,password);
    const user = new users(id, name, age, userdto.isAdult, userdto.password, userdto.email);

    const query = "CALL AddOrEdit(?,?,?,?,?,?)"
    mysqlConnection.query(query,[user.id,user.name,user.age,user.isAdult,user.password,user.email],(err,rows,fields)=>{
        if (!err) {
            res.json({status:"User Edited"});
        }else{
            console.error(err);
        }
    });

})


//METHODS DELETE
usersRouter.post('/:id', (req, res)=>{
    const {id} = req.params;
    const query = "DELETE FROM usuarios where id=?"
    mysqlConnection.query(query,[id],(err,rows,fields)=>{
        if (!err) {
            res.json({status:"User Deleted"});
        }else{
            console.error(err);
        }
    });

})



