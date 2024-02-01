import { validationResult } from "express-validator";
import mysqlConnection from "../database/connection.mjs";
import util from 'util';    
import  bankAccountDto  from "../dtos/bankAccountDto.mjs";
import  bankAccount from "../models/bankAccount.mjs";

export const getAllAccounts = async (req, res) =>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const rows = await queryAsync("SELECT * FROM cuentas_bancarias");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getAccountById = async (req, res) =>{

    const errors = validationResult(req);
    const {id} = req.params;

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const rows = await queryAsync("SELECT * FROM cuentas_bancarias WHERE id = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const queryAsync = (query, params = []) => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(query, params, (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

export const createAccount = async (req, res) =>{
    try {
        const { id, idUser, balance } = req.body;
        const account = new bankAccount(id,idUser,balance);
        const query = "CALL bank_AddOrEdit(?,?,?)";
        
        const queryAsync = util.promisify(mysqlConnection.query).bind(mysqlConnection);
        const rows = await queryAsync(query, [account.id,account.idUser,account.balance]);

        res.json({ status: "Account Saved"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const updateAccount = async(req, res) =>{
    try {
        const {id} = req.params;
        const {idUser, balance } = req.body;
        const account = new bankAccount(id,idUser,balance);
        const query = "CALL bank_AddOrEdit(?,?,?)";
        
        const queryAsync = util.promisify(mysqlConnection.query).bind(mysqlConnection);
        const rows = await queryAsync(query, [account.id,account.idUser,account.balance]);

        res.json({ status: "Account Edited"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const deleteAccount = async(req, res) =>{
    try {
        const {id} = req.params;
        const query = "DELETE FROM cuentas_bancarias where id=?"

        const queryAsync = util.promisify(mysqlConnection.query).bind(mysqlConnection);
        const rows = await queryAsync(query, [id]);
        res.json({status:"Account Deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });       
    }
}