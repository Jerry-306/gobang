import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import boardValues, {
  color,
  isReviewing,
  steps,
  subSteps,
  timer,
  countdown,
  gameOver,
  reviewEnd,
  gaming,
  difficultyLevel,
} from "../../store/index";
import "./index.css";

const FunctionButtons = () => {
  const [selectedColor, setSelectedColor] = useRecoilState(color);
  const [matrix, setMatrix] = useRecoilState(boardValues);
  const setReviewing = useSetRecoilState(isReviewing);
  const [step, setStep] = useRecoilState(steps);
  const [subStep, setSubStep] = useRecoilState(subSteps);
  const [time, setTime] = useRecoilState(timer);
  const [count, setCount] = useRecoilState(countdown);
  const setGameOver = useSetRecoilState(gameOver);
  const isReviewEnd = useRecoilValue(reviewEnd);
  const setGaming = useSetRecoilState(gaming);
  const level = useRecoilValue(difficultyLevel);

  const handleReset = () => {
    let newMatrix = new Array(19).fill(0).map(() => new Array(19).fill(0));
    setMatrix(newMatrix);
    setStep([]);
    setSelectedColor(2);
    setReviewing(false);
    setCount(level * 5);
    if (time) {
      clearInterval(time);
    }
    setTime(null);
    setGameOver(false);
    setGaming(false);
  };

  const handleGoback = () => {
    let temp = [...subStep];
    if (temp.length !== 0) {
      //1、 取出上一步的信息
      const [row, colum, value] = temp.pop();
      //2、 更新步骤step 和 subStep
      setStep([...step, [row, colum, 0]]);
      setSubStep(temp);
      //3、 更新棋盘 matrix
      let arr = [];
      matrix.forEach((array) => {
        let subArr = [];
        array.forEach((val) => {
          subArr.push(val);
        });
        arr.push(subArr);
      });
      arr[row][colum] = 0;
      setMatrix(arr);
      //4、更新棋子颜色
      setSelectedColor(value);
      if (time) {
        clearInterval(time);
      }
      setCount(15);
      const id = setInterval(() => {
        setCount((n) => n - 1);
        if (count <= 0) {
          clearInterval(id);
          setTime(null);
        }
      }, 1000);
      setTime(id);
    }
  };

  const whileHover = {
    scale: 1.1,
    boxShadow: "0px 0px 10px #dbdbdb inset, 0 0 50px #f9ca6c",
  };
  const whileTap = { scale: 0.9 };
  const variants = {
    hidden: { opacity: 0, x: "300px" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      },
    },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="btnsContainer"
    >
      <motion.div
        whileHover={whileHover}
        whileTap={whileTap}
        className="white"
        onClick={() => setSelectedColor(1)}
      >
        {selectedColor === 1 && "👻"}
      </motion.div>
      <motion.div
        whileHover={whileHover}
        whileTap={whileTap}
        className="goback"
        onClick={handleGoback}
      >
        悔棋
      </motion.div>
      <motion.div
        whileHover={whileHover}
        whileTap={whileTap}
        className="reset"
        onClick={handleReset}
      >
        重置
      </motion.div>
      <motion.div
        whileHover={whileHover}
        whileTap={whileTap}
        className="black"
        onClick={() => setSelectedColor(2)}
      >
        {selectedColor === 2 && "👻"}
      </motion.div>
      {isReviewEnd ? null : <div className="mask-disable"></div>}
    </motion.div>
  );
};

export default FunctionButtons;
