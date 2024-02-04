import { validationResult } from "express-validator";
import mysqlConnection from "../database/connection.mjs";
import users from "../models/users.mjs";
import util from 'util';    

export const getAllUsers = async (req, res) =>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const rows = await queryAsync("SELECT * FROM usuarios");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getUserById = async (req, res) =>{

    const errors = validationResult(req);
    const {id} = req.params;

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        const rows = await queryAsync("SELECT * FROM usuarios Where id = ?", [id]);
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

export const createUser = async (req, res) =>{
    try {
        const { id, name, age, isAdult, password, email } = req.body;
        const user = new users(id, name, age, isAdult, password, email);

        const query = "CALL AddOrEdit(?,?,?,?,?,?)";
        
        const queryAsync = util.promisify(mysqlConnection.query).bind(mysqlConnection);
        const rows = await queryAsync(query, [user.id, user.name, user.age, user.isAdult, user.password, user.email]);

        res.json({ status: "User Saved"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const updateUser = async(req, res) =>{
    try {
        const {id} = req.params;
        const {name, age, isAdult, password, email } = req.body;
        const user = new users(id, name, age, isAdult, password, email);

        const query = "CALL AddOrEdit(?,?,?,?,?,?)";
        
        const queryAsync = util.promisify(mysqlConnection.query).bind(mysqlConnection);
        const rows = await queryAsync(query, [user.id, user.name, user.age, user.isAdult, user.password, user.email]);

        res.json({ status: "User Edited", result: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const deleteUser = async(req, res) =>{
    try {
        const {id} = req.params;
        const query = "DELETE FROM usuarios where id=?"

        const queryAsync = util.promisify(mysqlConnection.query).bind(mysqlConnection);
        const rows = await queryAsync(query, [id]);
        res.json({status:"User Deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });       
    }
}