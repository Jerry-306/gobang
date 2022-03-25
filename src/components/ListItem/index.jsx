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
        setMatrix(listArray[index - 1].step);
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