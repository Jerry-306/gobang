import ListItem from '../ListItem'
import { list } from '../../store/index'
import { useRecoilValue } from 'recoil'
import './index.css'
const List = () => {
    const listArray = useRecoilValue(list);
    return (
        <div className='list-container'>
            <p>历史记录</p>
            <ListItem index={'序号'} time={'时间'} winner={'获胜者'} />
            {
                listArray.map((item, index) => {
                    const { time, winner } = item;
                    return <ListItem key={time} index={index + 1} time={time} winner={winner} />
                })
            }
        </div>
    )
}

export default List;