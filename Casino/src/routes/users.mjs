import mysqlConnection from "../database/connection.mjs";
import  express  from "express";
export const usersRouter = express.Router();
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/userController.mjs";

//METHODS GET
usersRouter.get('/', async(req, res) =>{
    try {
       await getAllUsers(req, res);    
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Servel internal error'})
    }    
});


usersRouter.get('/:id', async(req, res)=>{
    try {
        await getUserById(req, res);    
     } catch (error) {
         console.error(error);
         res.status(500).json({error: 'Servel internal error'})
     }    
});

//METHODS POST

usersRouter.post('/', async(req, res)=>{
    try {
        await createUser(req,res);
    } catch (error) {
        console.error(error);
         res.status(500).json({error: 'Servel internal error'})       
    }
})

//METHODS PUT
usersRouter.put('/:id', async(req, res)=>{
    try {
        await updateUser(req,res);
    } catch (error) {
        console.error(error);
         res.status(500).json({error: 'Servel internal error'})       
    }
})


//METHODS DELETE
usersRouter.delete('/:id', async(req, res)=>{
    try {
        await deleteUser(req,res);
    } catch (error) {
        console.error(error);
         res.status(500).json({error: 'Servel internal error'})       
    }
})



