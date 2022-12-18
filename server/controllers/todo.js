import db from '../database/database.js';

export const getToDo = async (req, res) => {
    const user_id = req.uid;

    if(!user_id){
        return res.status(401).send("Unauthenticated");
    } 

    try{
        let sql = "SELECT tid, title, description FROM ToDo WHERE user=? ORDER BY date_created;";

        await new Promise((resolve, reject) => {
            db.query(sql, [user_id], (error, result) => {
                if(error){
                    throw error;
                }

                res.status(200).json(result);

                resolve();
            });
        });

    } catch (error){
        res.status(500).send("Internal Server Error");
    }
}

export const postToDo = async (req, res) => {
    const user_id = req.uid;

    if(!user_id){
        return res.status(401).send("Unauthenticated");
    } 

    let {title, description} = req.body;

    if(!title){
        return res.status(400).send("Title Undefined");
    }

    if(!description){
        description = "";
    }

    try{
        let sql = "INSERT INTO ToDo(user, title, description) VALUES(?, ?, ?);";

        await new Promise((resolve, reject) => {
            db.query(sql, [user_id, title, description], (error, result) => {
                if(error){
                    throw error;
                }

                res.status(200).json({"insertId": result.insertId});

                resolve();
            });
        });

    } catch (error){
        res.status(500).send("Internal Server Error");
    }
}

export const deleteToDo = async (req, res) => {
    const user_id = req.uid;

    if(!user_id){
        return res.status(401).send("Unauthenticated");
    } 

    const {tid} = req.params;

    if(!tid){
        return res.status(400).send("ID not specified");
    }

    try{
        let sql = "DELETE FROM ToDo WHERE tid=? AND user=?;";

        await new Promise((resolve, reject) => {
            db.query(sql, [tid, user_id], (error, result) => {
                if(error){
                    throw error;
                }

                res.status(200).send("OK");

                resolve();
            });
        });

    } catch (error){
        res.status(500).send("Internal Server Error");
    }
}

export const editToDo = async (req, res) => {
    const user_id = req.uid;

    if(!user_id){
        return res.status(401).send("Unauthenticated");
    } 

    let {tid, title, description} = req.body;

    if(!title){
        return res.status(400).send("Title Undefined");
    }

    if(!description){
        description = "";
    }

    console.log(req.body);

    try{
        let sql = "UPDATE ToDo SET title=?, description=? WHERE tid=?;";

        await new Promise((resolve, reject) => {
            db.query(sql, [title, description, tid], (error, result) => {
                if(error){
                    throw error;
                }

                console.log(result);

                res.status(200).send("OK");

                resolve();
            });
        });

    } catch (error){
        res.status(500).send("Internal Server Error");
    }
}