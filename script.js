document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const responseDiv = document.getElementById("response");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Basic form validation (you can enhance this)
        if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
            responseDiv.innerHTML = "<p>Please fill in all fields.</p>";
            return;
        }

        // Send form data to the PHP script for email sending
        fetch("send_email.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, message }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    responseDiv.innerHTML = "<p>Message sent successfully!</p>";
                    contactForm.reset();
                } else {
                    responseDiv.innerHTML = "<p>Failed to send message. Please try again later.</p>";
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                responseDiv.innerHTML = "<p>An error occurred while sending the message.</p>";
            });
    });
});
