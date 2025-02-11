var board = new Array();
var added = new Array();
var score = 0;
var top = 240;
$(document).ready(function(e){
    newgame();
});
 
function newgame(){
    //初始化棋盤格
    init();
    //在隨機生成兩個隨機的數字
    generateOneNumber();
    generateOneNumber();
}
 
function init(){
	score=0;
	document.getElementById("score").innerHTML=score;
	$("#gameover").css('display','none');
    for(var i = 0;i<4;i++){
        for(var j = 0;j<4;j++){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left",getPosLeft(i,j));
        }
    }
    
    for(var i = 0; i<4;i++){//初始化格子陣列
        board[i] = new Array();
        for(var j = 0;j<4;j++){
            board[i][j] = 0;
        }
    }
    
    for(var i = 0; i<4;i++){//初始化判定合併的陣列
        added[i] = new Array();
        for(var j = 0;j<4;j++){
            added[i][j] = 0;
        }
    }
    
    updateBoardView();//通知前端對board二位陣列進行設定。
}
 
function updateBoardView(){//更新陣列的前端樣式
    $(".number-cell").remove();
    for(var i = 0;i<4;i++){
        for ( var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);
            if(board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
            }else{
                theNumberCell.css('width','100px');
                theNumberCell.css('hegiht','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                //NumberCell覆蓋
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));//返回背景色
                theNumberCell.css('color',getNumberColor(board[i][j]));//返回前景色
                theNumberCell.text(board[i][j]);
            }
        }
    }
}
 
function generateOneNumber(){//生成隨機的格子
    if (nospace(board)) //如果沒有空間就返回false
        return false;
    
    //隨機一個位置
    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));
    while(true){
        if (board[randx][randy] == 0) 
            break;
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));
    }
    //隨機一個數字
    var randNumber = Math.random()<0.5 ? 2 : 4;
    //在隨機位置顯示隨機數字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx,randy,randNumber);
    return true;
}
 
//事件響應迴圈
$(document).keydown(function(event){
    switch (event.keyCode) {
    case 37://left
        if(moveLeft()){
            //setTimeout("generateOneNumber()",210);
            getScore();
            generateOneNumber();//每次新增一個數字就可能出現遊戲結束
            setTimeout("isgameover()",400);//300毫秒
        }
        break;
    case 38://up
        if(moveUp()){
        	getScore();
            generateOneNumber();//每次新增一個數字就可能出現遊戲結束
            setTimeout("isgameover()",400);
        }
        break;
    case 39://right
        if(moveRight()){
        	getScore();
            generateOneNumber();//每次新增一個數字就可能出現遊戲結束
            setTimeout("isgameover()",400);
        }
        break;
    case 40://down
        if(moveDown()){
        	getScore();
            generateOneNumber();//每次新增一個數字就可能出現遊戲結束
            setTimeout("isgameover()",400);
        }
        break;
 
    }
});
 
function isgameover(){
    if(nospace(board)&&nomove(board))//如果沒有多餘的空間或者上下左右都移動不了就遊戲結束
        gameover();
}
 
function gameover(){//將遊戲結束的div浮現出來
    $("#gameover").css('display','block');
}
 
function isaddedArray(){//將判斷能否合併的陣列值置為0
	for(var i = 0;i<4;i++){
        for(var j = 0;j<4;j++){
        	added[i][j] = 0;
        }
   }
}
 
function moveLeft(){//更多地細節資訊
    //判斷格子是否能夠向左移動
    if( !canMoveLeft(board))
        return false;
    
    isaddedArray();
    //真正的moveLeft函式//標準
    for(var i = 0;i<4;i++)
        for(var j = 1;j<4;j++){//第一列的數字不可能向左移動
            if(board[i][j] !=0){
                //(i,j)左側的元素
                for(var k = 0;k<j;k++){
                    //落腳位置的是否為空 && 中間沒有障礙物
                    if(board[i][k] == 0 && noBlockHorizontal(i , k, j, board)){
                        //move
                        showMoveAnimation(i, j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //落腳位置的數字和本來的數字相等 && 中間沒有障礙物
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i , k, j, board)){
                        //move
                        showMoveAnimation(i, j,i,k);
                        //add
                        if(added[i][k]!=0){//目標落腳點是否完成過合併
                        		board[i][k+1] = board[i][j];
                        		board[i][j] = 0;
                        }
                        else{
                        	board[i][k] += board[i][j];
                        	board[i][j] = 0;
                        	added[i][k] = 1;
                        	score +=board[i][k];
                        }
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}
 
function moveRight(){//更多地細節資訊
    //判斷格子是否能夠向右移動
    if( !canMoveRight(board))
        return false;
    
    isaddedArray();
    //真正的moveRight函式//標準
    for(var i = 0;i<4;i++)
        for(var j = 2;j>=0;j--){//最後一列的數字不可能向右移動
            if(board[i][j] !=0){
                //(i,j)右側的元素
                for(var k = 3;k>j;k--){
                    //落腳位置的是否為空 && 中間沒有障礙物
                    if(board[i][k] == 0 && noBlockHorizontal(i , j, k, board)){
                        //move
                        showMoveAnimation(i, j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //落腳位置的數字和本來的數字相等 && 中間沒有障礙物
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i , j, k, board)){
                        //move
                        showMoveAnimation(i, j,i,k);
                        //add
                         if(added[i][k]!=0){
                        		board[i][k-1] = board[i][j];
                        		board[i][j] = 0;
                        }
                        else{
                        	board[i][k] += board[i][j];
                        	board[i][j] = 0;
                        	added[i][k] = 1;
                        	score +=board[i][k];
                        }
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}
 
function moveUp(){//更多地細節資訊
    //判斷格子是否能夠向上移動
    if( !canMoveUp(board))
        return false;
    
    isaddedArray();
    //真正的moveUp函式//標準
    for(var j = 0;j<4;j++)
        for(var i = 1;i<4;i++){//第一行的數字不可能向上移動
            if(board[i][j] !=0){
                //(i,j)上面的元素
                for(var k = 0;k<i;k++){
                    //落腳位置的是否為空 && 中間沒有障礙物
                    if(board[k][j] == 0 && noBlockVertical(j , k, i, board)){
                        //move
                        showMoveAnimation(i, j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //落腳位置的數字和本來的數字相等 && 中間沒有障礙物
                    else if(board[k][j] == board[i][j] && noBlockVertical(j , k, i, board)){
                        //move
                        showMoveAnimation(i, j,k,j);
                        //add
                        if(added[k][j]!=0){
                        	board[k+1][j] = board[i][j];
                        	board[i][j] = 0;
                        }
                        else{
                        	board[k][j] += board[i][j];
                        	board[i][j] = 0;
                        	added[k][j] = 1;
                        	score +=board[k][j];
                        }
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}
 
function moveDown(){//更多地細節資訊
    //判斷格子是否能夠向下移動
    if( !canMoveDown(board))
        return false;
        
    isaddedArray();
    //真正的moveDown函式//標準
    for(var j = 0;j<4;j++)
        for(var i = 2;i>=0;i--){//最後一行的數字不可能向下移動
            if(board[i][j] !=0){
                //(i,j)上面的元素
                for(var k = 3;k>i;k--){
                    //落腳位置的是否為空 && 中間沒有障礙物
                    if(board[k][j] == 0 && noBlockVertical(j , i, k, board)){
                        //move
                        showMoveAnimation(i, j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //落腳位置的數字和本來的數字相等 && 中間沒有障礙物
                    else if(board[k][j] == board[i][j] && noBlockVertical(j , i, k, board)){
                        //move
                        showMoveAnimation(i, j,k,j);
                        //add
                        if(added[k][j]!=0){
                        	board[k-1][j] = board[i][j];
                        	board[i][j] = 0;
                        }
                        else{
                        	board[k][j] += board[i][j];
                        	board[i][j] = 0;
                        	added[k][j] = 1;
                        	score +=board[k][j];
                        }
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}
