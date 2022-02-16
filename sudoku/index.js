function solve (board) {
    let sudoku = new Sudoku(board);
    console.log("Input Board:");
    sudoku.print();
    sudoku.solve();

    console.log("");
    console.log("Solution:");
    sudoku.print();

    return board;
}

class Sudoku {
    constructor(board) {
        this.board = board;
    }

    intersection (a, b, c) {
        // console.log("intersection:");
        // console.log(a);
        // console.log(b);
        // console.log(c);
        let inters = new Set([...a].filter (value => { return b.has(value) && c.has(value) } ));

        // console.log("inters:");
        // console.log(inters);
        return inters;
    }

    checkColumn(j, i) {
        let possibilities = new Set();
        for (let k=1; k<=9; k++) {
            possibilities.add('' + k);
        }

        for (let k=0; k<9; k++) {
            if (this.board[k][j] !== '.') {
                possibilities.delete(this.board[k][j]);
            }
        }

        return possibilities;
    }

    checkRow(i, j) {
        let possibilities = new Set();
        for (let k=1; k<=9; k++) {
            possibilities.add('' + k);
        }

        for (let k=0; k<9; k++) {
            if (this.board[i][k] !== '.') {
                possibilities.delete(this.board[i][k]);
            }
        }

        return possibilities;
    }

    checkGrid(i, j) {
        let possibilities = new Set();
        let startI;
        let startJ;
        let intI = parseInt(i);
        let intJ = parseInt(j);

        for (let k=1; k<=9; k++) {
            possibilities.add('' + k);
        }

        if (0 <= intI && intI < 3) {
            startI = 0;
        } else if (3 <= intI && intI < 6) {
            startI = 3;
        } else {
            startI = 6;
        }

        // console.log("checking grid for i, j: " + intI + ", " + intJ);
        if (0 <= intJ && intJ < 3) {
            startJ = 0;
        } else if (3 <= intJ && intJ < 6) {
            startJ = 3;
        } else {
            startJ = 6;
        }

        for (let x=startI; x<startI + 3; x++) {
            for (let y=startJ; y<startJ + 3; y++) {
                // console.log("checking grid: " + x + ", " + y + ": " + this.board[x][y]);
                if (this.board[x][y] !== '.') {
                    possibilities.delete(this.board[x][y]);
                }
            }
        }

        return possibilities;
    }

    countBlanks() {
        let numBlanks = 0;

        for (let i=0; i<this.board.length; i++) {
            for (let j=0; j<this.board[i].length; j++) {
                if (this.board[i][j] === '.') {
                    numBlanks++;
                }
            }
        }

        return numBlanks;
    }

    // rowPossiblities(row, j, cellPossibilities) {
    //     let set = new Set();

    //     for (let i=0; i<this.board[row].length; i++) {
    //         if (i !== j) {
    //             let colPoss = this.checkColumn(j, i);
    //             let rowPoss = this.checkRow(i, j);
    //             let gridPoss = this.checkGrid(i, j);
    //             let inters = this.intersection (colPoss, rowPoss, gridPoss);

    //         }
    // }
    //     }
    // }

    solve() {
        let numBlanks = this.countBlanks();

        while (numBlanks > 0) {
            for (let i=0; i<this.board.length; i++) {
                for (let j=0; j<this.board[i].length; j++) {
                    if (this.board[i][j] === '.') {
                        let colPoss = this.checkColumn(j, i);
                        let rowPoss = this.checkRow(i, j);
                        let gridPoss = this.checkGrid(i, j);
                        let inters = this.intersection (colPoss, rowPoss, gridPoss);
                        if (inters.size === 1) {
                            this.board[i][j] = inters.values().next().value;
                            numBlanks--;
                        } else if (inters.size === 0) {
                            throw Error ("Board not solvable");
                        } else {
                            // NEED TO IMPLEMENT THIS
                            // this.rowPossiblities(i, j, inters);
                        }
                    }
                }
            }
        }

        return this.board;
    }

    // solve() {
    //     let numBlanks = this.countBlanks();

    //     while (numBlanks > 0) {
    //         for (let i=0; i<this.board.length; i++) {
    //             for (let j=0; j<this.board[i].length; j++) {
    //                 if (this.board[i][j] === '.') {
    //                     let colPoss = this.checkColumn(j, i);
    //                     let rowPoss = this.checkRow(i, j);
    //                     let gridPoss = this.checkGrid(i, j);
    //                     let inters = this.intersection (colPoss, rowPoss, gridPoss);
    //                     if (inters.size === 1) {
    //                         this.board[i][j] = inters.values().next().value;
    //                         numBlanks--;
    //                     } else if (inters.size === 0) {
    //                         throw Error ("Board not solvable");
    //                     } 
    //                 }
    //             }
    //         }
    //     }

    //     return this.board;
    // }

    print() {
        for (let i=0; i<this.board.length; i++) {
            for (let j=0; j<this.board[i].length; j++) {
                process.stdout.write(this.board[i][j] + ", ");
                if (j%3 === 2) {
                    process.stdout.write("   ");
                }
            }
            console.log("");
            if (i%3 === 2) {
                console.log("");
            }
        }
    
    }
}

// let board = [
// ['1', '4', '7',   '2', '5', '8',   '3', '6', '.'],
// ['2', '.', '8',   '3', '6', '9',   '1', '4', '7'],
// ['3', '6', '9',   '1', '.', '7',   '2', '5', '8'],

// ['.', '7', '1',   '5', '8', '2',   '.', '9', '3'],
// ['5', '8', '2',   '6', '9', '3',   '4', '.', '1'],
// ['.', '9', '3',   '4', '7', '1',   '5', '8', '.'],

// ['7', '1', '4',   '8', '2', '.',   '9', '3', '6'],
// ['8', '.', '5',   '9', '3', '6',   '7', '1', '4'],
// ['9', '3', '6',   '7', '1', '4',   '8', '2', '5']
// ];

// let answer = [
//     ['1', '4', '7',   '2', '5', '8',   '3', '6', '9'],
//     ['2', '5', '8',   '3', '6', '9',   '1', '4', '7'],
//     ['3', '6', '9',   '1', '4', '7',   '2', '5', '8'],
    
//     ['4', '7', '1',   '5', '8', '2',   '6', '9', '3'],
//     ['5', '8', '2',   '6', '9', '3',   '4', '7', '1'],
//     ['6', '9', '3',   '4', '7', '1',   '5', '8', '2'],
    
//     ['7', '1', '4',   '8', '2', '5',   '9', '3', '6'],
//     ['8', '2', '5',   '9', '3', '6',   '7', '1', '4'],
//     ['9', '3', '6',   '7', '1', '4',   '8', '2', '5']
//     ];

    
    // let board = [
    //     ['3', '.', '.',   '.', '6', '.',   '4', '.', '.'],
    //     ['4', '2', '.',   '.', '.', '5',   '7', '.', '.'],
    //     ['.', '.', '.',   '3', '.', '.',   '9', '.', '8'],
        
    //     ['.', '.', '4',   '.', '.', '.',   '.', '.', '.'],
    //     ['.', '.', '7',   '.', '.', '.',   '8', '3', '1'],
    //     ['6', '.', '.',   '.', '2', '.',   '.', '.', '.'],
        
    //     ['.', '.', '.',   '4', '.', '.',   '.', '.', '7'],
    //     ['.', '.', '.',   '7', '.', '3',   '2', '8', '4'],
    //     ['.', '.', '.',   '.', '1', '.',   '.', '.', '.']
    //     ];

// let board = [
//     ["5","3",".",".","7",".",".",".","."],
//     ["6",".",".","1","9","5",".",".","."],
//     [".","9","8",".",".",".",".","6","."],

//     ["8",".",".",".","6",".",".",".","3"],
//     ["4",".",".","8",".","3",".",".","1"],
//     ["7",".",".",".","2",".",".",".","6"],
    
//     [".","6",".",".",".",".","2","8","."],
//     [".",".",".","4","1","9",".",".","5"],
//     [".",".",".",".","8",".",".","7","9"]];


let board = [
        [".",".","9",".",".",".",".","2","."],
        ["2","4",".","7",".",".",".",".","1"],
        [".",".","6",".","4",".",".",".","."],
    
        [".","6",".",".",".",".",".",".","."],
        ["4","1",".",".","3",".",".","5","."],
        [".",".",".","9",".",".","3",".","."],
        
        [".",".","2",".",".",".",".",".","."],
        [".",".",".",".",".","8",".",".","7"],
        ["5","3",".",".","9",".",".","1","."]];
    

solve(board);