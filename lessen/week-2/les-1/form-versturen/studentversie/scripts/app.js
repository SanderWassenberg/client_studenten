const form = document.querySelector("form");
const email = document.getElementById("email");
const emailError = document.querySelector("#email + span.error");

email.addEventListener("input", e => {
    // Each time the user types something, we check if the
    // form fields are valid.

    if (email.validity.valid) {
        // In case there is an error message visible, if the field
        // is valid, we remove the error message.
        emailError.textContent = ""; // Reset the content of the message
        emailError.className = "error"; // Reset the visual state of the message
    } else {
        // If there is still an error, show the correct error
        showError();
    }
});

form.addEventListener("submit", async e => {
    e.preventDefault(); // dont redirect, use ajax instead. 

    // if the email field is valid, we let the form submit
    // If it isn't, we display an appropriate error message
    if (!email.validity.valid) {
        showError();
        return;
    }

    const response = await fetch(e.target.action, {
        method: e.target.method.toUpperCase(),
        headers: { "Content-Type": "application/json" },
        body: formdata_json(new FormData(form))
    })

    document.getElementById("result").innerHTML = JSON.stringify(await response.json(), null, 2);

});

function showError() {
    if (email.validity.valueMissing) {
        // If the field is empty,
        // display the following error message.
        emailError.textContent = "You need to enter an e-mail address.";
    } else if (email.validity.typeMismatch) {
        // If the field doesn't contain an email address,
        // display the following error message.
        emailError.textContent = "Entered value needs to be an e-mail address.";
    } else if (email.validity.tooShort) {
        // If the data is too short,
        // display the following error message.
        emailError.textContent = `E-mail should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
    }

    // Set the styling appropriately
    emailError.className = "error active";
}

function formdata_json(formdata) {
    const object = {};
    formdata.forEach((value, key) => object[key] = value);
    return JSON.stringify(object);
}