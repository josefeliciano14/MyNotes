import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try{
        if(!req.headers.authorization){
            next();
            return;
        }
        
        const token = req.headers.authorization.split(" ")[1];

        let decodedData;

        if(token){
            decodedData = jwt.verify(token, 'dev');

            req.username = decodedData?.username;

            req.uid = decodedData?.uid;
        }

        next();

    }catch(error){
        console.log(error);
    }
}

export default auth;