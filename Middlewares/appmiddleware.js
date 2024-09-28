// sample application middleware created to test

const appMiddleware = (req,res,next)=>{
    console.log("Inside app middle ware !!!!");
    next();
}
module.exports = appMiddleware;