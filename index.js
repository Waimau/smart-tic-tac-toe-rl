

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

    if(current_agent == p1){
      current_agent = p2;
    }else{
      current_agent = p1;
    }

    if(simulation){
      await sleep(1000);
    }
  }

  p1.update(environment);
  p2.update(environment);

}

function train_agents(){
  input_agent1_explore_probability = $("#input_agent1_explore_probability").val();
  input_agent1_learning_rate = $("#input_agent1_learning_rate").val();
  input_agent2_explore_probability = $("#input_agent2_explore_probability").val();
  input_agent2_learning_rate = $("#input_agent2_learning_rate").val();
  input_episodes = $("#input_episodes").val();

  agentA = new Agent(1, input_agent1_explore_probability, input_agent1_learning_rate);
  agentB = new Agent(-1, input_agent2_explore_probability, input_agent2_learning_rate);

  let episode = input_episodes;

  let state_winner_triples = get_state_hash_and_winner(environment);

  let V_list = initial_values(environment, state_winner_triples, agentA.name, agentB.name);
  agentA.set_v(V_list[0]);
  agentB.set_v(V_list[1]);

  for(let i=0;i<episode;i++){
    play_game(agentA, agentB, false);
    environment.reset_game(true, false);
  }

  agentA.skill_level = episode;
  agentB.skill_level = episode;

  $(agent_skill_level).text(episode);
  $(message).text("Agent trained and moved. It's your turn.");

  console.log('train_agents completed');

  play_with_agent();
}

function agent_simulation(){
  $(message).text("Agents playing against each other");
  environment.reset_game();
  play_game(agentA, agentB, true, true);
}

function reset_game(){
  environment.reset_game();
  play_with_agent();
  $(message).text("Game reset. It's your turn.");
}

function play_with_agent(){

  agentA.set_eps(0);

  let action = agentA.take_action(environment, true);
  let next_move = action[0];
  strategy = action[1];

  agent_probability = [0,0,0,0,0,0,0,0,0];
  for(let i=0;i<action[2].length;i++){
    agent_probability[action[2][i][0]] = (action[2][i][2] * 100).toFixed(1) + "%";
  }

  for(let i in agent_probability){
    let thisid = "#btn_ttt_prob"+i.toString();
    $(thisid).text(agent_probability[i]);