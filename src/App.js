import { useEffect } from 'react'
import CheckerBoard from './components/CheckerBoard'
import { useRecoilState } from 'recoil'
import boradValues, { color } from './store/index'
import alertWinner from './isWin'
import './App.css';

function App() {
  const [selectedColor, setSelectedColor] = useRecoilState(color);
  const [matrix, setMatrix]  = useRecoilState(boradValues);
  // 五子棋获胜算法
  useEffect(()=>{
    let res = alertWinner(matrix);
    if (res !== '') {
      window.alert(`恭喜${res}获胜！`)
    }
  }, [matrix])
  const handleReset = () => {
    let newMatrix = new Array(12).fill(0).map(() => new Array(12).fill(0));
    setMatrix(newMatrix);
  }
  return (
    <div className='app'>
      <CheckerBoard />
      <div className='choose-color'>
        <div 
          className='white' 
          onClick={() => setSelectedColor(1)}
          style={{ border: `2px solid ${selectedColor === 1 ? '#181717': '#f5f6f5'}`}} 
        ></div>
        <div className='reset' onClick={handleReset}>重置</div>
        <div 
          className='black'
          onClick={() => setSelectedColor(2)}
          style={{ border: `2px solid ${selectedColor === 1 ? '#181717': '#f5f6f5'}`}}
        ></div>
      </div>
    </div>
  );
}

export default App;
