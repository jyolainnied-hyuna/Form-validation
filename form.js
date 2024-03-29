new Vue({
    el: '#app',
    data: {
        sumbitValue: false,
        isValid: false,
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
            if(this.$refs.nameInput.value != "" || this.$refs.emailInput.value != "")
            {
                //Valid form entries state
                this.$refs.formSubmit.removeAttribute('disabled');
                this.$refs.formSubmit.style.backgroundColor = '#3385ff';           
            }
           else
           {
                //Default State
                this.$refs.formSubmit.setAttribute('disabled', '');
                this.$refs.formSubmit.style.backgroundColor = 'grey';
           }
            
            if(this.$refs.nameInput.getAttribute("aria-invalid") === 'false' && this.$refs.emailInput.getAttribute("aria-invalid") === 'false' && this.$refs.nameInput.value != "" && this.$refs.emailInput.value != "")
            {
                this.isValid = true;
            }
            else
            {
                this.isValid = false;
            }
        },
        checkNameInput: function(event)
        {
            var valid = (event.target.value.length >= 5  && /^[a-z]+$/.test(event.target.value.toLowerCase())) ?  true : false;
            if(!valid){
                event.target.setAttribute("aria-invalid", "true");
                this.nameError = 'Invalid: Name must be at least 5 letters long.';
                event.target.style.border = '0.12em solid red';     //make red border around invalid input
           }
           else{
                event.target.setAttribute("aria-invalid", "false");
                this.nameError = '';
                event.target.style.border = '0.12em solid green';     //make green border around valid input
           }

           this.checkSubmit();

        },
        checkEmailInput: function(event)
        {
            var regex = RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}');
            var valid = regex.test(event.target.value.toLowerCase());
            if(!valid){
                event.target.setAttribute("aria-invalid", "true");
                this.emailError = 'Invalid email address';
                event.target.style.border = '0.12em solid red';     //make red border around invalid input
            }
            else{
                event.target.setAttribute("aria-invalid", "false");
                this.emailError = '';
                event.target.style.border = '0.12em solid green';     //make green border around valid input
            }

            this.checkSubmit();

        },
        checkValid: function()
        {
              //checks if form inputs are valid, push user object to submittedUser array
              if(this.isValid)
              {
                this.submittedUser.push({name: this.$refs.nameInput.value, email: this.$refs.emailInput.value});
                                  
                  //update local storage item
                  localStorage.setItem('users', JSON.stringify(this.submittedUser));
                  
                  //update sumbitValue variable so that the value of button can change
                  this.sumbitValue = true;
                  
                  //reset input field
                  this.$refs.nameInput.value = "";
                  this.$refs.emailInput.value = "";
                  
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