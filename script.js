const radioSignals = [
  "[02:07] Песок у ретранслятора двигается против ветра.",
  "[02:58] Неизвестный голос просит вернуть его кожу.",
  "[07:31] В небе открылась шахматная клетка и сразу погасла.",
  "[08:14] Три каравана сообщили об одном и том же сне.",
  "[09:45] Старый счетчик Гейгера отбивает марш.",
  "[11:03] На частоте полиции играет колыбельная без слов.",
  "[13:22] Дюна возле казино сменила координаты.",
  "[17:50] Обсерватория принимает свет, отправленный завтра.",
  "[21:19] Вода в канистре повторяет азбуку Морзе.",
  "[23:41] Сектор 09 не отвечает, но печатает наши вопросы."
];

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.16
});

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

document.querySelectorAll("[data-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.target);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const signalButton = document.querySelector("#newSignal");
const signalList = document.querySelector("#signalList");

signalButton.addEventListener("click", () => {
  const signal = radioSignals[Math.floor(Math.random() * radioSignals.length)];
  const item = document.createElement("li");

  item.textContent = signal;
  item.classList.add("fresh-signal");
  signalList.prepend(item);

  if (signalList.children.length > 8) {
    signalList.lastElementChild.remove();
  }
});

const typewriter = document.querySelector("#typewriter");
const typewriterText = typewriter.textContent.trim();
let typeIndex = 0;

typewriter.textContent = "";

function typeHeroText() {
  typewriter.textContent = typewriterText.slice(0, typeIndex);
  typeIndex += 1;

  if (typeIndex <= typewriterText.length) {
    window.setTimeout(typeHeroText, 24);
  }
}

window.setTimeout(typeHeroText, 450);
