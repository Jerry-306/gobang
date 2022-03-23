import boradValues from '../../store/index'
import { useRecoilValue } from 'recoil'
import Grid from '../Grid'
import './index.css'
export default function CheckerBoard() {
    const matrix = useRecoilValue(boradValues);
    return (
        <div className="board">
        {
            matrix.map((arr, row) =>
                arr.map((val, colum) => (
                    <Grid key={`${row}-${colum}`} row={row} colum={colum} />
                ))
            )
        }
        <div className='center-index'></div>
        </div>
    )
}
