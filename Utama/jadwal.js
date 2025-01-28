document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("jadwal-form");
    const tableBody = document.getElementById("jadwal-table").querySelector("tbody");
    const selectAtlet = document.getElementById("atlet");

    // Data atlet (dapat diambil dari data.json atau API)
    let atletData = [];

    // Fungsi untuk memuat data atlet dari data.json
    async function loadAtletData() {
        try {
            const response = await fetch("data.json");
            if (!response.ok) throw new Error("Gagal memuat data.");
            const data = await response.json();

            // Menyimpan data atlet
            atletData = data.map(atlet => ({ nama_lengkap: atlet.nama_lengkap }));

            // Memasukkan data atlet ke dalam dropdown
            populateSelectAtlet();
        } catch (error) {
            console.error("Error loading atlet data:", error);
            alert("Gagal memuat data atlet.");
        }
    }

    // Fungsi untuk mengisi dropdown atlet dengan nama lengkap
    function populateSelectAtlet() {
        selectAtlet.innerHTML = ""; // Kosongkan dropdown
        atletData.forEach(atlet => {
            const option = document.createElement("option");
            option.value = atlet.nama_lengkap;
            option.textContent = atlet.nama_lengkap;
            selectAtlet.appendChild(option);
        });
    }

    // Fungsi untuk merender tabel
    const renderTable = () => {
        tableBody.innerHTML = "";
        const jadwalData = JSON.parse(localStorage.getItem("jadwal")) || [];
        jadwalData.forEach((jadwal) => {
            const row = `
                <tr>
                    <td>${jadwal.nama}</td>
                    <td>${jadwal.tanggal}</td>
                </tr>`;
            tableBody.innerHTML += row;
        });
    };

    // Event listener untuk menambahkan jadwal baru
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nama = document.getElementById("nama-kegiatan").value;
        const tanggal = document.getElementById("tanggal-kegiatan").value;
        const jadwalData = JSON.parse(localStorage.getItem("jadwal")) || [];

        // Menambahkan kegiatan baru ke dalam array jadwalData
        jadwalData.push({ nama, tanggal });

        // Simpan data ke localStorage
        localStorage.setItem("jadwal", JSON.stringify(jadwalData));

        renderTable(); // Perbarui tabel dengan data terbaru
        form.reset();  // Reset form input
    });

    loadAtletData(); // Memuat data atlet saat halaman dimuat
    renderTable(); // Menampilkan jadwal yang sudah ada di tabel
});

document.addEventListener("DOMContentLoaded", () => {
    // Cek apakah pengguna sudah login
    if (!localStorage.getItem("loggedInUser")) {
        alert("Anda harus login terlebih dahulu untuk mengakses halaman ini.");
        window.location.href = "login.html"; // Redirect ke halaman login
    }
});
