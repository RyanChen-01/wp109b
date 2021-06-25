const cvs =document.getElementById("tetris");
const ctx =cvs.getContext("2d");
const scoreElement=document.getElementById("score")
const ROW=20
const COL=COLUMN=10
const SQ=squareSize=20;
const VACANT="#202028";
function drawSquare(x,y,color){
    ctx.fillStyle=color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ);
    ctx.strokeStyle="black";
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ)
}
let board=[];
for(r=0;r<ROW;r++){
    board[r]=[]
    for(c=0;c<COL;c++){board[r][c]=VACANT;}
}
function drawBoard(){for(r=0;r<ROW;r++){
    for(c=0;c<COL;c++){drawSquare(c,r,board[r][c])}
}
}
drawBoard();
const PIECES=[[Z,"red"],[S,"green"],[T,"yellow"],[O,"blue"],[L,"purple"],[I,"cyan"],[J,"#FF7700"]]
function randomPiece(){
    let r=randomN=Math.floor(Math.random()*PIECES.length)
    return new Piece(PIECES[r][0],PIECES[r][1])
}
let p=randomPiece()
function Piece (tetromino,color){
        this.tetromino = tetromino;
        this.color = color;
        this.tetrominoN = 0;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.x = 3;
        this.y = -2;
    }
    Piece.prototype.fill=function(color) {
        for (r = 0; r < this.activeTetromino.length; r++) {
            for (c = 0; c.activeTetromino.length; c++) {
                if (this.activeTetromino[r][c]) {
                    drawSquare(this.x + c, this.y + r, color);
                }
            }
        }
    }
    Piece.prototype.draw=function() { this.fill(this.color); }
    Piece.prototype.unDraw=function() { this.fill(VACANT); }
    Piece.prototype.moveDown=function() {
        if (!this.collision(0, 1, this.activeTetromino)) { this.unDraw(); this.y++; this.draw(); }
        else { this.lock(); p = randomPiece(); }
    }
    Piece.prototype.moveRight=function() { if (!this.collision(1, 0, this.activeTetromino)) { this.unDraw(); this.x++; this.draw(); } }
    Piece.prototype.moveLeft=function() { if (!this.collision(-1, 0, this.activeTetromino)) { this.unDraw(); this.x--; this.draw(); } }
    Piece.prototype.rotate=function() {
        let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
        let kick = 0;
        if (this.collision(0, 0, nextPattern)) {
            if (this.x > COL / 2) { kick = -1; }
            else
                kick = 1;
        }
    }
    Piece.prototype.lock=function() {
        for (r = 0; r < this.activeTetromino.length; r++) {
            for (c = 0; c < this.activeTetromino.length; c++) {
                if (!this.activeTetromino[r][c]) {
                    continue;
                }
                if (this.y + r < 0) {
                    alert("遊戲結束!");
                    gameOver = true; break;
                }
                board[this.y + r][this.x + c] = this.color;
            }
        }
    }
    Piece.prototype.collision=function(x, y, Piece) {
        for (r = 0; r < Piece.length; r++) {
            for (c = 0; c < Piece.length; c++) {
                if (!Piece[r][c]) { continue; }
                let newx = this.x + c + x;
                let newy = this.y + r + y;
                if (newx < 0 || newx >= COL || newy >= ROW) { return true; }
                if (newy < 0) { continue; }
                if (board[newy][newx] != VACANT) { return true; }
                else if (board[newy][newx] == VACANT) { return false; }
            }
        }
    }

        
if(!this.collision(kick,0,nextPattern)){this.unDraw();this.x+=kick
this.tetrominoN=(this.tetrominoN+1)%this.tetromino.length
this.activeTetromino=this.tetromino[this.tetrominoN]
this.draw()
}
let score=0;
for(r=0;r<ROW;r++){
    let isRowFull=true;
    for(c=0;c<COL;c++){
        isRowFull=isRowFull&&(board[r][c]!=VACANT)
    }
}
for(y=r;y>1;y--){
    for(c=0;c<COL;c++){
        board[y][c]=board[y-1][c]
    }
    
}
        for(c=0;c<COL;c++)
        {
            board[0][c]=VACANT
        }
        score+=10;
        drawBoard()
        scoreElement.innerHTML=score
document.addEventListener("keydown",CONTROL)
function CONTROL(event){
    if(event.keyCode==37){p.moveLeft()}
    else if(event.keyCode==38){p.rotate()}
    else if(event.keyCode==39){p.moveRight()}
    else if(event.keyCode==40){p.moveDown()}
}
let dropstart=Date.now()
let gameOver=false
function drop(){let now=Date.now()
    let time=now-dropstart
    if(time>440){p.moveDown()
    dropstart=Date.now()
    }
    if(!gameOver){
        requestAnimationFrame(drop)
    }

}
drop()