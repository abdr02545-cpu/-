:root {
    --primary: #6c5ce7;
    --secondary: #fdcb6e;
    --bg: #dfe6e9;
    --white: #ffffff;
}

body {
    font-family: 'Arial', sans-serif;
    background-color: var(--bg);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.game-container {
    background: var(--white);
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    width: 90%;
    max-width: 450px;
    text-align: center;
}

h1 { color: var(--primary); }

.stats {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    font-weight: bold;
}

.char-hint {
    font-size: 3rem;
    color: var(--secondary);
    background: #2d3436;
    width: 80px;
    height: 80px;
    line-height: 80px;
    border-radius: 50%;
    margin: 0 auto 20px;
}

.question-box {
    background: #f1f2f6;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
    font-size: 1.1rem;
}

input {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 2px solid #ddd;
    border-radius: 8px;
    box-sizing: border-box;
}

button {
    background: var(--primary);
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 8px;
    cursor: pointer;
    width: 100%;
    font-size: 1rem;
}

button:hover { opacity: 0.9; }

.message { margin-top: 15px; font-weight: bold; height: 25px; }
