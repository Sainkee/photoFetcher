let key = "cmM5mJtLxJ4MkztydsUq4CrXaTEom2YunJ7Q8y7rPjI";
let input = document.querySelector("input");
let btn = document.querySelector("button");
let contain = document.querySelector(".cardContainer");
let more = document.querySelector(".showMore");
let page = 1;
let query = "";

function getData(page, inputval) {
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputval}&client_id=${key}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      displayImages(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

btn.addEventListener("click", () => {
  page = 1;
  query = input.value;
  getData(page, query);
});

more.addEventListener("click", () => {
  page++;
  getData(page, query);
});

function displayImages(data) {
  data.results.forEach((photo) => {
    console.log(photo);
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <img src="${photo.urls.small}" alt="${photo.alt_description}" />
      
        <div class="overlay">
        <a href = "${photo.urls.full}" target="blank"> <button  class="download-btn">get Full</button> </>
        <button class="download-btn" onclick="downloadUsingBlob('${photo.links.download}')">Download</button>
      
      </div>
      <p>${photo.alt_description}</p>
     
    `;
    contain.appendChild(card);
  });
  input.value = "";
  more.style.display = "block";
}
