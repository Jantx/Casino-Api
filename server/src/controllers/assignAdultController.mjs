import { validationResult } from "express-validator";

export const AssignAdult = (req, res) =>{
    const error = validationResult(req);
    const {age, adultName, adultAge} = req.body;

    if (!error.isEmpty()) {
        return res.status(400).json({error: error.array() });
    }

    if (age < 18 ) {
        const appropriateAdult = {
            adultName: {adultName}, 
            adultAge:{adultAge}
        }
        res.json({success: true, appropriateAdult})
    }else{
        res.json({ success: false, mensaje: 'The person is of legal age', personAge: {age} });
    }

}