const items = [
  { file: "image1.jpg", title: "画像タイトル 1", description: "画像1の説明です。", category: "photo" },
  { file: "image2.jpg", title: "画像タイトル 2", description: "画像2の説明です。", category: "photo" },
  { file: "image3.jpg", title: "画像タイトル 3", description: "画像3の説明です。", category: "art" },
  { file: "image4.jpg", title: "画像タイトル 4", description: "画像4の説明です。", category: "art" },
  { file: "image5.jpg", title: "画像タイトル 5", description: "画像5の説明です。", category: "other" },
  { file: "image6.jpg", title: "画像タイトル 6", description: "画像6の説明です。", category: "photo" },
  { file: "image7.jpg", title: "画像タイトル 7", description: "画像7の説明です。", category: "art" },
  { file: "image8.jpg", title: "画像タイトル 8", description: "画像8の説明です。", category: "other" },
  { file: "image9.jpg", title: "画像タイトル 9", description: "画像9の説明です。", category: "photo" },
  { file: "image10.jpg", title: "画像タイトル 10", description: "画像10の説明です。", category: "other" }
];

const categoryLabels = { photo: "写真", art: "作品", other: "その他" };

const gallery = document.getElementById("gallery");
const filterButtons = document.querySelectorAll(".filter-button");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDescription = document.getElementById("lightboxDescription");
const closeLightbox = document.getElementById("closeLightbox");

function renderGallery(filter = "all") {
  gallery.innerHTML = "";
  const visibleItems = filter === "all" ? items : items.filter(item => item.category === filter);

  visibleItems.forEach(item => {
    const card = document.createElement("article");
    card.className = "card";
    const imagePath = `images/${item.file}`;

    card.innerHTML = `
      <button class="image-button" type="button" aria-label="${item.title}を拡大表示">
        <img src="${imagePath}" alt="${item.title}"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';">
        <div class="placeholder" style="display:none;">${item.file}</div>
      </button>
      <div class="card-body">
        <span class="category">${categoryLabels[item.category] ?? item.category}</span>
        <h2>${item.title}</h2>
        <p>${item.description}</p>
      </div>
    `;

    card.querySelector(".image-button").addEventListener("click", () => openLightbox(item));
    gallery.appendChild(card);
  });
}

function openLightbox(item) {
  lightboxImage.src = `images/${item.file}`;
  lightboxImage.alt = item.title;
  lightboxTitle.textContent = item.title;
  lightboxDescription.textContent = item.description;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightboxView() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  lightboxImage.src = "";
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    renderGallery(button.dataset.filter);
  });
});

closeLightbox.addEventListener("click", closeLightboxView);
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightboxView();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightboxView();
});

renderGallery();
