class RatingSorterApi {
    static async sorter(data, orderBy) {
        // console.log("Get from compute")
       
        if (orderBy === 'Date') {
            


            return {
                        key: orderBy,
                        data: Array.from(data).sort(function (a, b){
                            let dateA = new Date(a.date)
                            let dateB = new Date(b.date)
                            return dateA-dateB
                        })
                       
                    }

                  
        } 
        else if (orderBy === 'Popularité') {
            
            return {
                        key: orderBy,
                        data: Array.from(data).sort((a, b) => a.likes - b.likes)
                    }

                   
            
        } 
        else if (orderBy === 'Titre') {
           
            return {
                        key: orderBy,
                        data: Array.from(data).sort(function(a,b){
                            let titreA
                            let titreB
                            if(a.title){titreA = a.title.toLowerCase()}else{titreA = undefined }
                            if(b.title){titreB = b.title.toLowerCase()}else{titreB = undefined }
                           
                            if(titreA < titreB){ return -1}
                            else if(titreA > titreB){return 1}
                            else{return 0}
                        })
                    }

                  
        }else {
            throw 'unknow orderBy type'
        }
    }
}
