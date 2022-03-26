import { atom } from 'recoil';
// 棋盘数据
const boradValues = atom({
    key: 'boradValues',
    default: new Array(19).fill(0).map(() => new Array(19).fill(0))
})

// 当前棋子颜色 1: 白色  2: 黑色
export const color = atom({
    key: 'color',
    default: 2
})

// 历史记录数据
export const list = atom({
    key: 'list',
    default: []
})

// 是否在复盘中——如果在，则不执行五子棋判断输赢函数，反之执行
export const isReviewing = atom({
    key: 'isReviewing',
    default: false
})

// 是否弹窗
export const showModal = atom({
    key: 'showModal',
    default: false
})

// 本局获胜者
export const winner = atom({
    key: 'winner',
    default: ''
})

// 记录每一局步骤，方便动画进行复盘
export const steps = atom({
    key: 'steps',
    default: []
})

// 用于处理悔棋的steps数组
export const subSteps = atom({
    key: 'subSteps',
    default: []
})

export default boradValues;