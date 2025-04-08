document.addEventListener('DOMContentLoaded', function() {

    const citizenLoginForm = document.getElementById('citizen-login-form');
    const adminLoginForm = document.getElementById('admin-login-form');
    const citizenSignupForm = document.getElementById('citizen-signup-form');
   
    //linked from admin (loginAdmin)
    if (adminLoginForm){
        adminLoginForm.addEventListener('submit', function(event) {
            event.preventDefault();
           
            const email = document.getElementById('admin-login-email').value;
            const password = document.getElementById('admin-login-password').value;
           
            //use demo email = admin@cypress.com and password = C123
            if (email === 'admin@cypress.com' && password === 'C123') {
                window.location.href = 'adminHome.html';
            } else {
                alert('Invalid email or password. Please try again.');
            }
        });
    }


    //linked from citizen (loginCitizen)
    if (citizenLoginForm){
        citizenLoginForm.addEventListener('submit', function(event) {
            event.preventDefault();
           
            const email = document.getElementById('citizen-login-email').value;
            const password = document.getElementById('citizen-login-password').value;
           
            //use demo email = citizen@cypress.com and password = C123
            if (email === 'citizen@cypress.com' && password === 'C123') {
                window.location.href = 'map.html';
            } else {
                alert('Invalid email or password. Please try again.');
            }
        });
    }
   
    if (citizenSignupForm){
        citizenSignupForm.addEventListener('submit', function(event) {
            event.preventDefault();
           
            const email = document.getElementById('citizen-signup-email').value;
            const password = document.getElementById('citizen-signup-password').value;


            //no check, automatically redirect after signup form is filled
            window.location.href = 'map.html';
        });
    }

});