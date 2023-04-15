
submitForm = document.querySelector('#submit');
submitForm.addEventListener('click', processForm);

function processForm(event) {
    event.preventDefault();

    let form = document.querySelector('#myform');
    console.log(form);
    let errorMessage = '';
    let errorMessage1 = '';
    let errorMessage2 = '';
    let errorMessage3 = '';
    let messages = '';

    errorMessage  = processPhoneNumber();
    errorMessage1 = processConditions();
    errorMessage2 = processTimePeriod();
    errorMessage3 = processStudyID();
    
    if (errorMessage.length > 0) {
        messages += errorMessage + "\n"
    }
    if (errorMessage1.length > 0) {
        messages += errorMessage1 + "\n"
    } 
    if (errorMessage2.length > 0) {
        messages += errorMessage2 + "\n"
    }
    if (errorMessage3.length > 0) {
        messages += errorMessage3 + "\n"
    }

    if(messages.length > 0) {
        alert(messages);
    } else {
        if(confirm("Do you want to submit the form data?")){
            form.submit();
        }
    }
}

function processPhoneNumber() {
    let phone1 = document.querySelector('#phone-field1').value;
    let phone2 = document.querySelector('#phone-field2').value;
    let phone3 = document.querySelector('#phone-field3').value;

    if ( phone1.length != 3|| isNaN(Number(phone1))) {
        return `Invalid phone number`;
    }
    else if ( phone2.length != 3|| isNaN(Number(phone1))) {
        return `Invalid phone number`;
    }
    else if ( phone3.length != 4|| isNaN(Number(phone1))) {
        return `Invalid phone number`;
    }
    else {
        return ''
    }
}

function processConditions() {
    let counter=0;
    let blood = document.querySelector('#blood-box').checked;
    let diabetes = document.querySelector('#diabetes-box').checked;
    let glaucome = document.querySelector('#glaucome-box').checked;
    let asthma = document.querySelector('#asthma-box').checked;
    let none = document.querySelector('#none-box').checked;

    if (blood) {
        counter++;
    }  
    if (diabetes) {
        counter++;
    }  
    if (glaucome) {
        counter ++;
    }  
    if (asthma) {
        counter++;
    }
    if (none) {
        return 'Invalid conditions selection';
    }
    
    if (counter === 0) {
        return 'No conditions selected';
    } else {
        return '';
    }
}

function processTimePeriod() {
    let counter=0;
    let radioButtons = document.getElementsByName('period');

    for (let entry of radioButtons) {
        if (entry.checked) {
            counter++;
        }
    }

    if (counter === 0) {
        return 'No time period selected'
    }
    else {
        return '';
    }

}

// function processTerm() {
//     let preference = document.querySelector()
//     let optionSelected = preference[preference.selectedIndex].value;
// }

function processStudyID(){
    let id1 = document.querySelector('#id-field1').value;
    let id2 = document.querySelector('#id-field2').value;

    letterId1 = id1[0];
    letterId2 = id2[0];

    id1 = parseInt(id1.substring(1));
    id2 = parseInt(id2.substring(1));

    if (letterId1 !== 'A' || letterId2 !== 'B' || isNaN(id1) || isNaN(id2)) {
        return `Invalid student id`
    }
    else if (id1 > 999 || id1 < 100 || id2 > 999 || id2 < 100) {
        return `Invalid student id`
    }
    else {
        return '';
    }

}