import { citizenAccounts, adminAccounts } from "./data-accounts.js";

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

            let flag = false;
            adminAccounts.forEach(acc =>{
                if (email === acc.email && password === acc.password) {
                    flag = true;
                } 
            });

            if (flag === true) {
                window.location.href = '../index/adminHome.html';
            } else {
                event.preventDefault();
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

            let flag = false;
            citizenAccounts.forEach(acc => {
                if (email === acc.email && password === acc.password) {
                    flag = true;
                }
            });
        
            if (flag === true ) {

                window.location.href = '../index/explore-page.html';
            }
            else{
                event.preventDefault();
                alert('Invalid email or password. Please try again.');
            }

        });
    }
   
    if (citizenSignupForm){
        citizenSignupForm.addEventListener('submit', function(event) {
            event.preventDefault();
           
            const firstName = document.getElementById('fn').value;
            const lastName = document.getElementById('ln').value;
            const email = document.getElementById('citizen-signup-email').value;
            const password = document.getElementById('citizen-signup-password').value;

            let flag = false;
            citizenAccounts.forEach(acc =>{
                if (email === acc.email){
                    flag = true;
                }
            });

            if (flag == true){
                event.preventDefault();
                alert('You already have an account!');
            }
            else{
                
                citizenAccounts.push({firstName: `${firstName}`, lastName: `${lastName}`, email: `${email}`, password: `${password}`})
                //no check, automatically redirect after signup form is filled
                window.location.href = '../index/explore-page.html';
  