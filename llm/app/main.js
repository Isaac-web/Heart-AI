// async function sendMessageToBot(message) {
//   const response = await fetch("http://localhost:8000/chat", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ text: message }),
//   });
//   const data = await response.json();
//   console.log(data.response);
// }

// // Example usage
// sendMessageToBot("Hello, chatbot!");

// document
//   .getElementById("vitals-form")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const response = await fetch("/check", {
//       method: "POST",
//       body: formData,
//     });
//     const data = await response.json();
//     document.getElementById("results").textContent = data.response;
//   });

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("vitals-form");
  const resultsDiv = document.getElementById("results");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form); // Collect form data

    fetch("http://localhost:8000/check", {
      method: "POST",
      body: formData, // Send form data
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        // Append the response to the results div
        resultsDiv.innerHTML = `<p>${data.response}</p>`;
      })
      .catch((error) => {
        console.error("Error:", error);
        resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  });
});
