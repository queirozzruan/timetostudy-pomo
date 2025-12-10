// App - Estados

let timeLeft = 2400; // Tempo em segundos
let timerInterval = null; // Id do intervalo
let isRunning = false; // Status do temporizador

// Pegando o elemento da tela
const timerElement = document.getElementById("timer-display");
const startButton = document.getElementById("start-btn");

function updateTimerDisplay() {
  // Calculo de minutos e segundos
  const minutos = Math.floor(timeLeft / 60);
  const segundos = timeLeft % 60;

  // Formata, adicionando o zero a esquerda, seguindo padrão de relogios digitais
  const minutosFormatados = minutos.toString().padStart(2, "0");
  const segundosFormatados = segundos.toString().padStart(2, "0");

  timerElement.textContent = `${minutosFormatados}: ${segundosFormatados}`;
}

function startTimer() {
  isRunning = true;
  // Criacao do loop infinito que roda a cada 1s
  timerInterval = setInterval(() => {
    // Diminuicao do tempo
    timeLeft = timeLeft - 1; // ou timeLeft--
    // Atualiza a visualizacao
    updateTimerDisplay();
    // Checa se chegou ao fim
    if (timeLeft === 0) {
      // Para o intervalo
      clearInterval(timerInterval);
      alert("O tempo acabou!");
    }
  }, 1000); //1s
}
// Quando clicar no botao, starta a funcao.
startButton.addEventListener("click", () => {
  if (isRunning) {
    pauseTimer();
    startButton.textContent = "INICIAR";
  } else {
    startTimer();
    startButton.textContent = "PAUSAR";
  }
});

// Chamada da funcao
updateTimerDisplay();

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  isRunning = false;
}
