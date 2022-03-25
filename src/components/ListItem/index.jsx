import './index.css'

const ListItem = (props) => {
    const {index, time, winner} = props;
    return (
        <div className='listitem-container'>
            <div className='listitem-index'>{index}</div>
            <div className='listitem-time'>{time}</div>
            <div className='listitem-winner'>{winner}</div>
        </div>
    )
}

export default ListItem;