


// function PhoneBook(contactName, phoneNumber, gender) {
//     this.contactName = contactName;
//     this.phoneNumber = phoneNumber;
//     this.gender = gender;
//     this.displayContactInfo = function () {
//         return (`Contact Name: ${this.contactName}<br>
//         Phone Number: ${this.phoneNumber}<br>
//         Gender: ${this.gender}`);
//     }
// }

// var contactList = JSON.parse(localStorage.getItem("contactList")) || [];
// var serialNo = 0;



// function contactAdded(contacts) {
//     for (var i = 0; i < contacts.length; i++) {
//         // creates a variable that stores the details of the new contact created from the PhoneBook constructor function
//         var person = new PhoneBook(contacts[i].contactName, contacts[i].phoneNumber, contacts[i].gender);

//         // Adds the new data created to an Empty array called contactList
//         var exists = false;
//         for (var j = 0; j < contactList.length; j++) {
//             if (contactList[j].contactName === person.contactName && contactList[j].phoneNumber === person.phoneNumber && contactList[j].gender === person.gender) {
//                 exists = true;
//                 break;
//             }
//         }
//         if (!exists) {
//             contactList.push(person);
//             localStorage.setItem("contactList", JSON.stringify(contactList));

//             serialNo++;

//             displayInList(person, serialNo);
//         }
//     }

// };

// function displayInList(person, serial) {
//     $(".added-contact").append(`
//         <div class = "contact-entry">
//             <span class = "serial-no">
//                 ${serial}.
//             </span>
//             <span class = "contact-info">
//                 <p>${person.displayContactInfo()}</p>
//             </span>
//             <span class = "hide-button">
//                 <button class = "toggle-button">Hide details</button>
//             </span>
//         </div>
//         `);
// }

// function loadedContact() {
//     for (var f = 0; f < contactList.length; f++) {
//         displayInList(contactList[f], f + 1);
//     }
// }




// $(document).ready(function () {
//     loadedContact();

//     $("button").on("click", function () {
//         var contactName = $(".first-name").val();
//         var phoneNumber = $(".last-name").val();
//         var gender = $(".gender-select").val();

//         if (contactName && phoneNumber && gender) {
//             contactAdded([{ contactName, phoneNumber, gender }]);
//         }
//     });
// })


function PhoneBook(contactName, phoneNumber, gender) {
    this.contactName = contactName;
    this.phoneNumber = phoneNumber;
    this.gender = gender;
    this.displayContactInfo = function () {
        return (`Contact Name: ${this.contactName}<br>
        Phone Number: ${this.phoneNumber}<br>
        Gender: ${this.gender}`);
    };
}

// Load stored contacts or initialize empty array
var contactList = JSON.parse(localStorage.getItem("contactList")) || [];
var serialNo = contactList.length; // Ensure serial numbers continue correctly

function contactAdded(contacts) {
    contacts.forEach(contact => {
        var person = new PhoneBook(contact.contactName, contact.phoneNumber, contact.gender);

        // Check if contact already exists
        var exists = contactList.some(c =>
            c.contactName === person.contactName &&
            c.phoneNumber === person.phoneNumber &&
            c.gender === person.gender
        );

        if (!exists) {
            contactList.push(person);
            localStorage.setItem("contactList", JSON.stringify(contactList));

            serialNo++; // Increment serial number
            displayInList(person, serialNo);
        }
    });
}

function displayInList(person, serial) {
    $(".added-contact").append(`
        <div class="contact-entry">
            <span class="serial-no">${serial}. ${person.contactName}</span>
            <span class="contact-info">
                <p>${person.displayContactInfo()}</p>
            </span>
            <span class="hide-button">
                <button class="toggle-button">Hide details</button>
            </span>
        </div>
    `);
}

function loadedContact() {
    for (var f = 0; f < contactList.length; f++) {
        var person = new PhoneBook(
            contactList[f].contactName,
            contactList[f].phoneNumber,
            contactList[f].gender
        );
        displayInList(person, f + 1);
    }
}


$(document).ready(function () {
    loadedContact(); // Load stored contacts on page load

    $(".submit-button").on("click", function () {  // Use an ID to avoid conflicts
        var contactName = $(".first-name").val();
        var phoneNumber = $(".last-name").val();
        var gender = $(".gender-select").val();

        if (contactName && phoneNumber && gender) {
            contactAdded([{ contactName, phoneNumber, gender }]);
        }
    });
});


