document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const forgotPasswordForm = document.getElementById("forgot-password-form");
    const registerFormAction = document.getElementById("register-form-action");
    const forgotPasswordFormAction = document.getElementById("forgot-password-form-action");

    // Cek apakah sudah ada pengguna yang login
    if (localStorage.getItem("loggedInUser")) {
        window.location.href = "index.html"; // Redirect ke halaman utama jika sudah login
    }

    // Event listener untuk login
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Verifikasi pengguna (contoh sederhana)
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Simpan data login di localStorage
            localStorage.setItem("loggedInUser", JSON.stringify({ username }));
            window.location.href = "index.html"; // Redirect ke halaman utama setelah login berhasil
        } else {
            alert("Username atau Password salah. Silakan coba lagi.");
        }
    });

    // Menampilkan form daftar
    document.getElementById("register-link").addEventListener("click", () => {
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
    });

    // Menampilkan form lupa kata sandi
    document.getElementById("forgot-password-link").addEventListener("click", () => {
        loginForm.classList.add("hidden");
        forgotPasswordForm.classList.remove("hidden");
    });

    // Menangani pendaftaran pengguna baru
    registerFormAction.addEventListener("submit", (e) => {
        e.preventDefault();

        const newUsername = document.getElementById("new-username").value;
        const newPassword = document.getElementById("new-password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.find(u => u.username === newUsername)) {
            alert("Username sudah terdaftar. Silakan pilih username lain.");
        } else {
            users.push({ username: newUsername, password: newPassword });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Pendaftaran berhasil! Silakan login.");
            registerForm.classList.add("hidden");
            loginForm.classList.remove("hidden");
        }
    });

    // Menangani permintaan reset kata sandi (contoh sederhana)
    forgotPasswordFormAction.addEventListener("submit", (e) => {
        e.preventDefault();

        const forgotUsername = document.getElementById("forgot-username").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.username === forgotUsername);

        if (user) {
            alert("Link reset kata sandi telah dikirimkan ke email Anda (fitur ini hanya contoh).");
        } else {
            alert("Username tidak ditemukan. Silakan coba lagi.");
        }
    });

    // Tombol Kembali ke Login pada halaman Daftar
    document.getElementById("back-to-login-register").addEventListener("click", () => {
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
    });

    // Tombol Kembali ke Login pada halaman Lupa Kata Sandi
    document.getElementById("back-to-login-forgot").addEventListener("click", () => {
        forgotPasswordForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
    });

    // Toggle visibility password
    const showPasswordCheckbox = document.getElementById("show-password");
    const passwordField = document.getElementById("password");

    showPasswordCheckbox.addEventListener("change", () => {
        if (showPasswordCheckbox.checked) {
            passwordField.type = "text"; // Tampilkan password
        } else {
            passwordField.type = "password"; // Sembunyikan password
        }
    });
});
