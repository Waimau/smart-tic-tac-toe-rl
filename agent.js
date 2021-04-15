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

  set_skilllevel