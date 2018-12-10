export function positionator(santas) {
  const wrapper = document.querySelector(".wrapper");
  const h = document.querySelector(".big");
  const santaHeight = 50;
  const hWidth = h.clientWidth;
  const hHeight = h.clientHeight;

  const canvas = document.createElement("canvas");
  canvas.width = hWidth;
  canvas.height = hHeight;
  canvas.getContext("2d").drawImage(h, 0, 0, hWidth, hHeight);

  for (let i = 0; i < santas.length; i++) {
    let randomX = Math.floor(Math.random() * hWidth) + 1;
    let randomY = Math.floor(Math.random() * hHeight) + 1;
    let pixelData = canvas.getContext("2d").getImageData(randomX, randomY, 1, 1)
      .data;

    while (pixelData[0] !== 236) {
      randomX = Math.floor(Math.random() * hWidth) + 1;
      randomY = Math.floor(Math.random() * hHeight) + 1;
      pixelData = canvas.getContext("2d").getImageData(randomX, randomY, 1, 1)
        .data;
    }

    const santa = document.createElement("img");
    santa.className = "santa animated infinite pulse slow";
    santa.src = "/santa.03f3de27.svg"; // TODO: try to remove parcel hash (maybe do a direct require/import?)
    santa.style = `left:${randomX}px;top:${randomY - santaHeight}px`;

    wrapper.appendChild(santa);
  }
}
