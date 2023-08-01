// Das `fields`-Array, das die Zustände der einzelnen Felder speichert
let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "cross"; // Startspieler: 'cross' (X)

// Gewinnkombinationen für horizontale, vertikale und diagonale Gewinne
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // horizontale Gewinnkombinationen
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // vertikale Gewinnkombinationen
  [0, 4, 8],
  [2, 4, 6], // diagonale Gewinnkombinationen
];

// Funktion, um die Tic Tac Toe-Tabelle zu rendern
function render() {
  const ticTacToeDiv = document.getElementById("ticTacToe");
  let tableHTML = "<table>";

  for (let i = 0; i < 3; i++) {
    tableHTML += "<tr>";
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      let symbol = fields[index];

      // Wenn das Feld leer ist, füge eine leere Zelle hinzu
      if (symbol === null) {
        symbol = "";
      } else if (symbol === "circle") {
        // SVG-Code für das "O" (Circle)
        symbol =
          '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">' +
          '<circle cx="50" cy="50" r="40" stroke="black" stroke-width="5" fill="transparent" />' +
          "</svg>";
      } else if (symbol === "cross") {
        // SVG-Code für das "X" (Cross)
        symbol =
          '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">' +
          '<line x1="10" y1="10" x2="90" y2="90" stroke="black" stroke-width="5" />' +
          '<line x1="90" y1="10" x2="10" y2="90" stroke="black" stroke-width="5" />' +
          "</svg>";
      }

      tableHTML += `<td data-index="${index}" onclick="onCellClick(event)">${symbol}</td>`;
    }
    tableHTML += "</tr>";
  }

  tableHTML += "</table>";
  ticTacToeDiv.innerHTML = tableHTML;
}

// Funktion, die aufgerufen wird, wenn ein Zelle angeklickt wird
function onCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.getAttribute("data-index"));

  // Überprüfen, ob das Feld leer ist, bevor es aktualisiert wird
  if (fields[index] === null) {
    fields[index] = currentPlayer; // Setze den aktuellen Spieler (X oder O) ins Feld
    render();

    // Überprüfen, ob ein Spieler gewonnen hat
    if (checkWin()) {
      alert(`Spieler ${currentPlayer === "cross" ? "X" : "O"} hat gewonnen!`);
      resetGame();
      return;
    }

    // Überprüfen, ob das Spielfeld voll ist (Unentschieden)
    if (fields.filter((field) => field === null).length === 0) {
      alert("Unentschieden!");
      resetGame();
      return;
    }

    // Spieler wechseln
    currentPlayer = currentPlayer === "cross" ? "circle" : "cross";
  }
}

// Funktion zum Überprüfen, ob ein Spieler gewonnen hat
function checkWin() {
  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      return true;
    }
  }
  return false;
}

// Funktion zum Zurücksetzen des Spiels
function resetGame() {
  fields = [null, null, null, null, null, null, null, null, null];
  currentPlayer = "cross";
  render();
}

// Initialen Aufruf der `render()`-Funktion, um die Tabelle zu erstellen
render();
