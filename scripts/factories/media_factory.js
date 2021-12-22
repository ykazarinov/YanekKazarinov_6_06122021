class mediaFactory{
    constructor(data, LikesSubject){
        if(data.image){
            return new imageConstructor(data, LikesSubject)
        }else if(data.video){
           
            return new videoConstructor(data, LikesSubject)
        }else{
            throw 'Unknown type format'
        }
    }
}