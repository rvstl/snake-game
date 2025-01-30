import { Cell } from "./Cell";
import { TPosition, useGame } from "./GameProvider";

export const Board = () => {
  const { BOARD_COL, BOARD_ROW } = useGame();

  const getPosFromIndex = (index: number): TPosition => {
    return [Math.floor(index / BOARD_COL), Math.floor(index % BOARD_COL)];
  };

  return (
    <div
      style={{ gridTemplateColumns: `repeat(${BOARD_COL}, 1fr)` }}
      className="board"
    >
      {Array(BOARD_ROW)
        .fill(Array(BOARD_COL).fill(0))
        .flat(1)
        .map((_, index) => {
          return <Cell key={index} pos={getPosFromIndex(index)} />;
        })}
    </div>
  );
};
