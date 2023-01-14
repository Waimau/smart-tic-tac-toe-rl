

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