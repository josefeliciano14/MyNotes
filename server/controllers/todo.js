import db from '../database/database.js';

export const getToDo = async (req, res) => {
    const user_id = req.uid;

    console.log(user_id);

    if(!user_id){
        return res.status(401).send("Unauthenticated");
    } 

    try{
        let sql = "SELECT title, description FROM ToDo WHERE user=? ORDER BY date_created;";

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