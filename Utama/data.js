const tableBody = document.getElementById("data-table");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

// Cek status login
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
if (!isLoggedIn) {
    alert("Anda harus login untuk mengakses halaman ini.");
    window.location.href = "./login.html"; // Arahkan ke halaman login jika belum login
}

// Fungsi untuk render data
function renderData(data) {
    tableBody.innerHTML = ""; // Kosongkan tabel
    data.forEach(item => {
        const row = `
            <tr>
                <td>${item.nama_provinsi}</td>
                <td>${item.nama_kabupaten_kota}</td>
                <td>${item.cabang_olahraga}</td>
                <td>${item.nama_lengkap}</td>
                <td>${item.jenis_kelamin}</td>
                <td>${item.tahun}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Fungsi untuk mencari data
function searchData(data) {
    const searchValue = searchInput.value.toLowerCase();
    const filteredData = data.filter(item => 
        item.nama_lengkap.toLowerCase().includes(searchValue) || 
        item.cabang_olahraga.toLowerCase().includes(searchValue)
    );
    renderData(filteredData);
}

// Fungsi untuk mengurutkan data
function sortData(data) {
    const sortValue = sortSelect.value;
    if (sortValue) {
        const sortedData = [...data].sort((a, b) => {
            if (a[sortValue] < b[sortValue]) return -1;
            if (a[sortValue] > b[sortValue]) return 1;
            return 0;
        });
        renderData(sortedData);
    } else {
        renderData(data); // Jika tidak ada pengurutan, tampilkan data asli
    }
}

// Fungsi untuk mengambil data dari file JSON
async function fetchData() {
    try {
        const response = await fetch("data.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Render data awal
        renderData(data);

        // Event listener untuk pencarian
        searchInput.addEventListener("input", () => searchData(data));
        
        // Event listener untuk pengurutan
        sortSelect.addEventListener("change", () => sortData(data));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Cek apakah pengguna sudah login
    if (!localStorage.getItem("loggedInUser")) {
        alert("Anda harus login terlebih dahulu untuk mengakses halaman ini.");
        window.location.href = "login.html"; // Redirect ke halaman login
    }
});


// Panggil fungsi untuk mengambil data
fetchData();
