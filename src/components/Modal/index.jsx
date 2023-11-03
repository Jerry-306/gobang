import { showModal } from "../../store/index";
import { useSetRecoilState } from "recoil";
import { motion } from "framer-motion";
import "./index.css";

export default function Modal(props) {
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      // scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  };
  const subVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring", // 弹簧
        duration: 0.4,
        bounce: 0.4, // 弹性
        damping: 6, // 振荡
      },
    },
  };
  const winner = props.winner;
  const setShow = useSetRecoilState(showModal);
  const handleClose = () => {
    setShow(false);
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="modal-container"
    >
      <motion.div
        variants={subVariants}
        initial="hidden"
        animate="visible"
        className="modal-content"
      >
        <img className="modal_xiaoxin" alt="xiaoxin" src="xiaoxin_win.gif" />
        <p className="modal-title">恭喜</p>
        <span className="modal-winner">{winner === "白子" ? "🐻‍❄️" : "🐻"}</span>
        <p className="modal-desc">获得本局胜利</p>
        <span className="modal-close" onClick={handleClose}>
          ❌
        </span>
      </motion.div>
    </motion.div>
  );
}
