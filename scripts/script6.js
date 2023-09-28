const inputField = document.getElementById("inputField");
const reversedText = document.getElementById("reversedText");

function reverseString(input) {
    return input.split("").reverse().join("");
}

let timer;

inputField.addEventListener("input", function () {
    clearTimeout(timer);
    const inputValue = this.value;
    timer = setTimeout(() => {
        const reversedValue = reverseString(inputValue);
        reversedText.textContent = reversedValue;
    }, 1000); // (1000 milliseconds)
});




document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "9hnBeI2mefFQRFabjLUsvHcvBPQOc3Dc8az6dAw1";

    const imageElement = document.getElementById("apod-image");
    const titleElement = document.getElementById("apod-title");
    const dateElement = document.getElementById("apod-date");
    const descriptionElement = document.getElementById("apod-description");
    const errorMessageElement = document.getElementById("error-message");
    const completionMessageElement = document.getElementById("completion-message");
    const dateButtonsContainer = document.getElementById("date-buttons");

    for (let day = 1; day <= 30; day++) {
        const button = document.createElement("button");
        button.textContent = `2023-09-${day}`;
        button.addEventListener("click", () => fetchAPOD(button.textContent));
        dateButtonsContainer.appendChild(button);
    }

    function fetchAPOD(date) {
        errorMessageElement.textContent = "";
        completionMessageElement.textContent = "";

        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 400) {
                    throw new Error("You can not get image from the future:(");
                }

                imageElement.src = data.url;
                titleElement.textContent = `Name: ${data.title}`;
                dateElement.textContent = `Date: ${data.date}`;
                descriptionElement.textContent = `Description: ${data.explanation}`;
            })
            .catch((error) => {
                errorMessageElement.textContent = `Error: ${error.message}`;
                imageElement.src = "";
            })
            .finally(() => {
                if (errorMessageElement.textContent !== ""){
                    completionMessageElement.textContent = "";
                }
                else {
                    completionMessageElement.textContent = "Fetch completed.";
                }
            });
    }
});






const validRequestButton = document.getElementById("validRequestButton");
const errorRequestButton = document.getElementById("errorRequestButton");
const responseText = document.getElementById("responseText");

validRequestButton.addEventListener("click", () => {
    makeRequest("https://api.github.com/users/kshashkina");
});

errorRequestButton.addEventListener("click", () => {
    makeRequest("https://api.github.com/users/NonExistentUser");
});

function makeRequest(url) {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Successful response
                responseText.textContent = "Successful Response:\n" + xhr.responseText;
            }
            else {
                // Error response
                responseText.textContent = "Error Response "+ xhr.status +":\n" + xhr.responseText;
            }
        }
    };

    xhr.open("get", url, true);
    xhr.send();
}