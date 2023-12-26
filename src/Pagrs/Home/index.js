import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
  isWin11,
} from "../../store/index";
import CheckerBoard from "../../components/CheckerBoard";
import TimeOutModal from "../../components/TimeOutModal";
import List from "../../components/List";
import Modal from "../../components/Modal";
import FunctionMenu from "../../components/FunctionMenu";
import Clock from "../../components/Clock";
import CountDown from "../../components/CountDown";
// import Animation from "../../components/Animation";
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
  const setIsWin11 = useSetRecoilState(isWin11);

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

  const setStorage = () => {
    localStorage.setItem("historyList", JSON.stringify(listArray));
  };
  useEffect(() => {
    window.addEventListener("beforeunload", setStorage);
    return () => {
      window.removeEventListener("beforeunload", setStorage);
    };
  });

  useEffect(() => {
    navigator.userAgentData
      .getHighEntropyValues(["platformVersion"])
      .then((ua) => {
        if (navigator.userAgentData.platform === "Windows") {
          const majorPlatformVersion = parseInt(
            ua.platformVersion.split(".")[0]
          );
          if (majorPlatformVersion >= 13) {
            setIsWin11(true);
          }
        }
      });
  }, []);

  return (
    <div className="app">
      <CheckerBoard />
      <List />
      <FunctionMenu />
      {/* <Animation /> */}
      {show ? <Modal winner={curWinner} /> : null}
      <Clock />
      <CountDown />
      {count <= 0 ? <TimeOutModal player={player} /> : null}
    </div>
  );
}

export default Home;
