import { useSetRecoilState, useRecoilState } from 'recoil'
import boradValues, { color, isReviewing, steps } from '../../store/index'
import './index.css'

const FunctionButtons = () => {
    const [selectedColor, setSelectedColor] = useRecoilState(color);
    const setMatrix = useSetRecoilState(boradValues);
    const setIsreviewing = useSetRecoilState(isReviewing);
    const setStep = useSetRecoilState(steps);
    
    const handleReset = () => {
        let newMatrix = new Array(19).fill(0).map(() => new Array(19).fill(0));
        setMatrix(newMatrix);
        setStep([]);
        setSelectedColor(2);
        setIsreviewing(false);
    }
    
    return (
        <div className='btnsContainer'>
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
    )
}

export default FunctionButtons;