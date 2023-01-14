function makeSpans() {
  const tags = document.querySelectorAll(['h1', 'h2']);
  tags.forEach((tag) => {
    const letters = tag.innerHTML.split('');
    tag.innerHTML = '';

    letters.forEach((letter) => {
      const span = document.createElement('span');
      span.innerHTML = letter;
      tag.appendChild(span);
    });
  });
}

function randomizeFontSize(min, max) {
  document.querySelectorAll(['h1', 'h2']).forEach((el) => {
    const randomVal = Math.random() * (max - min) + min;
    el.style.fontSize = `${randomVal.toFixed(1)}em`;
  });
}

function showModal(e) {
  document.getElementById(`${e.target.id}-modal`).classList.add('active');
}

function hideModal(e) {
  document.getElementById(`${e.target.id}-modal`).classList.remove('active');
}

makeSpans();

randomizeFontSize(9, 11);

document.querySelectorAll('a.project-link').forEach((link) => {
  link.addEventListener('mouseenter', (e) => {
    showModal(e);
  });
  link.addEventListener('mouseleave', (e) => {
    hideModal(e);
  });
});
