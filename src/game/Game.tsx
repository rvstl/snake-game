import { Board } from "./Board";
import { GameProvider } from "./GameProvider";

export const Game = () => {
  return (
    <GameProvider>
      <Board />
    </GameProvider>
  );
};
