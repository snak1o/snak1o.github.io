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

let currentOffset = 0;
const windowSize = 3;
const paginationFactor = 370;
const carouselData = [
  {name: "Discord Fishing", source: "./fishing_banner.png", link: "https://discord.gg/4eGqdc8eHx"},
  {name: "Discord Gym", source: "./gym_banner.png", link: "https://discord.gg/sdSRwWM5Qw"},
  {name: "Discord Gym", source: "./gym_banner.png", link: "https://discord.gg/sdSRwWM5Qw"},
  {name: "Discord Gym", source: "./gym_banner.png", link: "https://discord.gg/sdSRwWM5Qw"},
  {name: "Discord Gym", source: "./gym_banner.png", link: "https://discord.gg/sdSRwWM5Qw"},
];

const carouselElement = document.getElementById('carousel');

carouselData.forEach((item, index) => {
  const slideElement = document.createElement('div');
  slideElement.classList.add('carousel-item');

  const linkElement = document.createElement('a');
  linkElement.href = item.link;
  linkElement.target = "_blank";

  const imgElement = document.createElement('img');
  imgElement.src = item.source;
  imgElement.alt = item.name;
  imgElement.style.width = '350px';
  imgElement.style.maxWidth = 'none';

  linkElement.appendChild(imgElement);
  slideElement.appendChild(linkElement);

  carouselElement.appendChild(slideElement);
});

function atEndOfList() {
  return currentOffset <= (paginationFactor * -1) * (carouselData.length - windowSize);
}

function atHeadOfList() {
  return currentOffset === 0;
}

function moveCarousel(direction) {
  if (direction === 1 && !atEndOfList()) {
    currentOffset -= paginationFactor;
  } else if (direction === -1 && !atHeadOfList()) {
    currentOffset += paginationFactor;
  }
  carouselElement.style.transform = `translateX(${currentOffset}px)`;
}

document.addEventListener('DOMContentLoaded', () => {
  moveCarousel(0);
});