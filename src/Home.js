import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import boradValues, {
  list,
  isReviewing,
  showModal,
  winner,
  steps,
  countdown,
} from "./store/index";
import CheckerBoard from "./components/CheckerBoard";
import FunctionButtons from "./components/FunctionButtons";
import List from "./components/List";
import Modal from "./components/Modal";
// import Animation from "./components/Animation";
import alertWinner, { getTime } from "./utils/index";
import "./Home.css";

function Home() {
  const matrix = useRecoilValue(boradValues);
  const [listArray, setListArray] = useRecoilState(list);
  const isreviewing = useRecoilValue(isReviewing);
  const [show, setShow] = useRecoilState(showModal);
  const [curWinner, setCurWinner] = useRecoilState(winner);
  const step = useRecoilValue(steps);
  const time = useRecoilValue(countdown);

  // 五子棋获胜算法
  useEffect(() => {
    // 如果不是进行复盘
    if (isreviewing === false) {
      let res = alertWinner(matrix);
      if (res !== "") {
        setCurWinner(res);
        setShow(true);
        let obj = {};
        obj.time = getTime();
        obj.winner = res;
        obj.step = step;
        setListArray([...listArray, obj]);
      }
    }
  }, [matrix]);
  //
  const [nowTime, setNowTime] = useState("");
  useEffect(() => {
    let timer = setInterval(() => {
      setNowTime(getTime());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });

  const variants = {
    hidden: { opacity: 0, x: "-300px" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 1,
        duration: 1,
      },
    },
  };
  const countdownContainer = {
    hidden: { opacity: 0, x: "300px" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 1,
        duration: 1,
      },
    },
  };

  return (
    <div className="app">
      <CheckerBoard />
      <FunctionButtons />
      <List />
      {/* <Animation /> */}
      {show ? <Modal winner={curWinner} /> : null}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="clock"
      >
        <img className="xiaoxin" alt="xiaoxin" src="xiaoxin.gif" />
        {nowTime}
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={countdownContainer}
        className="countdown"
      >
        ⏱️{time <= 0 ? "时间到" : time + "s"}
      </motion.div>
    </div>
  );
}

export default Home;
