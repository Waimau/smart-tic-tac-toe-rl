
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

  set_cell(i, j, value){
    // console.log(i, j, value);
    this.board[(j*this.board_length)+i] = parseInt(value);
  }

  cell_is_empty(i, j){
    return this.get_cell(i, j) == 0;
  }

  grid_select(index, show_ui=true){

    if(this.board[index] != 0){
      return false;
    }

    this.board[index] = this.player_turn;

    if(show_ui){
      let thisid = "#btn_ttt_click"+index.toString();
      if(this.player_turn == 1){
        $(thisid).toggleClass('white red');
        $(thisid).text('O')
      }else{
        $(thisid).toggleClass('white green');
        $(thisid).text('X')
      }
    }

    if(this.is_game_over()){
      this.ended = true;
      // console.log('game ended, winner ', this.winner)

    }else{
      this.player_turn = this.player_turn * -1;
    }

  }

  reset_game(reset_player=true, show_ui=true){
    this.winner = 0;
    // this.board = [];

    for(let i=0;i<Math.pow(this.board_length,2);i++){
      // this.board.push(0);
      if(show_ui){
        let thisid = "#btn_ttt_click"+i.toString();
        // if(this.board[i] == 1){
        //   $(thisid).toggleClass('red white');
        // }else if(this.board[i] == -1){
        //   $(thisid).toggleClass('green white');
        // }
        $(thisid).removeClass("green");
        $(thisid).removeClass("red");
        $(thisid).addClass("white");
        $(thisid).text('