import boradValues, {
  list,
  isReviewing,
  reviewEnd,
  isWin11,
} from "../../store/index";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { motion } from "framer-motion";
import "./index.css";

const ListItem = (props) => {
  const { index, time, winner } = props;
  const setMatrix = useSetRecoilState(boradValues);
  const listArray = useRecoilValue(list);
  const setIsreviewing = useSetRecoilState(isReviewing);
  const [isReviewEnd, setisReviewEnd] = useRecoilState(reviewEnd);
  const isWindows11 = useRecoilValue(isWin11);

  const handleReview = () => {
    if (isReviewEnd === false) {
      return;
    }
    setisReviewEnd(false);
    setIsreviewing(true);
    // 防止出现对象浅复制
    let subMatrix = new Array(19).fill(0).map(() => new Array(19).fill(0));
    let emptyMatrix = new Array(19).fill(0).map(() => new Array(19).fill(0));
    // 如果当前棋盘不为空，棋盘先清零
    setMatrix(emptyMatrix);
    // 步骤
    let steps = listArray[index - 1].step;
    let n = steps.length;
    // 每隔一秒复现一次棋子位置 —— 内存消耗会有点大
    for (let i = 0; i < n; i++) {
      const [row, colum, value] = steps[i];
      setTimeout(() => {
        subMatrix[row][colum] = value;
        let arr = [];
        subMatrix.forEach((array) => {
          let temp = [];
          array.forEach((x) => {
            temp.push(x);
          });
          arr.push(temp);
        });
        // 不能直接将subMatrix更新给matrix，因为这会使subMatrix变成只读矩阵
        setMatrix(arr);
        // 复盘结束
        if (i === n - 1) {
          setisReviewEnd(true);
        }
      }, i * 1000);
    }
  };

  const item = {
    hidden: { x: -300 },
    show: {
      x: 0,
      transition: {
        type: "spring", // 弹簧
        duration: 1,
        bounce: 0.4, // 弹性
        damping: 9, // 振荡
      },
    },
  };
  const hover = {
    scale: 1.05,
    boxShadow: "0px 0px 0px #dbdbdb inset, 0 0 30px #f9ca6c",
  };

  return (
    <motion.div
      variants={item}
      initial="hidden"
      animate="show"
      whileHover={hover}
      className="listitem-container"
    >
      <div className="listitem-index">{index}</div>
      <div className="listitem-time">{time}</div>
      {isWindows11 ? (
        <div className="listitem-winner">{winner === "白子" ? "🐻‍❄️" : "🐻"}</div>
      ) : (
        <div className="listitem-winner">{winner === "白子" ? "⚪" : "⚫"}</div>
      )}
      <div className="listitem-review" onClick={handleReview}>
        👁️‍🗨️
      </div>
    </motion.div>
  );
};

export default ListItem;
