// App - Configurações dos modos

const modes = {
  Pomodoro: { time: 2400, label: "Foco Total" },
  Descanso: { time: 600, label: "Pausa Curta" },
  "Descanso Longo": { time: 1200, label: "Pausa Longa" },
};

// Variaveis do temporizador

let timeLeft = modes["Pomodoro"].time; // Tempo do pomodoro
let currentMode = "Pomodoro"; // o modo padrao
let timerInterval = null; // Id do intervalo
let isRunning = false; // Status do temporizador

// Seletores dos elementos
const timerDisplay = document.getElementById("timer-display");
const timerStatus = document.getElementById("timer-status");
const actionBtn = document.getElementById("action-btn");
const actionIcon = document.getElementById("action-icon");
const actionText = document.getElementById("action-text");

// Seletores dos inputs de modo
const modeInputs = document.querySelectorAll('input[name="timer-mode"]');

// Seletores de tarefas
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Funções do temporizador
function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// Atualizar o display do temporizador
function updateDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
  document.title = `timetostudy - ${formatTime(timeLeft)}`;
}

// Mudar o modo do temporizador
function switchMode(newMode) {
  currentMode = newMode;
  timeLeft = modes[newMode].time;
  timerStatus.textContent = modes[newMode].label;

  pauseTimer();
  updateDisplay();
}

// Iniciar o temporizador
function startTimer() {
  if (isRunning) return;

  isRunning = true;
  // Muda para o pause
  actionIcon.textContent = "pause";
  actionText.textContent = "PAUSAR";

  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      pauseTimer();
      alert("Tempo finalizado!");
      // Reseta para o padrao do modo
      timeLeft = modes[currentMode].time;
      updateDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  timerInterval = null;

  // Muda para o play
  actionIcon.textContent = "play_arrow";
  actionText.textContent = "INICIAR";
  actionBtn.classList.remove("bg-red-500", "text-white");
}

// Alternar entre iniciar e pausar
function toggleTimer() {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

// Eventos do temporizador

actionBtn.addEventListener("click", toggleTimer);
modeInputs.forEach((input) => {
  input.addEventListener("change", (e) => {
    switchMode(e.target.value);
  });
});

// Funções de tarefas

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  li.className =
    "group flex items-center gap-3 rounded-lg border border-gray-100 dark:border-white/5 bg-background-light dark:bg-black/20 p-3 transition-colors hover:border-primary/50";
  li.innerHTML = `<label class="flex cursor-pointer items-center">
            <input class="peer sr-only" type="checkbox">
            <div class="flex size-5 items-center justify-center rounded border-2 border-gray-300 dark:border-gray-600 peer-checked:border-primary peer-checked:bg-primary transition-colors">
                <span class="material-symbols-outlined text-[16px] text-[#181811] opacity-0 peer-checked:opacity-100">check</span>
            </div>
        </label>
        <span class="text-sm font-medium text-text-light dark:text-gray-200 transition-all peer-checked:text-gray-400 peer-checked:decoration-gray-400">${text}</span>
        <div class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <button class="delete-btn text-gray-400 hover:text-red-500">
                <span class="material-symbols-outlined text-[18px]">delete</span>
            </button>
        </div>`;

  // Check task
  const checkbox = li.querySelector('input[type="checkbox"]');
  const spanText = li.querySelector("span.text-sm");

  // Marcar tarefa
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      spanText.classList.add("line-through", "text-gray-400");
    } else {
      spanText.classList.remove("line-through", "text-gray-400");
    }
  });

  // Deletar tarefa
  const deleteBtn = li.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  taskList.prepend(li);
  taskInput.value = " ";
}

// Eventos de tarefas

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Função para atualizar data e hora
function updateDateTime() {
  const display = document.getElementById("datetime-display");
  const now = new Date();

  // Formata a hora e a data em pt-BR
  const time = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Remove o ponto do mês abreviado
  const cleanDate = date.replace(".", "");

  display.textContent = `${time} | ${cleanDate}`;
}

// Atualiza a data e hora a cada segundo
updateDateTime();
setInterval(updateDateTime, 1000);

// Inicialização do display
updateDisplay();
