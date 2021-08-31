
class Environment{

  constructor(board_length){
    this.board = [];
    this.board_length = board_length;
    this.p1 = 1;
    this.p2 = -1;
    this.winner = 0;
    this.ended = false;
    this.num_states = Math.pow(3,this.board_length*this.board_length);
    this.player_turn = 1;

    for(let i=0;i<Math.pow(this.board_length,2);i++){
      this.board.push(0);
    }
  }

  get_cell(i, j){
    return parseInt(this.board[(j*this.board_length)+i]);
  }

