class mediaFactory{
    constructor(data){
        if(data.image){
            return new imageConstructor(data)
        }else if(data.video){
            return new videoConstructor(data)
        }else{
            console.log(id)
            throw 'Unknown type format 1'
        }
    }
}