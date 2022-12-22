let formData = {

    name: "",
    email: "",
    status: "Active",
    gender: "male"
}
let myFormEl = document.getElementById("myForm");

let nameEl = document.getElementById("name");
let nameErrMsgEl = document.getElementById("nameErrMsg");

let emailEl = document.getElementById("email");
let emailErrMsgEl = document.getElementById("emailErrMsg");

nameEl.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        nameErrMsgEl.textContent = "Required*";
    } else {
        nameErrMsgEl.textContent = "";
    }
    formData.name = event.target.value
});

emailEl.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        emailErrMsgEl.textContent = "Required*";
    } else {
        emailErrMsgEl.textContent = "";
    }
    formData.email = event.target.value
});

function submitFormData(formData) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 12eb6abe42a20a4a2066aa7652640cd0fec45b777bd469f9a40be9b6bc61d729",
        },
        body: JSON.stringify(formData)
    };

    let url = "https://gorest.co.in/public-api/users";

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            if (jsonData.code === 422) {
                if (jsonData.data[0].message === "has already been taken") {
                    emailErrMsgEl.textContent = "Email Already Exists";
                }
            }
        });
}
myFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    submitFormData(formData);
});


let workingStatus = document.getElementById("status")
workingStatus.addEventListener("change", function(event) {
    formData.status = event.target.value
    console.log(formData)
})
let male = document.getElementById("male")
let female = document.getElementById("female")
male.addEventListener("change", function(event) {
    formData.gender = event.target.value
})
female.addEventListener("change", function(event) {
    formData.gender = event.target.value
})