import { useSetRecoilState, useRecoilState } from 'recoil'
import boradValues, { color, isReviewing, steps } from '../../store/index'
import './index.css'

const FunctionButtons = () => {
    const [selectedColor, setSelectedColor] = useRecoilState(color);
    const [matrix, setMatrix] = useRecoilState(boradValues);
    const setIsreviewing = useSetRecoilState(isReviewing);
    const [step, setStep] = useRecoilState(steps);
    
    const handleReset = () => {
        let newMatrix = new Array(19).fill(0).map(() => new Array(19).fill(0));
        setMatrix(newMatrix);
        setStep([]);
        setSelectedColor(2);
        setIsreviewing(false);
    }

    const handleGoback = () => {
        let temp = [...step];
        if (temp.length !== 0) {
            //1、 取出上一步的信息
            const [row, colum, value] = temp.pop();
            //2、 更新步骤step
            setStep([...step, [row, colum, 0]]);
            //3、 更新棋盘 matrix
            let arr = [];
            matrix.forEach(array => {
                let subArr = [];
                array.forEach(val => {
                    subArr.push(val);
                })
                arr.push(subArr);
            })
            arr[row][colum] = 0;
            setMatrix(arr);
            //4、更新棋子颜色
            setSelectedColor(value);
        }
    }
    return (
        <div className='btnsContainer'>
            <div 
                className='white' 
                onClick={() => setSelectedColor(1)}
                style={{ border: `2px solid ${selectedColor === 1 ? '#181717': '#f5f6f5'}`}} 
            ></div>
            <div className='goback' onClick={handleGoback}>悔棋</div>
            <div className='reset' onClick={handleReset}>重置</div>
            <div 
                className='black'
                onClick={() => setSelectedColor(2)}
                style={{ border: `2px solid ${selectedColor === 1 ? '#181717': '#f5f6f5'}`}}
            ></div>
      </div>
    )
}

export default FunctionButtons;