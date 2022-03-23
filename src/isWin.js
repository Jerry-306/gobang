function isWin (matrix, row, colum, val) {
    let n = matrix.length;
    let count = 0;
    // 行是否有五个棋子
    for (let j = colum; j < n; j++) {
        if (matrix[row][j] === val) {
            count++;
            if (count === 5) {
                return true;
            }
        } else {
            break;
        }
    }
    count = 0;
    // 列是否有五个棋子
    for (let i = row; i < n; i++) {
        if (matrix[i][colum] === val) {
            count++;
            if (count === 5) {
                return true;
            }
        } else {
            break;
        }
    }
    count = 0;
    // 左下角是否有五个棋子
    for (let i = row, j = colum; i < n && j >= 0; i++, j--) {
        if (matrix[i][j] === val) {
            count++;
            if (count === 5) {
                return true;
            }
        } else {
            break;
        }
    }
    count = 0;
    // 右下角是否有五个棋子
    for (let i = row, j = colum; i < n && j < n; i++, j++) {
        if (matrix[i][j] === val) {
            count++;
            if (count === 5) {
                return true;
            }
        } else {
            break;
        }
    }
    // 如果始终没有找到5个棋子连成一排
    return false;
}

function alertWinner (matrix) {
    let winner = '';
    /*算法核心代码 */
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 12; j++) {
        let val = matrix[i][j];
        if (val !== 0) {
          if (isWin(matrix, i, j, val)) {
            winner = val === 1 ? '白子' : '黑子';
            return winner;
          }
        }
      }
    }
    return winner;
}

export default alertWinner;