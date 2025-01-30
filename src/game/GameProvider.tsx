import { createContext, useContext, useEffect, useState } from "react";
import { TDirection, useKeyPress } from "./useKeyPress";

const GameContext = createContext(null);
export const useGame = () => useContext(GameContext);

export type TPosition = [number, number];

const BOARD_ROW = 15;
const BOARD_COL = 15;
const DELAY = 500;

const initalhead: TPosition = [1, 2];

export const isPositionEqual = (pos1: TPosition, pos2: TPosition): boolean => {
  return pos1[0] === pos2[0] && pos1[1] === pos2[1];
};

const getInitialSnake = (): TPosition[] => {
  return [
    [initalhead[0] + 2, initalhead[1]],
    [initalhead[0] + 1, initalhead[1]],
    [initalhead[0], initalhead[1]],
  ];
};

const interateBoard = (callback: (TPosition) => void) => {
  for (let i = 0; i < BOARD_ROW; i++) {
    for (let j = 0; j < BOARD_COL; j++) callback([i, j]);
  }
};

const isPositionInsideSnake = (pos: TPosition, snake: TPosition[]): number => {
  const minWeight = 30;
  const snakeLen = snake.length;
  let weight = snakeLen;
  for (let snakePos of snake) {
    if (isPositionEqual(pos, snakePos)) {
      return minWeight + (weight * (100 - minWeight)) / snakeLen;
    }
    weight--;
  }
  return -1;
};

const getRandomFoodPlace = (snake: TPosition[]): TPosition => {
  const pairs: TPosition[] = [];
  interateBoard((pos) => {
    if (isPositionInsideSnake(pos, snake) === -1) {
      pairs.push(pos);
    }
  });
  const remainingCells = pairs.length;
  const randomIndex = Math.floor(Math.random() * remainingCells);
  return pairs[randomIndex];
};

const isValidMove = (pos: TPosition, snake: TPosition[]) => {
  if (pos[0] < 0 || pos[1] < 0 || pos[0] >= BOARD_ROW || pos[1] >= BOARD_COL)
    return false;
  if (isPositionInsideSnake(pos, snake) !== -1) return false;
  return true;
};

const getNextMove = (head: TPosition, direction: TDirection): TPosition => {
  if (direction === "top") return [head[0] - 1, head[1]];
  if (direction === "bottom") return [head[0] + 1, head[1]];
  if (direction === "left") return [head[0], head[1] - 1];
  if (direction === "right") return [head[0], head[1] + 1];
};

export const GameProvider = ({ children }) => {
  // const [board, setBoard] = useState<ICell[][]>(getInitalBoard);
  const [snake, setSnake] = useState<TPosition[]>(() => getInitialSnake());
  const [food, setFood] = useState<TPosition>(() => getRandomFoodPlace(snake));
  const [gameStatus, setGameStaus] = useState<"start" | "running" | "end">(
    "running"
  );

  const updateSnake = (direction: TDirection) => {
    setSnake((prevSnake) => {
      const newHead = getNextMove(prevSnake[0], direction);
      console.log("newHead", newHead);
      if (!isValidMove(newHead, prevSnake)) {
        setGameStaus("end");
        return prevSnake;
      }
      if (isPositionEqual(newHead, food)) {
        const newSnake = [newHead, ...prevSnake];
        setFood(getRandomFoodPlace(newSnake));
        return newSnake;
      } else {
        return [newHead, ...prevSnake.slice(0, prevSnake.length - 1)];
      }
    });
  };

  const direction = useKeyPress();

  const isInsideSnake = (pos: TPosition) => {
    return isPositionInsideSnake(pos, snake);
  };

  useEffect(() => {
    if (gameStatus != "running") return;
    updateSnake(direction);
    const id = setInterval(() => {
      updateSnake(direction);
    }, DELAY);

    return () => clearInterval(id);
  }, [direction, gameStatus]);

  return (
    <GameContext.Provider
      value={{ snake, food, gameStatus, BOARD_ROW, BOARD_COL, isInsideSnake }}
    >
      {children}
    </GameContext.Provider>
  );
};
