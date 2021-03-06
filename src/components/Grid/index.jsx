import { useRecoilState } from 'recoil'
import { motion } from 'framer-motion'
import boradValues, { color, steps, subSteps } from '../../store/index'
import './index.css'

export default function Grid({row, colum, setTimer}) {
  const [matrix, setMatrix] = useRecoilState(boradValues);
  const [curColor, setCurColor] = useRecoilState(color);
  const [stepArray, setStepArray] = useRecoilState(steps);
  const [subStepArray, setSubStepArray] = useRecoilState(subSteps);

  const handleClick = () => {
    if (matrix[row][colum] === 0) {
      setTimer();
      // 对象深拷贝
      let arr = [];
      matrix.forEach( array => {
        let temp = [];
        array.forEach( x => {
          temp.push(x);
        })
        arr.push(temp);
      })
      arr[row][colum] = curColor;
      setMatrix(arr);
      // 更新 step 和 subStep
      setStepArray([...stepArray, [row, colum, curColor]]);
      setSubStepArray([...subStepArray, [row, colum, curColor]]);
      // 更新下一个棋子颜色
      setCurColor(curColor === 1 ? 2 : 1);
    }
  }

  const variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  }
  
  return (
    <div className='container' onClick={handleClick}>
      <div className='div1'></div>
      <div className='div2'></div>
      <div className='div3'></div>
      <div className='div4'></div>
      {
        matrix[row][colum] !== 0
        ? <motion.div className='cicle' 
            initial="hidden"
            animate="visible"
            variants={variants}
            style={
              { backgroundColor: matrix[row][colum] === 1 ? '#f5f6f5' : '#181717'}
            }
          ></motion.div>
        : null
      }
    </div>
  )
}
