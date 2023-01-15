

let environment = new Environment(3);
let agentA = new Agent(1);
let agentB = new Agent(-1);
let input_episodes = 1;
let input_agent1_explore_probability = 0.05;
let input_agent1_learning_rate = 0.5;
let input_agent2_explore_probability = 0.05;
let input_agent2_learning_rate = 0.5;

let strategy = "";
let agent_probability = [];

let demo_agentx_graph_1 = {data:[], layout:{}};
let demo_agentx_graph_2 = {data:[], layout:{}};
let demo_agento_graph_1 = {data:[], layout:{}};
let demo_agento_graph_2 = {data:[], layout:{}};
let demo_agento_graph_1_zero = {data:[], layout:{}};
let demo_agento_graph_2_zero = {data:[], layout:{}};


function play_again(){
  environment.reset_game();
  play_with_agent();
}

async function play_game(p1, p2, show_ui=true, simulation=false){

  let current_agent = p1;

  for(let i=0;i<9;i++){
    let action = current_agent.take_action(environment);

    // console.log(current_agent.name, action, environment.get_state());
    environment.grid_select(action, show_ui);

    p1.update_state_history(environment.get_state());
    p2.update_state_history(environment.get_state());

    if(environment.ended){
      break;
    }