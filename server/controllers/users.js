import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import db from './../database/database.js'

export const signin = async (req, res) => {
    try{
        const {username, password} = req.body;

        let sql = "SELECT * FROM Users WHERE username=?;";
        db.query(sql, [username], async (error, result) => {
            if(error){
                throw error;
            }

            if(result.length > 0){
                const passwordCorrect = await bcrypt.compare(password, result[0].password);
    
                if(passwordCorrect){
                    const token = jwt.sign({uid: result[0].uid, username: result[0].username}, 'dev');
    
                    return res.status(200).json({token:token});
                }
                else{
                    return res.status(400).json({message: "Invalid credentials"});
                }
            }
            else{
                return res.status(400).json({message: "Invalid credentials"});
            }
        })
    }
    catch(error){
        res.status(500).json({message: "Something went wrong"});
    }
}

export const signup = async (req, res) => {
    try{
        const {username, password} = req.body;

        if(username.length > 30){
            return res.status(400).json({message:"Username is too long"});
        }
        
        let sql = "SELECT username FROM Users WHERE username=?";
        db.query(sql, [username], async (error, result) => {
            if(error){
                throw error;
            }
            
            if(result.length > 0){
                return res.status(400).json({message:"Username taken"});
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            sql = "INSERT INTO Users(username, password) VALUES(?, ?)";
            db.query(sql, [username, hashedPassword], (error, result) => {
                if(error){
                    throw error;
                }

                const token = jwt.sign({username: username}, 'dev');

                return res.status(200).json({"token": token});
            });
        });

    }catch(error){
        res.status(500).json({message: "Something went wrong"});
    }
}