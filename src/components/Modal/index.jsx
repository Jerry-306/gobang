import { showModal } from '../../store/index'
import { useSetRecoilState } from 'recoil';
import './index.css'

export default function Modal(props) {
  const winner = props.winner;
  const setShow = useSetRecoilState(showModal);
  const handleClose = () => {
    setShow(false);
  }
  return (
    <div className='modal-container'>
        <div className='modal-content'>
            <p className='modal-title'>恭喜</p>
            <span className='modal-winner'>{winner === '白子' ? '⚪' : '⚫'}</span>
            <p className='modal-desc'>获得本局胜利！</p>
            <span className='modal-close' onClick={handleClose}>❌</span>
        </div>
    </div>
  )
}
