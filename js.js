// взаимодействие с фруктами
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".flying_fruits");
    const fruits = Array.from(container.querySelectorAll('[class^="fruit_"]')).map(el => ({
      el,
      x: parseFloat(el.style.left) || el.offsetLeft,
      y: parseFloat(el.style.top) || el.offsetTop,
      vx: 0,
      vy: 0
    }));
  
    let active = null;
    let offsetX = 0, offsetY = 0;
    const friction = 0.98;
    const bounce = 0.6;
    const repelForce = 1.5;
  
    fruits.forEach(obj => {
      obj.el.style.position = 'absolute';
      obj.el.style.left = obj.x + 'px';
      obj.el.style.top = obj.y + 'px';
    });
  
    function animate() {
      for (let obj of fruits) {
        if (obj !== active) {
          obj.vx *= friction;
          obj.vy *= friction;
          obj.x += obj.vx;
          obj.y += obj.vy;
  
          const bounds = container.getBoundingClientRect();
          const w = obj.el.offsetWidth;
          const h = obj.el.offsetHeight;
  
          if (obj.x < 0) { obj.x = 0; obj.vx *= -bounce; }
          if (obj.x + w > bounds.width) { obj.x = bounds.width - w; obj.vx *= -bounce; }
          if (obj.y < 0) { obj.y = 0; obj.vy *= -bounce; }
          if (obj.y + h > bounds.height) { obj.y = bounds.height - h; obj.vy *= -bounce; }
  
          obj.el.style.left = obj.x + 'px';
          obj.el.style.top = obj.y + 'px';
        }
      }
  
      for (let i = 0; i < fruits.length; i++) {
        for (let j = i + 1; j < fruits.length; j++) {
          const a = fruits[i], b = fruits[j];
          if (a === active || b === active) continue;
  
          const dx = a.x + a.el.offsetWidth / 2 - (b.x + b.el.offsetWidth / 2);
          const dy = a.y + a.el.offsetHeight / 2 - (b.y + b.el.offsetHeight / 2);
          const dist = Math.hypot(dx, dy);
          const minDist = (a.el.offsetWidth + b.el.offsetWidth) / 2;
  
          if (dist < minDist && dist > 0) {
            const angle = Math.atan2(dy, dx);
            const force = (minDist - dist) / minDist * repelForce;
  
            const fx = Math.cos(angle) * force;
            const fy = Math.sin(angle) * force;
  
            a.vx += fx;
            a.vy += fy;
            b.vx -= fx;
            b.vy -= fy;
          }
        }
      }
      requestAnimationFrame(animate);
    }
  
    animate();
    container.addEventListener('mousedown', e => {
      const el = fruits.find(f => f.el === e.target);
      if (el) {
        active = el;
        const rect = el.el.getBoundingClientRect();
        const crect = container.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        el.vx = 0;
        el.vy = 0;
      }
    });
  
    container.addEventListener('mousemove', e => {
      if (!active) return;
      const crect = container.getBoundingClientRect();
      const newX = e.clientX - crect.left - offsetX;
      const newY = e.clientY - crect.top - offsetY;
  
      active.vx = newX - active.x;
      active.vy = newY - active.y;
  
      active.x = newX;
      active.y = newY;
  
      active.el.style.left = active.x + 'px';
      active.el.style.top = active.y + 'px';
    });
  
    container.addEventListener('mouseup', () => {
      active = null;
    });
  
    container.addEventListener('mouseleave', () => {
      active = null;
    });


    
  });



// всплывающее окно
document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.querySelector('.send');
  const overlay = document.querySelector('.popup-overlay');
  const popup = document.querySelector('.popup');
  const emailInput = document.querySelector('.email-input');

  sendBtn.addEventListener('click', () => {
    if (emailInput.checkValidity()) {
      overlay.style.display = 'flex';
    } else {
      alert('Некорректный email');
      emailInput.focus();
    }
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.style.display = 'none';
    }
  });
});



// смена фрутктов и названия при нажатии стрелок
document.addEventListener("DOMContentLoaded", () => {
  const fruits = [
    { name: "ЯБЛОКО", img: "./img/fruit_1.svg" },
    { name: "ГРУША", img: "./img/fruit_2.svg" },
    { name: "БАНАН", img: "./img/fruit_3.svg" },
    { name: "КИВИ", img: "./img/fruit_4.svg" },
    { name: "ПЕРСИК", img: "./img/fruit_5.svg" },
    { name: "ВИШНЯ", img: "./img/fruit_6.svg" },
    { name: "АПЕЛЬСИН", img: "./img/fruit_7.svg" }
  ];

  let current = 4;

  const v1 = document.querySelector('.v1');
  const v1_2 = document.querySelector('.v1_2');
  const nameBlock = document.querySelector('.switch_name');
  const leftArrow = document.querySelector('.arrow_left');
  const rightArrow = document.querySelector('.arrow_right');

  function updateFruit() {
    const fruit = fruits[current];
    const className = `fruit-${current + 1}`; // номер класса fruit-1 ... fruit-7

    // Сбросим все классы и добавим базовые + новые для стилей
    v1.className = `v1 ${className}`;
    v1_2.className = `v1_2 ${className}`;

    nameBlock.textContent = fruit.name;
  }

  leftArrow.addEventListener('click', () => {
    current = (current - 1 + fruits.length) % fruits.length;
    updateFruit();
  });

  rightArrow.addEventListener('click', () => {
    current = (current + 1) % fruits.length;
    updateFruit();
  });

  updateFruit();
});



// счетчик товаров в корзине
document.addEventListener("DOMContentLoaded", function () {
  let count = 0;

  const basket = document.querySelector('.basket');

  const counter = document.createElement('div');
  counter.classList.add('basket-counter');
  counter.textContent = count;
  counter.style.position = 'absolute';
  counter.style.top = '1.5vw';
  counter.style.right = '2vw';
  counter.style.width = '1.5vw';
  counter.style.height = '1.5vw';
  counter.style.borderRadius = '50%';
  counter.style.backgroundColor = '#232171';
  counter.style.color = '#fff';
  counter.style.display = 'flex';
  counter.style.alignItems = 'center';
  counter.style.justifyContent = 'center';
  counter.style.fontSize = '0.8vw';
  counter.style.fontFamily = 'font-regular';
  counter.style.zIndex = '10';

  basket.style.position = 'relative';

  const buttons = document.querySelectorAll('.to_basket');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      count++;

      if (count === 1) {
        basket.appendChild(counter);
      }

      counter.textContent = count;
    });
  });
});



// смена лого при нажатии
document.addEventListener("DOMContentLoaded", () => {
  const obj = document.querySelector(".obj_1");
  const totalVariants = 6;
  let current = 1;

  obj.addEventListener("click", () => {
    current = (current % totalVariants) + 1;
    obj.style.backgroundImage = `url("img/obj_${current}.svg")`;
  });
});



// скролл
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".scroll_line");
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
});



// второе всплывающее окно
document.addEventListener('DOMContentLoaded', () => {
  const joinForm = document.querySelector('.join_form');
  const popupOverlay2 = document.querySelector('.popup-overlay-2');

  joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    popupOverlay2.style.display = 'flex';
  });

  popupOverlay2.addEventListener('click', (e) => {
    if (e.target === popupOverlay2) {
      popupOverlay2.style.display = 'none';
    }
  });
});



// вернуть прошлую страницу 
document.addEventListener('DOMContentLoaded', () => {
  const errorDiv = document.querySelector('.error_404');
  if (errorDiv) {
    errorDiv.addEventListener('click', () => {
      history.back();
    });
  }
});