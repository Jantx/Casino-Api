import  express  from "express";
export const bankRouter = express.Router();
import { createAccount, deleteAccount, getAccountById, getAllAccounts, updateAccount } from "../controllers/bankAccountController.mjs";
//METHODS GET
bankRouter.get('/', async(req,res)=>{
    try {
        await getAllAccounts(req, res);    
     } catch (error) {
         console.error(error);
         res.status(500).json({error: 'Servel internal error'})
     }
});

bankRouter.get('/:id', async(req,res)=>{
    try {
        await getAccountById(req, res);    
     } catch (error) {
         console.error(error);
         res.status(500).json({error: 'Servel internal error'})
     }
});
//METHODS POST
bankRouter.post('/', async(req, res)=>{
    try {
        await createAccount(req, res);    
     } catch (error) {
         console.error(error);
         res.status(500).json({error: 'Servel internal error'})
     }
});

//METHODS PUT
bankRouter.put('/:id', async(req,res)=>{
    try {
        await updateAccount(req, res);    
     } catch (error) {
         console.error(error);
         res.status(500).json({error: 'Servel internal error'})
     }
});


//METHODS DELETE
bankRouter.delete('/:id', async(req,res)=>{
    try {
        await deleteAccount(req, res);    
     } catch (error) {
         console.error(error);
         res.status(500).json({error: 'Servel internal error'})
     }
});


