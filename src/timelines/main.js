
// import jsPsychComprehension from '../js/comprehension'
import jsPsychLearning from '../js/learning-trials'
// import jsPsychMyInstructions from '../js/instructions'
import jsPsychProbe from '../js/probe'
// import jsPsychPractice from '../js/practice'
import jsPsychFullscreen from '@jspsych/plugin-fullscreen'
import 'jspsych/css/jspsych.css';
import '../css/robots-css.min.css'



// Add your jsPsych options here.
// Honeycomb will combine these custom options with other options needed by Honyecomb.
const jsPsychOptions = {
  on_trial_finish: function (data) {
    console.log(data)
  }
};

function buildTimeline(jsPsych) {
  // Define unique symbols.
  var symbol_array = ['c','d','e','f','j','k','m','o','s','t','y','C','N','O','L','T']

  // Shuffle symbols.
  symbol_array = jsPsych.randomization.repeat(symbol_array, 1);

  // var context_array = ['forrest_1', 'forrest_2', 'forrest_3', 'desert_1', 'desert_2', 'desert_3']
  var practice_array = ['forrest_1', 'desert_1']
  var learn_1_array = ['forrest_2', 'desert_4']
  var learn_2_array = ['forrest_4', 'desert_3']

  // var context_array_forrest = ['forrest_1', 'forrest_2', 'forrest_3']
  // var context_array_desert = ['desert_1', 'desert_2', 'desert_3']

  var context_array = jsPsych.randomization.repeat(practice_array, 1);
  context_array = context_array.concat(jsPsych.randomization.repeat(learn_1_array, 1));
  context_array = context_array.concat(jsPsych.randomization.repeat(learn_2_array, 1));

  // // Define comprehension threshold.
  // var max_errors = 0;
  // var max_loops = 3;
  // var num_loops = 0;

  // Define missed repsonses count.
  var missed_threshold = 10;
  var missed_responses = 0;

  // //---------------------------------------//
  // // Define learning phase instructions.
  // //---------------------------------------//
  // var instructions_01 = {
  //   type: jsPsychInstructions,
  //   pages: [
  //     "We are now starting the experiment.<br><br>Use the buttons below (or the left/right arrow keys) to navigate the instructions.",
  //     "In this task, you are picking a team of knights.<br>The knights will look like the ones below.",
  //     "Each knight will have a <b>unique symbol</b> on its chestplate.<br>This symbol will help you identify each knight.",
  //     "You'll also pick your team of knights from different places. <br>Some of places will have knights that are good and will give you more points and some places will have knights are bad and will take away points.",
  //     "On every turn, you will choose a knight for your team.<br>When you select a knight, it may give you:<br><b><font color=#01579b>+10 points, </font><font color=#303030>+0 points</font></b>, or <b><font color=#A41919>-10 points</font></b>.",
  //     "To help you learn, we will also show you the points you<br><i>could have earned</i> if you had chosen the other knight.<br><b>NOTE:</b> You will earn points only for the knight you choose.",
  //     "Some knights are better than others. Some will give you more points than others and some will lose you less points that others.",
  //     "Sometimes you'll know the points from the unchosen knights, but sometimes you won't know.",
  //     "Now let's practice with the knights below. Using the left/right<br>arrow keys, select the knights for testing and try to learn<br>which will give you more points.",
  //     "<b>HINT:</b> Pay attention to the symbols and the results of each test."
  //   ],
  //   symbol_L: "V",
  //   symbol_R: "U",
  // }

  // var practice_block_01 = {
  //   type: jsPsychPractice,
  //   symbol_L: "V",
  //   symbol_R: "U",
  //   outcome_L: "zero",
  //   outcome_R: "win",
  //   context:context_array[0],
  //   choices: ['arrowleft','arrowright'],
  //   correct: 'arrowright',
  //   feedback_duration: 2000
  // }

  // const instructions_02 = {
  //   type: jsPsychMyInstructions,
  //   pages: [
  //     "Great job! Now let's try for one more set of knights."
  //   ],
  //   symbol_L: "W",
  //   symbol_R: "R",
  // }

  // var practice_block_02 = {
  //   type: jsPsychPractice,
  //   symbol_L: "W",
  //   symbol_R: "R",
  //   outcome_L: "lose",
  //   outcome_R: "zero",
  //   context:context_array[1],
  //   choices: ['arrowleft','arrowright'],
  //   correct: 'arrowright',
  //   feedback_duration: 2000
  // }

  // const instructions_03 = {
  //   type: jsPsychMyInstructions,
  //   pages: [
  //     "During the task, there will be many knights to test.<br>Remember to pay close attention to their symbols.",
  //     "Your job is to try to select the best knight on each trial.<br>Even though you will learn the test results for both knights,<br>you will only earn points for the knight you test.",
  //     "<b>HINT:</b> The knights may not always give you points, but some knights will give you points and others will lose you points more often than others.",
  //     "You should try to earn as many points as you can, even if it's not possible to win points or avoid losing points on every round.",
  //     "At the end of the task, the total number of points you've earned will be converted into a performance bonus.",
  //     "Next, we will ask you some questions about the task.<br>You must answer all the questions correctly to continue."],
  //     symbol_L: " ",
  //     symbol_R: " "
  // }

  // var comprehension = {
  //   type: jsPsychComprehension
  // }

  // var instructions = {
  //   timeline: [
  //     instructions_01,
  //     practice_block_01,
  //     instructions_02,
  //     practice_block_02,
  //     instructions_03,
  //     // comprehension
  //   ],
  // // }
  //   loop_function: function(data) {

  //     // Extract number of errors.
  //     const num_errors = data.values().slice(-1)[0].num_errors;

  //     // Check if instructions should repeat.
  //     if (num_errors > max_errors) {
  //       num_loops++;
  //       if (num_loops >= max_loops) {
  //         low_quality = true;
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     } else {
  //       return false;
  //     }

  //   }
  // }

  // var comprehension_check = {
  //   type: jsPsychCallFunction,
  //   func: function(){},
  //   on_finish: function(trial) {
  //     if (low_quality) { jsPsych.endExperiment(); }
  //   }
  // }

  // var ready = {
  //   type: jsPsychInstructions,
  //   pages: [
  //     "Great job! You've passed the comprehension check.",
  //     "Get ready to begin the experiment.<br>Press next when you're ready to start.",
  //   ],
  // }

  // // //---------------------------------------//
  // // // Define probe phase instructions.
  // // //---------------------------------------//

  // var instructions_05 = {
  //   type: jsPsychInstructions,
  //   pages: [
  //     "That's the end of the learning phase. Great job!",
  //     "In this next part, you will select which knights you would like to join your team.",
  //     "As you make your choices, you will not receive any feedback after your choice.",
  //     "You should still choose the knight you think is better on each trial.<br>Your choices will still contribute to your performance bonus.",
  //     "Get ready to make your selections.<br><br>Choose wisely!"
  //   ],
  // }

  // var instructions_06 = {
  //   type: jsPsychInstructions,
  //   pages: [
  //     "That's the end of the selection phase. Great job!",
  //     "Take a break for a few moments and<br>click next when you are ready to continue.",
  //     "Great! You are now going to <b>test</b> a new set of knights.<br>The task is the same as before.",
  //     "Remember to pay close attention to the symbol on each knight<br>and try to earn as many points as you can.",
  //   ],
  // }

  // //---------------------------------------//
  // // Define learning phase 1.
  // //---------------------------------------//
  // // Learning blocks are comprised of
  // // 24 presentations of 4 unique stimulus
  // // pairs (96 total trials). With left/right
  // // side counterbalancing, this is 12
  // // presentations per unique pair / side.

  // Initialize phase array.
  var learning_phase_1 = [];
  var low_quality;
  var val;
  var color;

  // Iteratively define trials
  // for (i = 0; i < 12; i++) {
  for (var i = 0; i < 1; i++) {


    // Initialize (temporary) trial array.
    const trials = [];

    // Iterate over unique pairs.
    for (var j = 0; j < 4; j++) {

      // Define metadata.

      if (j % 2 == 0) { 
        val = 'win'; 
        color = context_array[2];
      }
      else { 
        val = 'lose'; 
        color = context_array[3];
      }

      // if (val = 'win') { var color = 'reward'; }
      // else { var color = 'punish'; }

      // If you want to take away counterfactuals half time
      // if (j == 1) { var cf = false;} 
      // else if (j == 3) { var cf = false;}
      // else { var cf = true; }
      var cf = true;


      // Append trial (LR).
      var LR = {
        type: jsPsychLearning,
        symbol_L: symbol_array[2*j+0],
        symbol_R: symbol_array[2*j+1],
        outcome_L: jsPsych.randomization.sampleWithoutReplacement([val,val,val,'zero'],1)[0],
        outcome_R: jsPsych.randomization.sampleWithoutReplacement(['zero','zero','zero',val],1)[0],
        counterfactual: cf,
        context:color,
        choices: ['arrowleft','arrowright'],
        correct: ((val == 'win') ? 'arrowleft' : 'arrowright'),
        data: {block: 1},
        on_finish: function(data) {

          // Evaluate missing data
          if ( data.rt == null ) {

            // Set missing data to true.
            data.missing = true;

            // Increment counter. Check if experiment should end.
            missed_responses++;
            if (missed_responses >= missed_threshold) {
              low_quality = true;
              jsPsych.endExperiment();
            }

          } else {

            // Set missing data to false.
            data.missing = false;

          }
          console.log(low_quality)
        }

      }

      // Define looping node.
      const LR_node = {
        timeline: [LR],
        loop_function: function(data) {
          return data.values()[0].missing;
        }
      }
      trials.push(LR_node);


      // Append trial (RL).
      var RL = {
        type: jsPsychLearning,
        symbol_L: symbol_array[2*j+1],
        symbol_R: symbol_array[2*j+0],
        outcome_L: jsPsych.randomization.sampleWithoutReplacement(['zero','zero','zero',val],1)[0],
        outcome_R: jsPsych.randomization.sampleWithoutReplacement([val,val,val,'zero'],1)[0],
        counterfactual: cf,
        context:color,
        choices: ['arrowleft','arrowright'],
        correct: ((val == 'win') ? 'arrowright' : 'arrowleft'),
        data: {block: 1},
        on_finish: function(data) {

          // Evaluate missing data
          if ( data.rt == null ) {

            // Set missing data to true.
            data.missing = true;

            // Increment counter. Check if experiment should end.
            missed_responses++;
            if (missed_responses >= missed_threshold) {
              low_quality = true;
              jsPsych.endExperiment();
            }

          } else {

            // Set missing data to false.
            data.missing = false;

          }
          console.log(low_quality)
        }
        
      }

      // Define looping node.
      const RL_node = {
        timeline: [RL],
        loop_function: function(data) {
          return data.values()[0].missing;
        }
      }
      trials.push(RL_node);


    }

    // Shuffle trials. Append.
    learning_phase_1 = learning_phase_1.concat( jsPsych.randomization.repeat(trials, 1) );

  }

  //------------------------------------//
  // Define probe phase 1.
  //------------------------------------//
  // Probe phases are comprised of
  // every possible pair combination
  // (28 in total) presented 4 times
  // (112 total trials).

  // Initialize phase array.
  var probe_phase_1 = [];

  // Iteratively define trials
  // for (i = 0; i < 8; i++) {
  for (i = 0; i < 2; i++) {

    // for (j = 0; j < 8; j++) {
    for (j = 0; j < 2; j++) {

      if (i != j) {

        // Append trial.
        var probe = {
          type: jsPsychProbe,
          symbol_L: symbol_array[i],
          symbol_R: symbol_array[j],
          choices: ['arrowleft','arrowright'],
          data: {block: 1},
          on_finish: function(data) {

            // Evaluate missing data
            if ( data.rt == null ) {

              // Set missing data to true.
              data.missing = true;

              // Increment counter. Check if experiment should end.
              missed_responses++;
              if (missed_responses >= missed_threshold) {
                low_quality = true;
                jsPsych.endExperiment();
              }

            } else {

              // Set missing data to false.
              data.missing = false;

            }

          }

        }

        // Define looping node.
        const probe_node = {
          timeline: [probe],
          loop_function: function(data) {
            return data.values()[0].missing;
          }
        }

        // Add trials twice.
        probe_phase_1.push(probe_node);
        probe_phase_1.push(probe_node);

      }

    }

  }

  // Shuffle trials.
  probe_phase_1 = jsPsych.randomization.repeat(probe_phase_1, 1);


  // // //---------------------------------------//
  // // // Define learning phase 2.
  // // //---------------------------------------//
  // // // Learning blocks are comprised of
  // // // 24 presentations of 4 unique stimulus
  // // // pairs (96 total trials). With left/right
  // // // side counterbalancing, this is 12
  // // // presentations per unique pair / side.

  // // Initialize phase array.
  // var learning_phase_2 = [];

  // // Iteratively define trials
  // // for (i = 0; i < 12; i++) {
  // for (i = 0; i < 2; i++) {

  //   // Initialize (temporary) trial array.
  //   const trials = [];

  //   // Iterate over unique pairs.
  //   for (j = 0; j < 4; j++) {
  //   // for (j = 4; j < 8; j++) {

  //       // Define metadata.
  //       if (j % 2 == 0) { 
  //         var val = 'win'; 
  //         var color = context_array[4];
  //       }
  //       else { 
  //         var val = 'lose'; 
  //         var color = context_array[5];
  //       }

  //     // // Define metadata.
  //     // if (j % 2 == 0) { var val = 'win'; }
  //     // else { var val = 'lose'; }

  //     // if (val = 'lose') { var color = 'reward'; }
  //     // else { var color = 'punish'; }


  //     // If you want to take away counterfactuals half time
  //     // if (j == 1) { var cf = false;} 
  //     // else if (j == 3) { var cf = false;}
  //     // else { var cf = true; }
  //     var cf = true;
  //     // Append trial (LR).
  //     var LR = {
  //       type: jsPsychLearning,
  //       symbol_L: symbol_array[2*j+0],
  //       symbol_R: symbol_array[2*j+1],
  //       outcome_L: jsPsych.randomization.sampleWithoutReplacement([val,val,val,'zero'],1)[0],
  //       outcome_R: jsPsych.randomization.sampleWithoutReplacement(['zero','zero','zero',val],1)[0],
  //       counterfactual: cf,
  //       context:color,
  //       choices: ['arrowleft','arrowright'],
  //       correct: ((val == 'win') ? 'arrowleft' : 'arrowright'),
  //       data: {block: 2},
  //       on_finish: function(data) {

  //         // Evaluate missing data
  //         if ( data.rt == null ) {

  //           // Set missing data to true.
  //           data.missing = true;

  //           // Increment counter. Check if experiment should end.
  //           missed_responses++;
  //           if (missed_responses >= missed_threshold) {
  //             low_quality = true;
  //             jsPsych.endExperiment();
  //           }

  //         } else {

  //           // Set missing data to false.
  //           data.missing = false;

  //         }

  //       }

  //     }

  //     // Define looping node.
  //     const LR_node = {
  //       timeline: [LR],
  //       loop_function: function(data) {
  //         return data.values()[0].missing;
  //       }
  //     }
  //     trials.push(LR_node);

  //     // Append trial (RL).
  //     var RL = {
  //       type: jsPsychLearning,
  //       symbol_L: symbol_array[2*j+1],
  //       symbol_R: symbol_array[2*j+0],
  //       outcome_L: jsPsych.randomization.sampleWithoutReplacement(['zero','zero','zero',val],1)[0],
  //       outcome_R: jsPsych.randomization.sampleWithoutReplacement([val,val,val,'zero'],1)[0],
  //       counterfactual: cf,
  //       context:color,
  //       choices: ['arrowleft','arrowright'],
  //       correct: ((val == 'win') ? 'arrowright' : 'arrowleft'),
  //       data: {block: 2},
  //       on_finish: function(data) {

  //         // Evaluate missing data
  //         if ( data.rt == null ) {

  //           // Set missing data to true.
  //           data.missing = true;

  //           // Increment counter. Check if experiment should end.
  //           missed_responses++;
  //           if (missed_responses >= missed_threshold) {
  //             low_quality = true;
  //             jsPsych.endExperiment();
  //           }

  //         } else {

  //           // Set missing data to false.
  //           data.missing = false;

  //         }

  //       }

  //     }

  //     // Define looping node.
  //     const RL_node = {
  //       timeline: [RL],
  //       loop_function: function(data) {
  //         return data.values()[0].missing;
  //       }
  //     }
  //     trials.push(RL_node);

  //   }

  //   // Shuffle trials. Append.
  //   learning_phase_2 = learning_phase_2.concat( jsPsych.randomization.repeat(trials, 1) );

  // }

  // // //------------------------------------//
  // // // Define probe phase 2.
  // // //------------------------------------//
  // // // Probe phases are comprised of
  // // // every possible pair combination
  // // // (28 in total) presented 4 times
  // // // (112 total trials).


  // // Initialize phase array.
  // probe_phase_2 = [];

  // // Iteratively define trials
  // // for (i = 0; i < 8; i++) {
  // for (i = 0; i < 2; i++) {

  //   // for (j = 0; j < 8; j++) {
  //   for (j = 0; j < 2; j++) {

  //     if (i != j) {

  //       // Append trial.
  //       var probe = {
  //         type: jsPsychProbe,
  //         symbol_L: symbol_array[i],
  //         symbol_R: symbol_array[j],
  //         choices: ['arrowleft','arrowright'],
  //         data: {block: 2},
  //         on_finish: function(data) {

  //           // Evaluate missing data
  //           if ( data.rt == null ) {

  //             // Set missing data to true.
  //             data.missing = true;

  //             // Increment counter. Check if experiment should end.
  //             missed_responses++;
  //             if (missed_responses >= missed_threshold) {
  //               low_quality = true;
  //               jsPsych.endExperiment();
  //             }

  //           } else {

  //             // Set missing data to false.
  //             data.missing = false;

  //           }

  //         }

  //       }

  //       // Define looping node.
  //       const probe_node = {
  //         timeline: [probe],
  //         loop_function: function(data) {
  //           return data.values()[0].missing;
  //         }
  //       }

  //       // Add trials twice.
  //       probe_phase_2.push(probe_node);
  //       probe_phase_2.push(probe_node);

  //     }

  //   }

  // };

  // // Shuffle trials.
  // probe_phase_2 = jsPsych.randomization.repeat(probe_phase_2, 1);

  // // Complete screen
  // var complete = {
  //   type: jsPsychInstructions,
  //   pages: [
  //     "Great job! You have completed the experiment."
  //   ],
  //   show_clickable_nav: true,
  //   button_label_previous: 'Prev',
  //   button_label_next: 'Next',
  // }

  const fullscreen = {
    type: jsPsychFullscreen
  }

  var timeline = [];

  timeline = timeline.concat(fullscreen);
  // timeline = timeline.concat(instructions);
  // // timeline = timeline.concat(comprehension_check); // Comprehension check (implicit)
  // timeline = timeline.concat(ready);
  timeline = timeline.concat(learning_phase_1);
  // timeline = timeline.concat(instructions_05);
  timeline = timeline.concat(probe_phase_1);  
  // timeline = timeline.concat(instructions_06);
  // timeline = timeline.concat(learning_phase_2);
  // timeline = timeline.concat(instructions_05);
  // timeline = timeline.concat(probe_phase_2);
  // timeline = timeline.concat(complete);

  return timeline;
}


// Honeycomb, please include these options, and please get the timeline from this function.
export { jsPsychOptions, buildTimeline };
