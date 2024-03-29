const parallax_el = document.querySelectorAll('.parallax');

let xValue = 0,
  yValue = 0,
  rotateDegree = 0;

function update(cursorPosition) {
  parallax_el.forEach((el) => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    let speedz = el.dataset.speedz;
    let rotateSpeed = el.dataset.rotation;

    let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
    let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

    el.style.transform = `perspective(2300px) translateZ(${zValue * speedz}px) rotateY(${
      rotateDegree * rotateSpeed
    }deg) translateX(calc(-50% + ${-xValue * speedx}px)) translateY(calc(-50% + ${yValue * speedy}px))`;
  });
}

update(0);

window.addEventListener('mousemove', (e) => {
  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;

  rotateDegree = (xValue / (window.innerHeight / 2)) * 20;

  update(e.clientX);
});


let timeline = gsap.timeline();

timeline
  .from(
    '.text h1',
    {
      y: window.innerHeight - document.querySelector('.text h1').getBoundingClientRect().top + 200,
      duration: 2
    },
    '1'
  )
  .from(
    '.text h2',
    {
      y: -150,
      opacity: 0,
      duration: 1.5
    },
    '2'
  )
  .from(
    '.hide',
    {
      opacity: 0,
      duration: 1.5
    },
    '2'
  );
