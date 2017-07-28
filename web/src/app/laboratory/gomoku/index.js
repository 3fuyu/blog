/**
 * Created by 3fuyu on 2017/7/28.
 */

(function () {

    var boardSize = 20, // 棋盘数
        chessData = new Array(boardSize),  // 棋盘数据
        turnTo = 'black',  // 轮到的下棋方
        winnerLock = false,
        cacheData = [],
        mode = 2; // 1 双人 2 人机

    for (var i = 0; i < boardSize; i++) {
        chessData[i] = new Array(boardSize);

        for (var j = 0; j < boardSize; j++) {
            chessData[i][j] = 0;
        }
    }
    // 初始化
    init();
    bindEvent();
    function init() {
        setTimeout(function () {
            calWidth();
        }, 0);

        drawBoard();
        playChess();
    }

    function bindEvent() {
        document.getElementsByClassName('restart')[0].addEventListener('click', function (e) {
            restart(e);
        });
        document.getElementsByClassName('undo')[0].addEventListener('click', function (e) {
            undo(e);
        });
        document.getElementsByClassName('mode')[0].addEventListener('click', function (e) {
            changeMode(e);
        });
    }

    // 根据棋盘数调整棋盘位置
    function calWidth() {
        document.getElementsByClassName('board-content')[0].style.width = boardSize * 40 + 'px';
        document.getElementsByClassName('main-content')[0].style.backgroundSize = boardSize * 40 + 400 + 'px';
        document.getElementsByClassName('main-content')[0].style.width = boardSize * 40 + 400 + 'px';
    }

    // 画棋盘
    function drawBoard() {
        var target = document.getElementsByClassName('chessboard'),
            boardDom = '';

        for (var i = 0; i < boardSize * boardSize; i++) {
            if (i === 0) {
                boardDom += '<li class = "board-item" data-row="' + parseInt(i / boardSize) + '" data-column="' + i % boardSize + '" data-main="' + parseInt(i / boardSize) + '-' + i % boardSize + '"><div class="row-left-top"></div><div class="column-left-top"></div></li>';
            } else if (i === boardSize - 1) {
                boardDom += '<li class = "board-item" data-row="' + parseInt(i / boardSize) + '" data-column="' + i % boardSize + '" data-main="' + parseInt(i / boardSize) + '-' + i % boardSize + '"><div class="row-right-top"></div><div class="column-right-top"></div></li>';
            } else if (i === boardSize * (boardSize - 1)) {
                boardDom += '<li class = "board-item" data-row="' + parseInt(i / boardSize) + '" data-column="' + i % boardSize + '" data-main="' + parseInt(i / boardSize) + '-' + i % boardSize + '"><div class="row-left-bottom"></div><div class="column-left-bottom"></div></li>';
            } else if (i === boardSize * boardSize - 1) {
                boardDom += '<li class = "board-item" data-row="' + parseInt(i / boardSize) + '" data-column="' + i % boardSize + '" data-main="' + parseInt(i / boardSize) + '-' + i % boardSize + '"><div class="row-right-bottom"></div><div class="column-right-bottom"></div></li>';
            } else if (i < boardSize) {
                boardDom += '<li class = "board-item" data-row="' + parseInt(i / boardSize) + '" data-column="' + i % boardSize + '" data-main="' + parseInt(i / boardSize) + '-' + i % boardSize + '"><div class="row-top"></div><div class="column-top"></div></li>';
            } else if (i % boardSize === 0) {
                boardDom += '<li class = "board-item" data-row="' + parseInt(i / boardSize) + '" data-column="' + i % boardSize + '" data-main="' + parseInt(i / boardSize) + '-' + i % boardSize + '"><div class="row-left"></div><div class="column-left"></div></li>';
            } else if ((i + 1) % boardSize === 0) {
                boardDom += '<li class = "board-item" data-row="' + parseInt(i / boardSize) + '" data-column="' + i % boardSize + '" data-main="' + parseInt(i / boardSize) + '-' + i % boardSize + '"><div class="row-right"></div><div class="column-right"></div></li>';
            } else if (i < boardSize * boardSize && i > boardSize * (boardSize - 1)) {
                boardDom += '<li class = "board-item" data-row="' + parseInt(i / boardSize) + '" data-column="' + i % boardSize + '" data-main="' + parseInt(i / boardSize) + '-' + i % boardSize + '"><div class="row-bottom"></div><div class="column-bottom"></div></li>';
            } else {
                boardDom += '<li class = "board-item" data-row="' + parseInt(i / boardSize) + '" data-column="' + i % boardSize + '" data-main="' + parseInt(i / boardSize) + '-' + i % boardSize + '"><div class="row"></div><div class="column"></div></li>';
            }
        }

        target[0].innerHTML = '<ul class="board-content">' + boardDom + '</ul>';
    }

    // 下棋
    function playChess() {
        document.getElementsByClassName('board-content')[0].addEventListener('click', function (e) {

            var target = e.target.children.length === 0 ? e.target.parentElement : e.target,
                className = target.className;

            if (className.indexOf('black') <= -1 && className.indexOf('white') <= -1 && className !== 'board-content' && !winnerLock) {

                var rowNum = parseInt(target.dataset.row),
                    columnNum = parseInt(target.dataset.column),
                    now = turnTo === 'black' ? 1 : 2;

                if (turnTo === 'black') {
                    turnTo = 'white';
                    target.className = className + ' black';

                    chessData[rowNum][columnNum] = 1;
                } else {
                    turnTo = 'black';
                    target.className = className + ' white';

                    chessData[rowNum][columnNum] = 2;
                }

                cacheData.push([rowNum, columnNum]);

                checkWinner(now, rowNum, columnNum);  // 1 黑 2 白

                if (mode === 2) {
                    computerPlay();
                }
            }
        });
    }

    // 判断胜负
    function checkWinner(now, row, col) {
        var result = setScore(now, row, col);

        if (result.p1 >= 4 || result.p2 >= 4 || result.p3 >= 4 || result.p4 >= 4) {
            setTimeout(function () {
                alert(now === 1 ? '黑方胜！' : '白方胜！');
            }, 100);
            winnerLock = true;
        }
    }

    function calNextPart(_b, np1, np2, np3, np4) {
        var p1, p2, p3, p4;

        if ((parseInt(Math.max(_b.p1, _b.p2, _b.p3, _b.p4)) > parseInt(Math.max(np1, np2, np3, np4))) || (Math.max(_b.p1, _b.p2, _b.p3, _b.p4) === Math.max(np1, np2, np3, np4) && ((_b.p1 + _b.p2 + _b.p3 + _b.p4) > (np1 + np2 + np3 + np4)))) {
            np1 = _b.p1;
            np2 = _b.p2;
            np3 = _b.p3;
            np4 = _b.p4;
        }

        return {
            p1: np1,
            p2: np2,
            p3: np3,
            p4: np4
        }
    }

    function setScore(now, row, col, deepLook) {
        // 四个方向
        var p1 = 0,
            p2 = 0,
            p3 = 0,
            p4 = 0,
            np1 = 0,
            np2 = 0,
            np3 = 0,
            np4 = 0,
            _b = {},
            nextPart = {},
            notNow = now === 1 ? 2 : 1;

        if (col !== 0) {
            // 左
            for (var a = 1; col >= a && chessData[row][col - a] === now; a++) {
                p1++;

                var nextA = a + 1;

                if (col >= nextA && chessData[row][col - nextA] === notNow) {
                    p1 += 0.3;
                }
            }

            if (col >= 1 && chessData[row][col - 1] === 0 && !deepLook) {
                _b = setScore(1, row, col - 1, true);

                nextPart = calNextPart(_b, np1, np2, np3, np4);
                np1 = nextPart.p1;
                np2 = nextPart.p2;
                np3 = nextPart.p3;
                np4 = nextPart.p4;
            }
        }
        if (row !== 0 && col !== 0) {
            // 左上
            for (var b = 1; row >= b && col >= b && chessData[row - b][col - b] === now; b++) {
                p2++;

                var nextB = b + 1;

                if (row >= nextB && col >= nextB && chessData[row - nextB][col - nextB] === notNow) {
                    p2 += 0.3;
                }
            }

            if (row >= 1 && col >= 1 && chessData[row - 1][col - 1] === 0 && !deepLook) {
                _b = setScore(1, row - 1, col - 1, true);

                nextPart = calNextPart(_b, np1, np2, np3, np4);
                np1 = nextPart.p1;
                np2 = nextPart.p2;
                np3 = nextPart.p3;
                np4 = nextPart.p4;
            }
        }
        if (row !== 0) {
            // 上
            for (var c = 1; row >= c && chessData[row - c][col] === now; c++) {
                p3++;

                var nextC = c + 1;

                if (row >= nextC && chessData[row - nextC][col] === notNow) {
                    p3 = p3 + 0.3;
                }
            }

            if (row >= 1 && chessData[row - 1][col] === 0 && !deepLook) {
                _b = setScore(1, row - 1, col, true);

                nextPart = calNextPart(_b, np1, np2, np3, np4);
                np1 = nextPart.p1;
                np2 = nextPart.p2;
                np3 = nextPart.p3;
                np4 = nextPart.p4;
            }
        }
        if (row !== 0 && col !== boardSize - 1) {
            // 右上
            for (var d = 1; row >= d && col + d < boardSize && chessData[row - d][col + d] === now; d++) {
                p4++;

                var nextD = d + 1;

                if (row >= nextD && col + nextD < boardSize && chessData[row - nextD][col + nextD] === notNow) {
                    p4 = p4 + 0.3;
                }
            }

//                if (row === 6 && col === 2 && !deepLook) {
//                    console.log('it"s here');
//                }
            if (row >= 1 && col + 1 < boardSize && chessData[row - 1][col + 1] === 0 && !deepLook) {
                _b = setScore(1, row - 1, col + 1, true);

                nextPart = calNextPart(_b, np1, np2, np3, np4);
                np1 = nextPart.p1;
                np2 = nextPart.p2;
                np3 = nextPart.p3;
                np4 = nextPart.p4;
            }
        }
        if (col !== boardSize - 1) {
            // 右
            for (var e = 1; col + e < boardSize && chessData[row][col + e] === now; e++) {
                p1++;

                var nextE = e + 1;

                if (col + nextE < boardSize && chessData[row][col + nextE] === notNow) {
                    p1 = p1 + 0.3;
                }
            }

            if (col + 1 < boardSize && chessData[row][col + 1] === 0 && !deepLook) {
                _b = setScore(1, row, col + 1, true);

                nextPart = calNextPart(_b, np1, np2, np3, np4);
                np1 = nextPart.p1;
                np2 = nextPart.p2;
                np3 = nextPart.p3;
                np4 = nextPart.p4;
            }
        }
        if (row !== boardSize - 1 && col !== boardSize - 1) {
            // 右下
            for (var f = 1; row + f < boardSize && col + f < boardSize && chessData[row + f][col + f] === now; f++) {
                p2++;

                var nextF = f + 1;

                if (row + nextF < boardSize && col + nextF < boardSize && chessData[row + nextF][col + nextF] === notNow) {
                    p2 = p2 + 0.3;
                }
            }

            if (row + 1 < boardSize && col + 1 < boardSize && chessData[row + 1][col + 1] === 0 && !deepLook) {
                _b = setScore(1, row + 1, col + 1, true);

                nextPart = calNextPart(_b, np1, np2, np3, np4);
                np1 = nextPart.p1;
                np2 = nextPart.p2;
                np3 = nextPart.p3;
                np4 = nextPart.p4;
            }
        }
        if (row !== boardSize - 1) {
            // 下
            for (var g = 1; row + g < boardSize && chessData[row + g][col] === now; g++) {
                p3++;

                var nextG = g + 1;

                if (row + nextG < boardSize && chessData[row + nextG][col] === notNow) {
                    p3 = p3 + 0.3;
                }
            }

            if (row + 1 < boardSize && chessData[row + 1][col] === 0 && !deepLook) {
                _b = setScore(1, row + 1, col, true);

                nextPart = calNextPart(_b, np1, np2, np3, np4);
                np1 = nextPart.p1;
                np2 = nextPart.p2;
                np3 = nextPart.p3;
                np4 = nextPart.p4;
            }
        }
        if (row !== boardSize - 1 && col !== 0) {
            // 左下
            for (var h = 1; col >= h && row + h < boardSize && chessData[row + h][col - h] === now; h++) {
                p4++;

                var nextH = h + 1;

                if (col >= nextH && row + nextH < boardSize && chessData[row + nextH][col - nextH] === notNow) {
                    p4 = p4 + 0.3;
                }
            }

            if (col >= 1 && row + 1 < boardSize && chessData[row + 1][col - 1] === 0 && !deepLook) {
                _b = setScore(1, row + 1, col - 1, true);

                nextPart = calNextPart(_b, np1, np2, np3, np4);
                np1 = nextPart.p1;
                np2 = nextPart.p2;
                np3 = nextPart.p3;
                np4 = nextPart.p4;
            }
        }

        return {
            p1: p1,
            p2: p2,
            p3: p3,
            p4: p4,
            np1: np1,
            np2: np2,
            np3: np3,
            np4: np4,
        };
    }


    function restart(e) {
        chessData = new Array(boardSize);  // 棋盘数据
        turnTo = 'black';  // 轮到的下棋方
        winnerLock = false;
        cacheData = [];

        for (var i = 0; i < boardSize; i++) {
            chessData[i] = new Array(boardSize);

            for (var j = 0; j < boardSize; j++) {
                chessData[i][j] = 0;
            }
        }

        init();
    }

    function undo(e) {
        if (!cacheData || cacheData.length === 0) {
            alert('你不下我没法悔');
            return false;
        }

        var lastData = cacheData.pop(),
            target = document.querySelector('[data-main= "' + lastData[0] + '-' + lastData[1] + '"]');

        target.className = target.className.replace('black', '').replace('white', '');

        chessData[lastData[0]][lastData[1]] = 0;

        turnTo = turnTo === 'black' ? 'white' : 'black';
    }

    function changeMode(e) {
        var now_mode = e.currentTarget.innerText;

        if (confirm('切换模式当前进度将丢失，是否切换？')) {
            now_mode === '双人' ? e.currentTarget.innerHTML = '人机' : e.currentTarget.innerHTML = '双人';
            mode === 1 ? mode = 2 : mode = 1
            restart();
        }
    }

    // 电脑下棋
    function computerPlay() {
        var bestPoint = {
            row: 0,
            col: 0,
            score: 0
        };

        chessData.forEach(function (value, row) {
            value.forEach(function (result, col) {
                if (result === 0) {
                    var black_p = setScore(1, row, col),
                        white_p = setScore(2, row, col),
                        score = 0,
                        score_next = 0,
                        bp1 = black_p.p1,
                        bp2 = black_p.p2,
                        bp3 = black_p.p3,
                        bp4 = black_p.p4,
                        wp1 = white_p.p1,
                        wp2 = white_p.p2,
                        wp3 = white_p.p3,
                        wp4 = white_p.p4,
                        nbp1 = black_p.np1,
                        nbp2 = black_p.np2,
                        nbp3 = black_p.np3,
                        nbp4 = black_p.np4;

                    // 当前位置权重
                    score = weight(bp1, bp2, bp3, bp4, wp1, wp2, wp3, wp4, 1);
                    // 下一个位置权重
                    score_next = weight(nbp1, nbp2, nbp3, nbp4, 0, 0, 0, 0, 10);

                    // point 调节下一个位置权重的比重
                    function weight(bp1, bp2, bp3, bp4, wp1, wp2, wp3, wp4, point) {
                        var score = 0;
                        // 5子
                        if (bp1 >= 4 || bp2 >= 4 || bp3 >= 4 || bp4 >= 4) {
                            score += 100000 / point;
                        }

                        if (wp1 >= 4 || wp2 >= 4 || wp3 >= 4 || wp4 >= 4) {
                            score += 110000 / point;
                        }

                        // 活四 || 双死四 || 死四活三
                        if ((bp1 === 3 || bp2 === 3 || bp3 === 3 || bp4 === 3) || (bp1 + bp2 === 6.6 || bp1 + bp3 === 6.6 || bp1 + bp4 === 6.6 || bp2 + bp3 === 6.6 || bp2 + bp4 === 6.6 || bp3 + bp4 === 6.6) || ((bp1 === 3.3 || bp2 === 3.3 || bp3 === 3.3 || bp4 === 3.3) && (bp1 === 2 || bp2 === 2 || bp3 === 2 || bp4 === 2))) {
                            score += 10000 / point;
                        }

                        if ((wp1 === 3 || wp2 === 3 || wp3 === 3 || wp4 === 3) || (wp1 + wp2 === 6.6 || wp1 + wp3 === 6.6 || wp1 + wp4 === 6.6 || wp2 + wp3 === 6.6 || wp2 + wp4 === 6.6 || wp3 + wp4 === 6.6) || ((wp1 === 3.3 || wp2 === 3.3 || wp3 === 3.3 || wp4 === 3.3) && (wp1 === 2 || wp2 === 2 || wp3 === 2 || wp4 === 2))) {
                            score += 11000 / point;
                        }

                        // 双活三
                        if (bp1 + bp2 === 4 || bp1 + bp3 === 4 || bp1 + bp4 === 4 || bp2 + bp3 === 4 || bp2 + bp4 === 4 || bp3 + bp4 === 4) {
                            score += 5000 / point;
                        }

                        if (wp1 + wp2 === 4 || wp1 + wp3 === 4 || wp1 + wp4 === 4 || wp2 + wp3 === 4 || wp2 + wp4 === 4 || wp3 + wp4 === 4) {
                            score += 5100 / point;
                        }

                        // 死三活三
                        if ((bp1 === 2.3 || bp2 === 2.3 || bp3 === 2.3 || bp4 === 2.3) && (bp1 === 2 || bp2 === 2 || bp3 === 2 || bp4 === 2)) {
                            score += 1000 / point;
                        }

                        if ((wp1 === 2.3 || wp2 === 2.3 || wp3 === 2.3 || wp4 === 2.3) && (wp1 === 2 || wp2 === 2 || wp3 === 2 || wp4 === 2)) {
                            score += 1100 / point;
                        }

                        // 死四
                        if (bp1 === 3.3 || bp2 === 3.3 || bp3 === 3.3 || bp4 === 3.3) {
                            score += 500 / point;
                        }

                        if (wp1 === 3.3 || wp2 === 3.3 || wp3 === 3.3 || wp4 === 3.3) {
                            score += 550 / point;
                        }

                        // 单活三
                        if (bp1 === 2 || bp2 === 2 || bp3 === 2 || bp4 === 2) {
                            score += 200 / point;
                        }

                        if (wp1 === 2 || wp2 === 2 || wp3 === 2 || wp4 === 2) {
                            score += 250 / point;
                        }

                        // 双活二
                        if (bp1 + bp2 === 2 || bp1 + bp3 === 2 || bp1 + bp4 === 2 || bp2 + bp3 === 2 || bp2 + bp4 === 2 || bp3 + bp4 === 2) {
                            score += 100 / point;
                        }

                        if (wp1 + wp2 === 2 || wp1 + wp3 === 2 || wp1 + wp4 === 2 || wp2 + wp3 === 2 || wp2 + wp4 === 2 || wp3 + wp4 === 2) {
                            score += 120 / point;
                        }

                        // 死三
                        if (bp1 === 2.3 || bp2 === 2.3 || bp3 === 2.3 || bp4 === 2.3) {
                            score += 50 / point;
                        }

                        if (wp1 === 2.3 || wp2 === 2.3 || wp3 === 2.3 || wp4 === 2.3) {
                            score += 60 / point;
                        }

                        // 死二活二
                        if ((bp1 === 2.3 || bp2 === 2.3 || bp3 === 2.3 || bp4 === 2.3) && (bp1 === 2 || bp2 === 2 || bp3 === 2 || bp4 === 2)) {
                            score += 10 / point;
                        }

                        if ((wp1 === 2.3 || wp2 === 2.3 || wp3 === 2.3 || wp4 === 2.3) && (wp1 === 2 || wp2 === 2 || wp3 === 2 || wp4 === 2)) {
                            score += 12 / point;
                        }

                        // 活二
                        if (bp1 === 2 || bp2 === 2 || bp3 === 2 || bp4 === 2) {
                            score += 5 / point;
                        }

                        if (wp1 === 2 || wp2 === 2 || wp3 === 2 || wp4 === 2) {
                            score += 6 / point;
                        }

                        // 死二
                        if (bp1 === 2.3 || bp2 === 2.3 || bp3 === 2.3 || bp4 === 2.3) {
                            score += 3 / point;
                        }

                        if (wp1 === 2.3 || wp2 === 2.3 || wp3 === 2.3 || wp4 === 2.3) {
                            score += 4 / point;
                        }

                        // 活一
                        if (bp1 === 1 || bp2 === 1 || bp3 === 1 || bp4 === 1) {
                            score += 1 / point;
                        }
                        if (wp1 === 1 || wp2 === 1 || wp3 === 1 || wp4 === 1) {
                            score += 1 / point;
                        }

                        return score;
                    }


                    if (score + score_next > bestPoint.score) {
                        bestPoint.score = score + score_next;
                        bestPoint.row = row;
                        bestPoint.col = col;
                    }
                }
            });
        });

        if (!winnerLock) {
            var target = document.querySelector('[data-main="' + bestPoint.row + '-' + bestPoint.col + '"]');

            target.className = target.className + ' white';
            turnTo = 'black';

            chessData[bestPoint.row][bestPoint.col] = 2;
            cacheData.push([bestPoint.row, bestPoint.col]);

            checkWinner(2, bestPoint.row, bestPoint.col);
        }
    }
})();
