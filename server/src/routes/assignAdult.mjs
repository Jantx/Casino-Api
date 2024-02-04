import express from "express";
import { AssignAdult } from "../controllers/assignAdultController.mjs";
export const adultRouter = express.Router();

adultRouter.post('/', (req, res)=>{
    try {
        AssignAdult(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Internal server error'})
    }
});

