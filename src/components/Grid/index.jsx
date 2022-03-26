import { useRecoilState } from 'recoil'
import boradValues, { color, steps } from '../../store/index'
import './index.css'

export default function Grid({row, colum}) {
  const [matrix, setMatrix] = useRecoilState(boradValues);
  const [curColor, setCurColor] = useRecoilState(color);
  const [stepArray, setStepArray] = useRecoilState(steps);

  const handleClick = () => {
    if (matrix[row][colum] === 0) {
      let arr = [];
      matrix.forEach( array => {
        let temp = [];
        array.forEach( x => {
          temp.push(x);
        })
        arr.push(temp);
      })
      arr[row][colum] = curColor;
      // 对象深拷贝
      setMatrix(arr);
      setStepArray([...stepArray, [row, colum, arr[row][colum]]]);
      setCurColor(curColor === 1 ? 2 : 1);
    }
  }

  return (
    <div className='container' onClick={handleClick}>
      <div className='div1'></div>
      <div className='div2'></div>
      <div className='div3'></div>
      <div className='div4'></div>
      {
        matrix[row][colum] !== 0
        ? <div className='cicle' 
          style={
            { backgroundColor: matrix[row][colum] === 1 ? '#f5f6f5' : '#181717'}
          }></div>
        : null
      }
    </div>
  )
}
