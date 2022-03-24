import { atom } from 'recoil';

const boradValues = atom({
    key: 'boradValues',
    default: new Array(19).fill(0).map(() => new Array(19).fill(0))
})

// 1: 白色  2: 黑色
export const color = atom({
    key: 'color',
    default: 2
})

export default boradValues;