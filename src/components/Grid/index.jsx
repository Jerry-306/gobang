import{ useState } from 'react';
import { useRecoilState } from 'recoil'
import boradValues, { color } from '../../store/index'
import './index.css'

export default function Grid({row, colum}) {
  const [matrix, setMatrix] = useRecoilState(boradValues);
  const [curColor, setCurColor] = useRecoilState(color);
  const [show, setShow] = useState();
  const handleClick = () => {
    setShow(true);
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
    setCurColor(curColor === 1 ? 2 : 1);
  }

  return (
    <div className='container' onClick={handleClick}>
      {/* <div className='left-line'></div>
      <div className='right-line'></div> */}
      <div className='div1'></div>
      <div className='div2'></div>
      <div className='div3'></div>
      <div className='div4'></div>
      {
      show
        ? <div className='cicle' 
          style={
            {opacity: matrix[row][colum] === 0 ? 0 : 1, backgroundColor: matrix[row][colum] === 1 ? '#f5f6f5' : '#181717'}
          }></div>
        : null
      }
    </div>
  )
}
