
class Environment{

  constructor(board_length){
    this.board = [];
    this.board_length = board_length;
    this.p1 = 1;
    this.p2 = -1;
    this.winner = 0;
    this.ended = 