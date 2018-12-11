import santaImageDefault from '../assets/images/santa.svg';
import santaImageHi from '../assets/images/santa-hi.svg';
import santaImageSit from '../assets/images/santa-sit.svg';

const santaImages = [santaImageDefault, santaImageHi, santaImageSit];

export function positionator(santas) {
  const wrapper = document.querySelector(".wrapper");
  const h = document.querySelector(".big");
  let santaHeight = 50;
  const hWidth = h.clientWidth;
  const hHeight = h.clientHeight;

  const canvas = document.createElement("canvas");
  if (window.innerWidth < 600) {
    santaHeight = 25;
  } 
  canvas.width = hWidth;
  canvas.height = hHeight;
  canvas.getContext("2d").drawImage(h, 0, 0, hWidth, hHeight);

  for (let i = 0; i < santas.length; i++) {
    let randomX = Math.floor(Math.random() * hWidth) + 1;
    let randomY = Math.floor(Math.random() * hHeight) + 1;
    let pixelData = canvas.getContext("2d").getImageData(randomX, randomY, 1, 1)
      .data;
    console.log(pixelData);
    while (pixelData[2] !== 133) {
      randomX = Math.floor(Math.random() * hWidth) + 1;
      randomY = Math.floor(Math.random() * hHeight) + 1;
      pixelData = canvas.getContext("2d").getImageData(randomX, randomY, 1, 1)
        .data;
    }

    const santa = document.createElement('img');
    santa.className = "santa-random ";
    santa.src = santaImages[Math.floor(Math.random() * 3)];
    santa.style = `left:${randomX}px;top:${randomY - santaHeight}px;cursor:pointer;`;
    santa.dataset.name = santas[i].name;
    santa.dataset.office = santas[i].office;
    santa.dataset.purpose = santas[i].purpose;
    wrapper.appendChild(santa);
  }
}
