import { useRecoilState, useRecoilValue } from "recoil";
import boradValues, {
  color,
  steps,
  subSteps,
  autoPlayTimer,
  gamePattern,
  gaming,
  difficultyLevel,
  isWin11,
} from "../../store/index";
import useHover from "../../Hooks/useHover";
import { autoPlay } from "../../utils/index";
import "./index.css";

export default function Grid({ row, colum, setTimer }) {
  const [hoverRef, isHovering] = useHover();
  const [matrix, setMatrix] = useRecoilState(boradValues);
  const [curColor, setCurColor] = useRecoilState(color);
  const [stepArray, setStepArray] = useRecoilState(steps);
  const [subStepArray, setSubStepArray] = useRecoilState(subSteps);
  const [autoPlayTime, setAutoPlayTime] = useRecoilState(autoPlayTimer);
  const [isGaming, setIsGaming] = useRecoilState(gaming);
  const pattern = useRecoilValue(gamePattern);
  const level = useRecoilValue(difficultyLevel);
  const isWindows11 = useRecoilValue(isWin11);

  const handleClick = () => {
    if (matrix[row][colum] === 0) {
      !isGaming && setIsGaming(true);
      setTimer();
      // 对象深拷贝
      let arr = [];
      matrix.forEach((array) => {
        let temp = [];
        array.forEach((x) => {
          temp.push(x);
        });
        arr.push(temp);
      });
      arr[row][colum] = curColor;
      setMatrix(arr);
      // 更新 step 和 subStep
      const stepArrayNew = [...stepArray, [row, colum, curColor]];
      setStepArray(stepArrayNew);
      const subStepArrayNew = [...subStepArray, [row, colum, curColor]];
      setSubStepArray(subStepArrayNew);
      // 更新下一个棋子颜色
      setCurColor(curColor === 1 ? 2 : 1);
      if (pattern === 1) {
        // 自动下棋
        if (autoPlayTime) {
          clearTimeout(autoPlayTime);
        }
        const autoPlayTimeId = setTimeout(
          () =>
            autoClick(
              arr,
              curColor === 1 ? 2 : 1,
              stepArrayNew,
              subStepArrayNew
            ),
          level * 300
        );
        setAutoPlayTime(autoPlayTimeId);
      }
    }
  };

  const autoClick = (matrix, curColor, stepArrayNew, subStepArrayNew) => {
    const [row, colum] = autoPlay(matrix, curColor);
    // setTimer();
    // 对象深拷贝
    let arr = [];
    matrix.forEach((array) => {
      let temp = [];
      array.forEach((x) => {
        temp.push(x);
      });
      arr.push(temp);
    });
    arr[row][colum] = curColor;
    // 更新 step 和 subStep
    setStepArray([...stepArrayNew, [row, colum, curColor]]);
    setSubStepArray([...subStepArrayNew, [row, colum, curColor]]);
    setMatrix(arr);
    // 更新下一个棋子颜色
    setCurColor(curColor === 1 ? 2 : 1);
  };

  return (
    <div ref={hoverRef} className="container" onClick={handleClick}>
      {isWindows11
        ? matrix[row][colum] !== 0
          ? matrix[row][colum] === 1
            ? "🐻‍❄️"
            : "🐻"
          : isHovering
          ? "💢"
          : ""
        : matrix[row][colum] !== 0
        ? matrix[row][colum] === 1
          ? "⚪"
          : "⚫"
        : ""}
    </div>
  );
}
