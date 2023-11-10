import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { motion } from "framer-motion";
import boradValues, {
  list,
  isReviewing,
  showModal,
  winner,
  steps,
  countdown,
  color,
  timer,
  autoPlayTimer,
  gameOver,
  gaming,
  difficultyLevel,
} from "../../store/index";
import CheckerBoard from "../../components/CheckerBoard";
import TimeOutModal from "../../components/TimeOutModal";
import List from "../../components/List";
import Modal from "../../components/Modal";
import FunctionMenu from "../../components/FunctionMenu";
// import Animation from "./components/Animation";
import alertWinner, { getTime } from "../../utils/index";
import "./index.css";

function Home() {
  const matrix = useRecoilValue(boradValues);
  const [listArray, setListArray] = useRecoilState(list);
  const isreviewing = useRecoilValue(isReviewing);
  const [show, setShow] = useRecoilState(showModal);
  const [curWinner, setCurWinner] = useRecoilState(winner);
  const step = useRecoilValue(steps);
  const [count, setCount] = useRecoilState(countdown);
  const player = useRecoilValue(color);
  const [time, setTime] = useRecoilState(timer);
  const [autoPlayTime, setAutoPlayTime] = useRecoilState(autoPlayTimer);
  const setGameOver = useSetRecoilState(gameOver);
  const setGaming = useSetRecoilState(gaming);
  const level = useRecoilValue(difficultyLevel);

  // 五子棋获胜算法
  useEffect(() => {
    // 如果不是进行复盘
    if (isreviewing === false) {
      let res = alertWinner(matrix);
      if (res !== "") {
        setGaming(false);
        setCurWinner(res);
        setShow(true);
        setCount(level * 5);
        if (time) {
          clearInterval(time);
        }
        setTime(null);
        if (autoPlayTime) {
          clearTimeout(autoPlayTime);
        }
        setAutoPlayTime(null);
        let obj = {};
        obj.time = getTime();
        obj.winner = res;
        obj.step = step;
        const array = [...listArray];
        array.unshift(obj);
        setListArray(array);
        setGameOver(true);
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
  }, []);

  const setStorage = () => {
    localStorage.setItem("historyList", JSON.stringify(listArray));
  };
  useEffect(() => {
    window.addEventListener("beforeunload", setStorage);
    return () => {
      window.removeEventListener("beforeunload", setStorage);
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
      <List />
      <FunctionMenu />
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
        ⏱️{count <= 0 ? "时间到" : count + " s"}
      </motion.div>
      {count <= 0 ? <TimeOutModal player={player} /> : null}
    </div>
  );
}

export default Home;
