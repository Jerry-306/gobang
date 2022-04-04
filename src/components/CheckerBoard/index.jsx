import boradValues from '../../store/index'
import { useRecoilValue } from 'recoil'
import { motion } from 'framer-motion'
import Grid from '../Grid'
import './index.css'
export default function CheckerBoard() {
    const variants = {
        hidden: { opacity: 0, scale: 0},
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                duration: 1
            }
        }
    }
    const matrix = useRecoilValue(boradValues);
    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={variants}
            className="board"
        >
        {
            matrix.map((arr, row) =>
                arr.map((val, colum) => (
                    <Grid key={`${row}-${colum}`} row={row} colum={colum} />
                ))
            )
        }
        <div className='center-index'></div>
        </motion.div>
    )
}
