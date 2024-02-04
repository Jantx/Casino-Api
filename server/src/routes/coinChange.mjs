import  express  from "express";
export const coinRouter = express.Router();
import { coinExchange } from "../controllers/coinExchangeController.mjs";


coinRouter.post('/',(req, res) =>{
    try {
        coinExchange(req,res);
    } catch (error) {
        console.error(error);
         res.status(500).json({error:'Internal server error'});
    }
});

