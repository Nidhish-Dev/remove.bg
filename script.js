const API_KEY = "PnFaPBCkzqCrqBnUUuBEX4Ad"; // Replace with your API key

const fileInput = document.getElementById("fileInput");
const previewImg = document.getElementById("previewImg");
const imagePreview = document.getElementById("imagePreview");
const loading = document.getElementById("loading");
const output = document.getElementById("output");
const resultImg = document.getElementById("resultImg");
const downloadBtn = document.getElementById("downloadBtn");

fileInput.addEventListener("change", previewImage);

function previewImage() {
    if (fileInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImg.src = e.target.result;
            imagePreview.classList.remove("hidden");
            addSparkles();
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

async function removeBackground() {
    if (!fileInput.files.length) {
        alert("Please select an image first.");
        return;
    }

    loading.classList.remove("hidden");

    const formData = new FormData();
    formData.append("image_file", fileInput.files[0]);
    formData.append("size", "auto");

    try {
        const response = await fetch("https://api.remove.bg/v1.0/removebg", {
            method: "POST",
            headers: { "X-Api-Key": API_KEY },
            body: formData,
        });

        if (!response.ok) throw new Error("Failed to process image");

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        setTimeout(() => {
            previewImg.src = imageUrl; // Replacing original image with processed one
            downloadBtn.href = imageUrl;
            loading.classList.add("hidden");
            output.classList.remove("hidden");
        }, 2000);
    } catch (error) {
        alert(error.message);
        loading.classList.add("hidden");
    }
}

function addSparkles() {
    const container = document.querySelector(".sparkle-container");

    // Remove existing sparkles before adding new ones
    const existingSparkles = document.querySelector(".sparkle-effect");
    if (existingSparkles) existingSparkles.remove();

    // Create sparkle effect container
    const sparkleEffect = document.createElement("div");
    sparkleEffect.classList.add("sparkle-effect");

    // Add multiple sparkle dots
    for (let i = 0; i < 5; i++) {
        const dot = document.createElement("div");
        dot.classList.add("sparkle-dot");
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.animationDelay = `${Math.random() * 1.5}s`;
        sparkleEffect.appendChild(dot);
    }

    container.appendChild(sparkleEffect);
}
