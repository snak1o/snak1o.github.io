document.addEventListener('DOMContentLoaded', (event) => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input, index) => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (index + 1 < inputs.length) {
                    inputs[index + 1].focus();
                }
            }
        });
    });
});

function processData() {
    let data = [];
    for (let i = 0; i < 5; i++) {
        let row = [];
        for (let j = 0; j < 4; j++) {
            const inputValue = document.getElementById(`num${i}-${j}`).value;
            if (inputValue) {
                row.push(Number(inputValue));
            }
        }
        data.push(row);
    }

    const selectedNumbers = findUniqueNumbers(data);
    if (selectedNumbers.length === 4) {
        document.getElementById("output").innerText = selectedNumbers.join(".");
    } else {
        document.getElementById("output").innerText = "Не удалось найти нужные числа";
    }
}

function findUniqueNumbers(data) {
    for (let a = 0; a < data.length; a++) {
        for (let b = 0; b < data.length; b++) {
            for (let c = 0; c < data.length; c++) {
                for (let d = 0; d < data.length; d++) {
                    const potentialNumbers = [data[a][3], data[b][2], data[c][1], data[d][0]];
                    if (allUnique(potentialNumbers) && usesAllDigits(potentialNumbers)) {
                        return potentialNumbers.reverse();  // Reverse to maintain the original order
                    }
                }
            }
        }
    }
    return [];
}

function allUnique(numbers) {
    const seenDigits = new Set();
    for (let num of numbers) {
        for (let digit of String(num)) {
            if (seenDigits.has(digit)) {
                return false;
            }
            seenDigits.add(digit);
        }
    }
    return true;
}

function usesAllDigits(numbers) {
    const seenDigits = new Set();
    for (let num of numbers) {
        for (let digit of String(num)) {
            seenDigits.add(digit);
        }
    }
    return seenDigits.size === 10; 
}

function clearData() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    });
    document.getElementById("output").innerText = '';
}
let slidesData = [
    { src: './lucky_wheel_banner.png', alt: 'гта 5 рп колесо удачи анти афк', link: 'https://discord.gg/gta6rp' },
    { src: './dance_banner.png', alt: 'гта 5 рп dance battle', link: 'https://discord.gg/gta6rp' },
    { src: './gym_banner.png', alt: 'гта 5 рп спортзал автокачалка', link: 'https://discord.gg/gta6rp' },
    { src: './fishing_banner.png', alt: 'гта 5 рп рыбалка', link: 'https://discord.gg/gta6rp' },
  ];
  
  let autoScrollInterval;
  
  function initializeCarousel() {
    updateCarousel();
  }
  
function updateCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.style.transform = 'translateX(-100%)';
    
    setTimeout(() => {
      carouselInner.style.transition = 'none';
      carouselInner.innerHTML = slidesData.map((slide, index) => `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <a href="${slide.link}">
          <img src="${slide.src}" alt="${slide.alt}" loading="lazy">
        </a>
      </div>
    `).join('');
      carouselInner.style.transform = 'translateX(0%)';
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          carouselInner.style.transition = 'transform 0.7s ease';
        });
      });
    }, 700);
  }
  
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      slidesData.push(slidesData.shift());
      updateCarousel();
    }, 5000);
  }

  initializeCarousel();
  startAutoScroll();