const main = document.querySelector('main');
const navLinks = document.querySelectorAll('.category');
const modal = document.querySelector('#project-details-modal');
let grid;
let sketchGrid;
let projectData = [];
let projectTiles = [];
let currentCategory = 'all';

function selectCategory(e) {
  currentCategory = e.target.id;
  modal.style.display = 'none';
  grid.style.display = 'grid';

  navLinks.forEach((link) => {
    if (link.id == currentCategory) {
      link.classList.add('selected');
    } else {
      link.classList.remove('selected');
    }
  });

  projectTiles.forEach((tile) => {
    if (currentCategory == 'all' || tile.dataset.category == currentCategory) {
      tile.style.display = 'block';
    } else {
      tile.style.display = 'none';
    }
  });
}

function populateProjectDetails(project) {
  let title = document.querySelector('.project-title');
  let year = document.querySelector('.project-year');
  let img = document.querySelector('.project-image');
  let videos = document.querySelectorAll('.project-video');
  let audio = document.querySelector('.project-audio');
  let desc = document.querySelector('.project-description');
  let link = document.querySelector('.project-external-link');

  title.innerText = project.name;
  year.innerText = ` ${project.year}`;
  title.appendChild(year);

  if (project.category == 'code') {
    img.setAttribute('src', project.src);
    img.style.display = 'block';
    videos.forEach((video) => (video.style.display = 'none'));
    audio.style.display = 'none';
  } else if (project.category == 'video') {
    videos.forEach((video) => {
      let name = video.id.replace('-', ' ');
      if (name == project.name) {
        video.style.display = 'block';
      } else {
        video.style.display = 'none';
      }
    });
    img.style.display = 'none';
    audio.style.display = 'none';
  } else {
    img.style.display = 'block';
    audio.style.display = 'block';
    img.setAttribute('src', project.src);
    audio.setAttribute('src', project.audioSrc);
    videos.forEach((video) => (video.style.display = 'none'));
  }

  if (project.name == 'la luz') {
    let title = 'The Master and Margarita';
    let text = project.description.split(title);
    let p1 = document.createTextNode(text[0]);
    let p2 = document.createTextNode(text[1]);
    let span = document.createElement('span');
    span.innerText = title;
    desc.append(p1, span, p2);
  } else {
    desc.innerText = project.description;
  }

  if (project.externalLink != null) {
    link.setAttribute('href', project.externalLink);
    link.innerText = 'try it out';
    link.style.display = 'block';
  } else {
    link.innerText = '';
    link.style.display = 'none';
  }
}

function populateP5Details(project) {
  let title = document.querySelector('.project-title');
  let year = document.querySelector('.project-year');
  let desc = document.querySelector('.project-description');
  let img = document.querySelector('.project-image');
  let video = document.querySelector('.project-video');
  let audio = document.querySelector('.project-audio');
  let link = document.querySelector('.project-external-link');

  img.style.display = 'none';
  audio.style.display = 'none';
  video.style.display = 'none';
  link.style.display = 'none';
  title.innerText = project.name;
  year.innerText = ` ${project.year}`;
  title.appendChild(year);
  desc.innerText = project.description;
}

function showProjectDetails(e) {
  let project = projectData.filter((el) => {
    return el.name == e.target.dataset.project;
  })[0];
  if (project.name == 'p5 sketches') {
    populateP5Details(project);
    sketchGrid.style.display = 'grid';
  } else {
    populateProjectDetails(project);
    sketchGrid.style.display = 'none';
  }

  modal.style.display = 'flex';
  grid.style.display = 'none';
}

function buildSketchGrid(sketches) {
  sketchGrid = document.createElement('div');
  sketchGrid.classList.add('p5-grid-wrapper');
  for (let s of sketches) {
    const tile = document.createElement('div');
    tile.classList.add('project-tile');
    sketchGrid.appendChild(tile);

    const link = document.createElement('a');
    link.setAttribute('href', s.href);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');
    tile.appendChild(link);
    const img = document.createElement('img');
    img.classList.add('project-thumb');
    img.setAttribute('src', s.src);
    img.dataset.project = s.name;
    link.appendChild(img);
    const name = document.createElement('p');
    name.textContent = s.name;
    tile.appendChild(name);
  }
  modal.appendChild(sketchGrid);
}

function buildGrid(projects) {
  grid = document.createElement('div');
  grid.classList.add('grid-wrapper');
  for (let p of projects) {
    const tile = document.createElement('div');
    tile.classList.add('project-tile');
    tile.id = p.name;
    tile.dataset.category = p.category;
    grid.appendChild(tile);

    const name = document.createElement('h3');
    name.textContent = p.name;
    tile.appendChild(name);
    const img = document.createElement('img');
    img.classList.add('project-thumb');
    img.setAttribute('src', p.src);
    img.dataset.project = p.name;
    tile.appendChild(img);
  }
  main.appendChild(grid);
}

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    selectCategory(e);
  });
});

window.onload = async () => {
  const response = await fetch('/projects');
  const data = await response.json();
  projectData = data.projects;

  buildGrid(projectData);
  let sketches = projectData.filter((el) => {
    return el.name == 'p5 sketches';
  })[0].sketches;
  buildSketchGrid(sketches);
  projectTiles = document.querySelectorAll('.project-tile');
  projectTiles.forEach((tile) => {
    tile.addEventListener('click', (e) => {
      showProjectDetails(e);
    });
  });
};
