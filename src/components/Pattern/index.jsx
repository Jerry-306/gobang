import React from "react";
import {
  gamePattern,
  difficultyLevel,
  gaming,
  countdown,
} from "../../store/index";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { motion } from "framer-motion";
import "./index.css";

export default function Pattern() {
  const [pattern, setPattern] = useRecoilState(gamePattern);
  const [level, setLevel] = useRecoilState(difficultyLevel);
  const isGaming = useRecoilValue(gaming);
  const setCount = useSetRecoilState(countdown);

  const changeDifficulty = (tag) => {
    setLevel(tag);
    setCount(tag * 5);
  };

  const whileHover = {
    scale: 1.1,
    boxShadow: "0px 0px 0px #dbdbdb inset, 0 0 50px #f9ca6c",
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
      className="pattern-container"
    >
      <motion.div
        whileHover={whileHover}
        whileTap={whileTap}
        className={["pattern-item", pattern === 1 ? "active" : ""].join(" ")}
        onClick={() => setPattern(1)}
      >
        人机对决
      </motion.div>
      <motion.div
        whileHover={whileHover}
        whileTap={whileTap}
        className={["pattern-item", pattern === 2 ? "active" : ""].join(" ")}
        onClick={() => setPattern(2)}
      >
        双人对决
      </motion.div>
      <motion.div
        whileHover={whileHover}
        whileTap={whileTap}
        className={["difficulty-level", level === 3 ? "active" : ""].join(" ")}
        onClick={() => changeDifficulty(3)}
      >
        简单
      </motion.div>
      <motion.div
        whileHover={whileHover}
        whileTap={whileTap}
        className={["difficulty-level", level === 2 ? "active" : ""].join(" ")}
        onClick={() => changeDifficulty(2)}
      >
        中等
      </motion.div>
      <motion.div
        whileHover={whileHover}
        whileTap={whileTap}
        className={["difficulty-level", level === 1 ? "active" : ""].join(" ")}
        onClick={() => changeDifficulty(1)}
      >
        困难
      </motion.div>
      {isGaming ? <div className="mask-disable"></div> : null}
    </motion.div>
  );
}
