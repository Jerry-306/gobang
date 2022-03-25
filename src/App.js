import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import boradValues, { list, isReviewing } from './store/index'
import CheckerBoard from './components/CheckerBoard'
import FunctionButtons from './components/FunctionButtons'
import List from './components/List'
import alertWinner, { getTime } from './utils/isWin'
import './App.css';

function App() {
  const matrix  = useRecoilValue(boradValues);
  const [ listArray, setListArray] = useRecoilState(list);
  const isreviewing = useRecoilValue(isReviewing);
  // 五子棋获胜算法
  useEffect(()=>{
    // 如果不是进行复盘
    if (isreviewing === false) {
      let res = alertWinner(matrix);
      if (res !== '') {
        window.alert(`恭喜${res}获胜！`);
        let obj = {};
        obj.time = getTime();
        obj.winner = res;
        obj.step = matrix;
        setListArray([...listArray, obj]);
      }
    }
  }, [matrix])
  return (
    <div className='app'>
      <CheckerBoard />
      <FunctionButtons />
      <List />
    </div>
  );
}

export default App;
