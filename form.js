new Vue({
    el: '#app',
    data: {
        sumbitValue: false,
        nameError: '',
        emailError: '',
        submittedUser: []
     },
     computed:{
         sumbitBtn:  function()
         {
             if(this.sumbitValue == true)
             {
                this.$refs.formSubmit.style.backgroundColor = 'green';
                return 'Success';
             }
             else
             {
                 return 'Submit';
             }
         }
     },
     methods:
     {
        checkSubmit: function()
        {
            if(this.$refs.nameInput.getAttribute("aria-invalid") === 'false' && this.$refs.emailInput.getAttribute("aria-invalid") === 'false')
            {
                this.$refs.formSubmit.removeAttribute('disabled');
                this.$refs.formSubmit.style.backgroundColor = '#3385ff';
                
                return true;
            }
            else{
                this.$refs.formSubmit.setAttribute('disabled', '');
                this.$refs.formSubmit.style.backgroundColor = 'grey';
                this.sumbitValue = false;
                
                return false;
            }
        },
        checkNameInput: function(event)
        {
            var valid = (event.target.value.length >= 5 ) ?  true : false;
            if(!valid){
                event.target.setAttribute("aria-invalid", "true");
                this.nameError = 'Invalid: Name must be at least 5 characters long.';
                event.target.style.border = '0.12em solid red';     //make red border around invalid input
           }
           else if(valid){
                event.target.setAttribute("aria-invalid", "false");
                this.nameError = '';
                event.target.style.border = '0.12em solid green';     //make green border around valid input
           }
           else{
                event.target.style.border = '0.1em  solid lightgrey';   //default input field border
           }

           this.checkSubmit();

        },
        checkEmailInput: function(event)
        {
            var regex = RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]$');
            var valid = regex.test(event.target.value.toLowerCase());
            if(!valid){
                event.target.setAttribute("aria-invalid", "true");
                this.emailError = 'Invalid email address';
                event.target.style.border = '0.12em solid red';     //make red border around invalid input
            }
            else if (valid){
                event.target.setAttribute("aria-invalid", "false");
                this.emailError = '';
                event.target.style.border = '0.12em solid green';     //make green border around valid input
            }
            else{
                event.target.style.border = '0.1em  solid lightgrey';  //default input field border
            }

            this.checkSubmit();

        },
        isValid: function()
        {
              //checks if form inputs are valid, push user object to submittedUser array
              if(this.checkSubmit())
              {
                this.submittedUser.push({name: this.$refs.nameInput.value, email: this.$refs.emailInput.value});
                                  
                  //update local storage item
                  localStorage.setItem('users', JSON.stringify(this.submittedUser));
                  
                  //update sumbitValue variable so that the value of button can change
                  this.sumbitValue = true;
              }
        },
        setStorage: function()
        {
            this.submittedUser = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')):this.submittedUser = [];

            //set Local storage item
            localStorage.setItem('users', JSON.stringify(this.submittedUser));
        }

     },
     beforeMount(){
        this.setStorage();
     }
})