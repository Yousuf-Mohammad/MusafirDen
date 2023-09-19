const asynceHandler= fn =>(req,res,next) =>{
    Promise.resolve(fn(req,res,next).catch(next));
}

export default asynceHandler;