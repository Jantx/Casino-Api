import { validationResult } from "express-validator";
import axios from "axios";
const key = '48c8a422bc80a68a3bb2353f';

export const coinExchange = async(req, res) =>{
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({error: error.array()})
    }
        try {
            const {amount, coin} = req.body;
            const response = await axios.get(`https://v6.exchangerate-api.com/v6/${key}/latest/${coin}`);
            if (response.status !== 200) {
                throw new Error(`Error to obtain the Coin Exchange`);
            }

            const change = response.data.conversion_rates.USD;
            const NewChange = amount * change;

            res.json({
                success: true,
                NewChange,
                moneyDestiny: 'USD',
                change,
            });


        } catch (error) {
            console.error(error);
            res.status(500).json({error:'Internal server error'});
        }

    }

