import { atom } from "recoil";
// 棋盘数据
const boradValues = atom({
  key: "boradValues",
  default: new Array(19).fill(0).map(() => new Array(19).fill(0)),
});

// 当前棋子颜色 1: 白色  2: 黑色
export const color = atom({
  key: "color",
  default: 2,
});

// 历史记录数据
export const list = atom({
  key: "list",
  default: JSON.parse(localStorage.getItem("historyList")) || [],
});

// 是否在复盘中——如果在，则不执行五子棋判断输赢函数，反之执行
export const isReviewing = atom({
  key: "isReviewing",
  default: false,
});

// 是否弹窗
export const showModal = atom({
  key: "showModal",
  default: false,
});

// 本局获胜者
export const winner = atom({
  key: "winner",
  default: "",
});

// 记录每一局步骤，方便动画进行复盘
export const steps = atom({
  key: "steps",
  default: [],
});

// 用于处理悔棋的steps数组
export const subSteps = atom({
  key: "subSteps",
  default: [],
});

// 倒计时
export const countdown = atom({
  key: "countdown",
  default: 15,
});

// 倒计时的定时器
export const timer = atom({
  key: "timer",
  default: null,
});

// 自动下棋的定时器
export const autoPlayTimer = atom({
  key: "autoPlayTimer",
  default: null,
});

// 游戏结束标识
export const gameOver = atom({
  key: "gameOver",
  default: false,
});

// 复盘是否结束
export const reviewEnd = atom({
  key: "reviewEnd",
  default: true,
});

// 游戏模式选择 1：单人模式；2：双人对决
export const gamePattern = atom({
  key: "gamePattern",
  default: 1,
});

// 游戏难度 3：简单；2：中等；1：困难
export const difficultyLevel = atom({
  key: "difficultyLevel",
  default: 3,
});

// 游戏进行中
export const gaming = atom({
  key: "gaming",
  default: false,
});

//  是否是win11版本
export const isWin11 = atom({
  key: "isWin11",
  default: false,
});

export default boradValues;
