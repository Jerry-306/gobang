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
    for (let i = 0; i < 19; i++) {
      for (let j = 0; j < 19; j++) {
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

export function getTime () {
    let time = new Date();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;
    return `${hour}:${minute}:${second}`
}

export default alertWinner;
