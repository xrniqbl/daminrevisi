document.addEventListener("DOMContentLoaded", () => {
    console.log("Website Atlet Jabar is ready!");

    const loginLink = document.getElementById("login-link");
    const logoutLink = document.getElementById("logout-link");

    // Tambahan: Redirect jika pengguna belum login
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // Halaman yang dilindungi (selain login.html)
    const protectedPages = ["data.html", "jadwal.html", "algo.html", "statistik.html"];
    const currentPage = window.location.pathname.split("/").pop();

    if (!loggedInUser && protectedPages.includes(currentPage)) {
        // Redirect ke login jika pengguna belum login
        alert("Anda harus login terlebih dahulu untuk mengakses halaman ini!");
        window.location.href = "login.html";
        return;
    }

    // Jika sudah login, sesuaikan tampilan tombol login/logout
    if (loggedInUser) {
        loginLink.style.display = "none"; // Sembunyikan tombol login
        logoutLink.style.display = "block"; // Tampilkan tombol logout
        logoutLink.innerText = loggedInUser.username; // Ganti teks tombol dengan username
    } else {
        loginLink.style.display = "block"; // Tampilkan tombol login
        logoutLink.style.display = "none"; // Sembunyikan tombol logout
    }

    // Event listener untuk logout
    logoutLink.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser"); // Hapus data login
        loginLink.style.display = "block"; // Tampilkan tombol login
        logoutLink.style.display = "none"; // Sembunyikan tombol logout
        alert("Anda telah keluar!");
        location.reload(); // Refresh halaman agar perubahan terlihat
    });
});
