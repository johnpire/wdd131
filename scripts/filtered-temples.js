const today = new Date();
const year = document.querySelector("#currentyear");
year.textContent = today.getFullYear();

const lastModified = document.querySelector("#lastModified");
lastModified.textContent = `Last Modification: ${document.lastModified}`;

const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
	navigation.classList.toggle("open");
	hamButton.classList.toggle("open");
});

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Helsinki Finland",
    location: "Helsinki, Finland",
    dedicated: "2006, October, 22",
    area: 16350,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/helsinki-finland-temple/helsinki-finland-temple-22169-main.jpg"
  },
  {
    templeName: "Fresno California",
    location: "Fresno, California, United States",
    dedicated: "2000, April, 9",
    area: 10850,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/fresno-california-temple/fresno-california-temple-50642-main.jpg"
  },
  {
    templeName: "Urdaneta Philippines",
    location: "Urdaneta, Philippines",
    dedicated: "2024, April, 28",
    area: 32604,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/urdaneta-philippines-temple/urdaneta-philippines-temple-45874-main.jpg"
  },
];

createTempleCard(temples);

const navLinks = document.querySelectorAll(".navigation a");

const allTemples = document.querySelector("#home");
allTemples.addEventListener("click", () => {
  setActiveLink(allTemples);

  createTempleCard(temples);
});

const oldTemples = document.querySelector("#old");
oldTemples.addEventListener("click", () => {
  setActiveLink(oldTemples);

  let oldTemplesArray = temples.filter(temple => {
    const templeYear = parseInt(temple.dedicated.split(",") [0], 10);
    return templeYear < 1900;
  }); 
  createTempleCard(oldTemplesArray);
});

const newTemples = document.querySelector("#new");
newTemples.addEventListener("click", () => {
  setActiveLink(newTemples);

  let newTemplesArray = temples.filter(temple => {
    const templeYear = parseInt(temple.dedicated.split(",") [0], 10);
    return templeYear > 2000;
  }); 
  createTempleCard(newTemplesArray);
});

const smallTemples = document.querySelector("#small");
smallTemples.addEventListener("click", () => {
  setActiveLink(smallTemples);

  let smallTemplesArray = temples.filter(temple => {
    return temple.area < 10000;
  }); 
  createTempleCard(smallTemplesArray);
});

const largeTemples = document.querySelector("#large");
largeTemples.addEventListener("click", () => {
  setActiveLink(largeTemples);

  let largeTemplesArray = temples.filter(temple => {
    return temple.area > 90000;
  }); 
  createTempleCard(largeTemplesArray);
});

function createTempleCard(filteredTemples) {
  document.querySelector("#temples").innerHTML = "";
  filteredTemples.forEach(temple => {
    let card = document.createElement("section");
    let name = document.createElement("h3");
    let location = document.createElement("p");
    let dedication =  document.createElement("p");
    let area = document.createElement("p");
    let img = document.createElement("img");

    name.textContent = temple.templeName
    location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;
    dedication.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;
    area.innerHTML = `<span class="label">Area:</span> ${temple.area} sq ft`;
    img.setAttribute("src", temple.imageUrl);
    img.setAttribute("alt", `${temple.templeName} Temple`);
    img.setAttribute("loading", "lazy");

    card.appendChild(name);
    card.appendChild(location);
    card.appendChild(dedication);
    card.appendChild(area);
    card.appendChild(img);

    document.querySelector("#temples").appendChild(card);
  });
}

function setActiveLink(activeLink) {
  navLinks.forEach(link => link.style.color = "");
  activeLink.style.color = "yellow";
}