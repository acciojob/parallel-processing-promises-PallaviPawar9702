const output = document.getElementById("output");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

const loading = document.createElement("div");
loading.id = "loading";
loading.innerText = "Loading...";

const error = document.createElement("div");
error.id = "error";

output.appendChild(loading);
output.appendChild(error);

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject("Failed to download image: " + url);

    img.src = url;
  });
}

function downloadImages() {
  loading.style.display = "block";
  error.innerText = "";

  const promises = images.map(image => downloadImage(image.url));

  Promise.all(promises)
    .then(result => {
      loading.style.display = "none";

      result.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch(err => {
      loading.style.display = "none";
      error.innerText = err;
    });
}

downloadImages();