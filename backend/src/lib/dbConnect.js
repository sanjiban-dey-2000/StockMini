const mongoose=require('mongoose');

async function connect(URI){
    return await mongoose.connect(URI);
}

module.exports={
    connect,
}