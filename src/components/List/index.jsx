import ListItem from '../ListItem'
import { list } from '../../store/index'
import { useRecoilValue } from 'recoil'
import './index.css'
const List = () => {
    const listArray = useRecoilValue(list);
    return (
        <div className='list-container'>
            <p>历史记录</p>
            <div className='listheader-container'>
                <div className='listheader-index'>序号</div>
                <div className='listheader-time'>时间</div>
                <div className='listheader-winner'>赢家</div>
                <div className='listheader-review' >复盘</div>
            </div>
            <div className='list-scrollContainer'>
                {
                    listArray.map((item, index) => {
                        const { time, winner } = item;
                        return <ListItem key={time} index={index + 1} time={time} winner={winner} />
                    })
                }
            </div>
        </div>
    )
}

export default List;