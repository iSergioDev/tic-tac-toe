import { WINNER_COMB0S } from "../components/constants"

export const checkWinnerFrom = (boardToCheck) => {
  for (const combo of WINNER_COMB0S) {
    const [a, b, c] = combo
    if(
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }

  return null
}