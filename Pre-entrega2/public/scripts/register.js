document.querySelector("#register").addEventListener("click", async () => {
    const data = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
        photo: document.querySelector("#photo").value,
        age: document.querySelector("#age").value,
    };
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };
    let response = await fetch("api/sessions/login", opts);
    response = await response.json();
    if (response.statusCode === 200) {
        Swal.fire({
            title: response.message,
            icon: "succes",
            timer: 50000,
            timerProgressBar: true,
            confirmButtonColor: "#ff3bc"
        });
        //return location.replace("/login.html");
    }
    return Swal.fire({
        title: response.message,
        icon: "error",
        timer: 50000,
        timerProgressBar: true,
        confirmButtonColor: "#ff3bc"
    });
});