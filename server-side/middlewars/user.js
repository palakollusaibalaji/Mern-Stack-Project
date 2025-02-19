const {jsonVerifyToken} = require('../serives/userSerives')

async function authecation(req,res,next) {
    const token = req.cookies['token'];

    if(!token) {
        throw new Error('user signup first');
    }

    const user = jsonVerifyToken(token);

    req.user=user;

    return next();
}


module.exports={
    authecation
}

