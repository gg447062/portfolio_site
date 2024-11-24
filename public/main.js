const projectTiles = document.querySelectorAll('.tile-wrapper');
const catSelectors = document.querySelectorAll('.category');

let showing = 'all';
console.log(window.location);

function setShowing(e) {
  showing = e.target.id;

  projectTiles.forEach((tile) => {
    let data = tile.querySelector('.project-tile').dataset.category;
    if (data == showing || showing == 'all') {
      tile.style.display = 'block';
    } else {
      tile.style.display = 'none';
    }
  });

  for (let c of catSelectors) {
    if (c.id == showing) {
      c.classList.add('selected');
    } else {
      c.classList.remove('selected');
    }
  }
}

for (let c of catSelectors) {
  c.addEventListener('click', (e) => setShowing(e));
}
