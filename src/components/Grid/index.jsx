import{ useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil'
import boradValues, { color } from '../../store/index'
import './index.css'

export default function Grid({row, colum}) {
  const [matrix, setMatrix] = useRecoilState(boradValues);
  const curColor = useRecoilValue(color);
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
  }

  return (
    <div className='container' onClick={handleClick}>
      {
      show
        ? <div className='cicle' style={{backgroundColor: matrix[row][colum] === 1 ? '#f5f6f5' : '#181717'}}></div>
        : null
      }
    </div>
  )
}
