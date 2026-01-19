body {
  font-family: Arial, sans-serif;
  background: #111;
  color: #fff;
  text-align: center;
  margin: 0;
  padding: 20px;
}
.board {
  display: grid;
  grid-template-columns: repeat(6, 60px);
  gap: 8px;
  justify-content: center;
  margin: 20px auto;
}
.cell {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border: 2px solid #555;
  cursor: pointer;
  user-select: none;
  background: #222;
}
.cell.green { background: #0f8b4a; }
.cell.orange { background: #ff8c00; }
.cell.selected { border-color: #fff; }

.controls {
  margin-top: 20px;
}
input, button {
  padding: 10px 15px;
  margin: 5px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
}
button {
  cursor: pointer;
}
.timer {
  font-size: 18px;
  margin-top: 10px;
}
.question {
  margin-top: 15px;
  font-size: 18px;
  padding: 10px;
  background: #222;
  border: 1px solid #555;
  border-radius: 8px;
}
.top {
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
}
.input-area {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}
