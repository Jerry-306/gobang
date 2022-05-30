import boradValues, { countdown, timer } from "../../store/index";
import { useRecoilState, useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import Grid from "../Grid";
import "./index.css";
export default function CheckerBoard() {
  const variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
      },
    },
  };
  const [count, setCount] = useRecoilState(countdown);
  const [time, setTime] = useRecoilState(timer);
  function setTimer() {
    if (time) {
      clearInterval(time);
    }
    let total = 15;
    setCount(total--);
    let id = setInterval(() => {
      setCount(total--);
      if (total < 0) {
        clearInterval(id);
        setTime(null);
      }
    }, 1000);
    setTime(id);
  }
  const matrix = useRecoilValue(boradValues);
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="board"
    >
      {matrix.map((arr, row) =>
        arr.map((val, colum) => (
          <Grid
            key={`${row}-${colum}`}
            row={row}
            colum={colum}
            setTimer={setTimer}
          />
        ))
      )}
      <div className="center"></div>
      <div className="left-top"></div>
      <div className="right-top"></div>
      <div className="left-bottom"></div>
      <div className="right-bottom"></div>
    </motion.div>
  );
}
