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
  const spans = document.querySelectorAll('span');
  spans.forEach((span) => {
    const randomVal = Math.random() * (max - min) + min;
    span.style.fontSize = `${randomVal.toFixed(1)}em`;
  });
}

makeSpans();

randomizeFontSize(2, 7);
