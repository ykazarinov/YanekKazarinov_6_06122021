class field{
    constructor(fieldName, regExp, errorText, error, type){
      this.fieldName = fieldName;
      this.regExp = regExp;
      this.errorText = errorText;
      this.error = error;
      this.type = type;
    }
  }

  class testData{
    constructor(fieldName, data, type){
      this.fieldName = fieldName;
      this.data = data;
      this.type = type;
    }
  }


class contactModal{
    constructor(currentAuthotName){
        this.modal = document.querySelector('#contact_modal')
        this.modalTitle = document.querySelector('.modal-title')
        this.currentAuthotName = currentAuthotName

        this.tabIndexForModal = new tabIndex()

        this.data = {
            'FirstName' : '',
             'LastName' : '',
             'Email' : '',
             'Message' : ''
           
        }
        
    }
    displayModal() {
        this.modal.classList.remove('hidden');
        this.modalTitle.innerHTML = 'Contactez-moi<br>' + this.currentAuthotName
        this.tabIndexForModal.deleteTabindex()
         
    }

    closeModal() {
        this.modal.classList.add('hidden')
        this.tabIndexForModal.setTabIndex()
    }

    openMessageModal(elem) {
        elem.classList.remove('hidden')
       
        
    }

    closeMessageModal(elem) {
        elem.classList.add('hidden')
        
    }





    clearFields(){
        document.querySelectorAll('.text-control').forEach(el=>el.value = '');
        
      
    }

     // delete all errorMessages
    deleteErrorMessages(){
        var errorElements = document.getElementsByClassName('error');
        while(errorElements[0]) {
            errorElements[0].parentNode.removeChild(errorElements[0]);
        }
        let errorInputElements = document.getElementsByClassName('inputError');
        while(errorInputElements[0]) {
        errorInputElements[0].classList.remove('inputError');
        }
    }

    checkTheForm(){
        let that = this
        
       
        // DOM Elements
        const modalbg = document.querySelector(".bground");
        const modalBtn = document.querySelectorAll(".modal-btn");
        const formData = document.querySelectorAll(".formData");
        const successMsg = document.querySelector('.success');
        const errorMsg = document.querySelector('.errorModal');

        // ================== Remplir avec les donn??es de test ==========================
        

        document.addEventListener('click', (e) => {
            if(e.target.classList.contains('close-btn')){
                let successWindow = document.querySelector('.success')
                let errorWindow = document.querySelector('.errorModal')
                that.closeMessageModal(successWindow)
                that.closeMessageModal(errorWindow)
               
            }
            
        })
        

        let testDataArr = [];

        testDataArr[0] = new testData('first', 'Yanek', 'input');
        testDataArr[1] = new testData('last', 'Kazarinov', 'input');
        testDataArr[2] = new testData('email', 'kazarinov.yanek@gmail.com', 'input');
        testDataArr[3] = new testData('message', 'test', 'textarea');
     

        

        document.querySelector('.fill').addEventListener('click', function(e){
        
        testDataArr.forEach(i => {
            switch (i.type){ 
            case 'input' : 
                document.querySelector('input[name = "'+ i.fieldName +'"]').value = i.data;
                break;
            case 'textarea' : 
                document.querySelector('textarea[name = "'+ i.fieldName +'"]').value = i.data;
                break;
            }
        });
        })

        // ================== clear the fields ================================


        
        document.querySelector('.clear').addEventListener('click', function(e){
            that.clearFields();
        });

        let fieldsArr = [];
       
        fieldsArr[0] = new field('first', /[a-z,A-Z]{2,}$/, 'Veuillez entrer 2 caract??res ou plus pour le champ du prenom.', true, 'input');
        fieldsArr[1] = new field('last', /[a-z,A-Z]{2,}$/, 'Veuillez entrer 2 caract??res ou plus pour le champ du nom.', true, 'input');
        fieldsArr[3] = new field('email', /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u, 'Veuillez entrer un email valide', true, 'input');
        fieldsArr[4] = new field('message', /[a-z,A-Z,0-9]/, 'Veuillez entrer un message valide', true, 'textarea');

        

       

        // create div with red error
        const createDivWithError = (elem, errorText) => {
            var newDiv = document.createElement("div");
            newDiv.classList.add('error');
            newDiv.innerHTML = errorText;
            elem.parentElement.insertBefore(newDiv, elem.nextSibling);
            elem.classList.add('inputError');
        }

        // v??rification du contenu du champ
        const isValid = field => {
            let elem
            if(field.type === 'input'){
                elem = document.querySelector('input[name="'+ field.fieldName +'"]');
            }else if(field.type === 'textarea'){
                elem = document.querySelector('textarea[name="'+ field.fieldName +'"]');
            }
            
            if(!field.regExp.test(elem.value)){
                field.error = true;
                createDivWithError(elem, field.errorText);
                
            }
            else{
            field.error = false;
            }
        }

        

        // v??rification de chaque champ lors de la d??focalisation
        fieldsArr.forEach(i => {
            if(i.type === 'input'){
                document.querySelector('input[name="'+ i.fieldName +'"]').addEventListener('change', function(e){
                    that.deleteErrorMessages();
                   
                    isValid(i);
                    
                });
            }
            else if(i.type === 'textarea'){
                document.querySelector('textarea[name="'+ i.fieldName +'"]').addEventListener('change', function(e){
                    that.deleteErrorMessages();
                   
                    isValid(i);
                    
                });
            }
            
        });

       


    

        document.querySelector('form .contact_button').addEventListener('click', function(e){
            e.preventDefault();
                   document.querySelector('form').dispatchEvent(new Event('submit'));
        })
        

        const buttonForm = document.querySelector('form .contact_button')
        if (buttonForm.getAttribute('listener') != 'true') {
            buttonForm.addEventListener('click', function(e){
                buttonForm.setAttribute('listener', 'true');
                e.preventDefault();
                that.deleteErrorMessages();
                let isError;
                fieldsArr.forEach(i => {
                    isValid(i);
                    if(i.error === true){
                        isError = true;
                    }
                });
                if(isError){
                    that.openMessageModal(errorMsg);
                }else{
                    console.log('First Name = ', document.querySelector('#first').value)
                    console.log('Last Name = ', document.querySelector('#last').value)
                    console.log('Email = ', document.querySelector('#email').value)
                    console.log('Message = ', document.querySelector('#message').value)

                that.closeModal()
                that.openMessageModal(successMsg)
                that.clearFields();
                }
                
            })
        }
   
    
    
    }

   

}





