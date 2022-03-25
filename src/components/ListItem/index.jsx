import boradValues, { list, isReviewing } from '../../store'
import { useRecoilState, useRecoilValue } from 'recoil'
import './index.css'

const ListItem = (props) => {
    const {index, time, winner} = props;
    const [ matrix, setMatrix ] = useRecoilState(boradValues);
    const listArray = useRecoilValue(list);
    const [ isreviewing , setIsreviewing] = useRecoilState(isReviewing);
    const handleReview = () => {
        setIsreviewing(true);
        // 防止出现对象浅复制
        let subMatrix = new Array(19).fill(0).map(() => new Array(19).fill(0));
        let emptyMatrix = new Array(19).fill(0).map(() => new Array(19).fill(0));
        // 如果当前棋盘不为空，棋盘先清零
        setMatrix(emptyMatrix);
        // 步骤
        let steps = listArray[index - 1].step;
        let n = steps.length;
        // 每隔一秒复现一次棋子位置 —— 内存消耗会有点大
        for (let i = 0; i < n; i++) {
            const [row, colum, value] = steps[i];
            setTimeout(() => {
                subMatrix[row][colum] = value;
                let arr = [];
                subMatrix.forEach( array => {
                    let temp = [];
                    array.forEach( x => {
                      temp.push(x);
                    })
                    arr.push(temp);
                })
                // 不能直接将subMatrix更新给matrix，因为这会使subMatrix变成只读矩阵
                setMatrix(arr);
            }, i*1000);
        }
    }
    return (
        <div className='listitem-container'>
            <div className='listitem-index'>{index}</div>
            <div className='listitem-time'>{time}</div>
            <div className='listitem-winner'>{
                winner === '白子'? '⚪' : '⚫'
            }</div>
            <div className='listitem-review' onClick={handleReview}>👁️‍🗨️</div>
        </div>
    )
}

export default ListItem;