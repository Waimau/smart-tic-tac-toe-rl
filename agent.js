class Agent{

  constructor(name, eps=0.05, alpha=0.5) {
    this.eps = eps; // probability of choosing random action instead of greedy
    this.alpha = alpha; // learning rate
    this.state_history = [];
    this.name = name;
    this.V = [];
    this.skill_level = 0;
  }

  set_v(V){
    this.V = V;
  }

  set_skilllevel(v){
    this.skill_level = v;
  }

  set_eps(v){
    this.eps = v;
  }

  take_action(env, return_computation=false){

    let next_move = -1;
    let debug_moves = [];
    let strategy = "exploit";

    if(Math.random()<this.eps){
      strategy = "explore";

      let possible_moves = [];
      for(let i=0;i<env.board.length;i++){
        if(env.board[i]==0){
          possible_moves.push(i);
        }
      }

      next_move = possible_moves[Math.floor(Math.rando