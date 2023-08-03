import { useState } from "react"
import { Square } from "./components/Square.jsx"
import confetti from "canvas-confetti"
import { TURNS } from "./components/constants.js"
import { checkWinnerFrom } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"
import { resetGameStorage, saveGameStorage } from "./logic/storage/index.js"

function App() {
  const [turn, setTurn] = useState(TURNS.X)
  const [board, setBoard] = useState(Array(9).fill(null))
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((Square => Square !== null))
  }

  const updateBoard = (index) => {

    if(board[index] || winner) return
    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameStorage({
      board: newBoard,
      turn: newTurn
    })

    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner) {
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)) setWinner(false)
  }


  return (
    <main className="board">
      <h1>La Vieja</h1>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                >
                {board[index]}
                </Square>
            )
          })
        }
      </section>
      <h2>TURNO</h2>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
