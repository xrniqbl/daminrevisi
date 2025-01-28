document.addEventListener("DOMContentLoaded", () => {
    let dataAtlet = []; // Data akan diambil dari data.json
    const selectAtlet = document.getElementById("atlet");
    const kemenanganInput = document.getElementById("kemenangan");
    const submitButton = document.getElementById("submit-data");
    const tabelBody = document.getElementById("statistik-tabel");
    const startButton = document.getElementById("start-statistics");
    const dataCountSelect = document.getElementById("data-count");

    const formInputSection = document.getElementById("form-input-section");
    const tableSection = document.getElementById("table-section");
    const chartSection = document.getElementById("chart-section");
    const selectDataSection = document.getElementById("select-data-section");

    const chartCtx = document.getElementById("chart-kmeans").getContext("2d");
    let chart;

    // Fungsi untuk memuat data dari data.json
    async function loadData() {
        try {
            const response = await fetch("data.json"); // Pastikan path benar
            if (!response.ok) throw new Error("Gagal memuat data.json");
            const jsonData = await response.json();

            // Proses data untuk digunakan
            dataAtlet = jsonData.map(atlet => ({
                nama_provinsi: atlet.nama_provinsi,
                nama_lengkap: atlet.nama_lengkap,
                cabang_olahraga: atlet.cabang_olahraga,
                kemenangan: 0 // Default jumlah kemenangan
            }));

            // Isi dropdown nama atlet
            populateSelectMenu();

            // Tampilkan form input dan tabel setelah data dimuat
            formInputSection.style.display = "block";
            tableSection.style.display = "block";
            chartSection.style.display = "block";
            selectDataSection.style.display = "block";
            renderTable();
            updateChart();
        } catch (error) {
            console.error("Error:", error);
            alert("Gagal memuat data. Silakan coba lagi.");
        }
    }

    // Fungsi untuk mengisi dropdown atlet
    function populateSelectMenu() {
        selectAtlet.innerHTML = ""; // Kosongkan dropdown
        dataAtlet.forEach((atlet, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = atlet.nama_lengkap;
            selectAtlet.appendChild(option);
        });
    }

    // Fungsi untuk merender tabel
    function renderTable() {
        tabelBody.innerHTML = ""; // Kosongkan tabel
        dataAtlet.forEach(atlet => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${atlet.nama_provinsi}</td>
                <td>${atlet.nama_lengkap}</td>
                <td>${atlet.cabang_olahraga}</td>
                <td>${atlet.kemenangan}</td>
            `;
            tabelBody.appendChild(row);
        });
    }

    // Fungsi untuk memperbarui chart
    function updateChart() {
        const selectedCount = dataCountSelect.value;
        let displayData = dataAtlet;
    
        if (selectedCount !== "all") {
            displayData = dataAtlet.slice(0, parseInt(selectedCount));
        }
    
        const labels = displayData.map(atlet => atlet.nama_lengkap);
        const data = displayData.map(atlet => atlet.kemenangan);
    
        if (chart) chart.destroy(); // Hancurkan chart sebelumnya jika ada
    
        chart = new Chart(chartCtx, {
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        label: "Jumlah Kemenangan",
                        data,
                        backgroundColor: "rgba(54, 162, 235, 0.6)"
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: "top" }
                }
            }
        });
    }
    

    // Event handler tombol Simpan
    submitButton.addEventListener("click", () => {
        const selectedIndex = selectAtlet.value;
        const kemenangan = parseInt(kemenanganInput.value, 10);

        if (!isNaN(kemenangan)) {
            dataAtlet[selectedIndex].kemenangan = kemenangan; // Update jumlah kemenangan
            renderTable(); // Perbarui tabel
            updateChart(); // Perbarui chart
            kemenanganInput.value = ""; // Kosongkan input
        } else {
            alert("Masukkan jumlah kemenangan yang valid.");
        }
    });

    // Event handler tombol Mulai Statistik
    startButton.addEventListener("click", () => {
        loadData(); // Panggil fungsi loadData
        startButton.style.display = "none"; // Sembunyikan tombol setelah ditekan
    });

    // Event handler tombol Reset Statistik
    document.getElementById("reset-data").addEventListener("click", () => {
        dataAtlet.forEach(atlet => atlet.kemenangan = 0); // Reset kemenangan
        renderTable(); // Perbarui tabel
        updateChart(); // Perbarui chart
    });

    // Event handler untuk memilih jumlah data yang ditampilkan pada grafik
    dataCountSelect.addEventListener("change", updateChart);
});

document.addEventListener("DOMContentLoaded", () => {
    // Cek apakah pengguna sudah login
    if (!localStorage.getItem("loggedInUser")) {
        alert("Anda harus login terlebih dahulu untuk mengakses halaman ini.");
        window.location.href = "login.html"; // Redirect ke halaman login
    }
});
