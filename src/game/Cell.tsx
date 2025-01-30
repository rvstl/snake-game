import { isPositionEqual, TPosition, useGame } from "./GameProvider";

interface Props {
  pos: TPosition;
}
export const Cell = ({ pos }: Props) => {
  const { food, isInsideSnake } = useGame();

  // console.log("pos", pos, isInsideSnake(pos));
  // console.log("food", food);

  const snakeWidth = isInsideSnake(pos);
  return (
    <div className="cell">
      {isPositionEqual(pos, food) && (
        <div style={{ backgroundColor: "blue", borderRadius: "100%" }}></div>
      )}
      {snakeWidth > -1 && (
        <div
          style={{ backgroundColor: "green", width: `${snakeWidth}%` }}
        ></div>
      )}
    </div>
  );
};
