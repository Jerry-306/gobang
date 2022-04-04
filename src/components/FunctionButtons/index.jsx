import { useSetRecoilState, useRecoilState } from 'recoil'
import { motion } from 'framer-motion'
import boradValues, { color, isReviewing, steps, subSteps, subStepsSteps } from '../../store/index'
import './index.css'

const FunctionButtons = () => {
    const [selectedColor, setSelectedColor] = useRecoilState(color);
    const [matrix, setMatrix] = useRecoilState(boradValues);
    const setIsreviewing = useSetRecoilState(isReviewing);
    const [step, setStep] = useRecoilState(steps);
    const [subStep, setSubStep] = useRecoilState(subSteps);
    
    const handleReset = () => {
        let newMatrix = new Array(19).fill(0).map(() => new Array(19).fill(0));
        setMatrix(newMatrix);
        setStep([]);
        setSelectedColor(2);
        setIsreviewing(false);
    }

    const handleGoback = () => {
        let temp = [...subStep];
        if (temp.length !== 0) {
            //1、 取出上一步的信息
            const [row, colum, value] = temp.pop();
            //2、 更新步骤step 和 subStep
            setStep([...step, [row, colum, 0]]);
            setSubStep(temp);
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
    const whileHover = {scale: 1.2};
    const whileTap = {scale: 0.8};
    const variants = {
        hidden: { opacity: 0, x: '300px' },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 1
            }
        },
    }
    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={variants}
            className='btnsContainer'
        >
            <motion.div 
                whileHover={whileHover}
                whileTap={whileTap}
                className='white' 
                onClick={() => setSelectedColor(1)}
                style={{ border: `2px solid ${selectedColor === 1 ? '#181717': '#f5f6f5'}`}} 
            ></motion.div>
            <motion.div whileHover={whileHover} whileTap={whileTap} className='goback' onClick={handleGoback}>悔棋</motion.div>
            <motion.div whileHover={whileHover} whileTap={whileTap} className='reset' onClick={handleReset}>重置</motion.div>
            <motion.div 
                whileHover={whileHover} 
                whileTap={whileTap}
                className='black'
                onClick={() => setSelectedColor(2)}
                style={{ border: `2px solid ${selectedColor === 1 ? '#181717': '#f5f6f5'}`}}
            ></motion.div>
      </motion.div>
    )
}

export default FunctionButtons;