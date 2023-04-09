import jsPsychLearning from '../js/learning-trials'
import jsPsychProbe from '../js/probe'
import jsPsychFullscreen from '@jspsych/plugin-fullscreen'
import jsPsychInstructions from '@jspsych/plugin-instructions'
import jsPsychComprehension from '../js/comprehension'
import jsPsychMyInstructions from '../js/instructions'
import jsPsychPractice from '../js/practice'
import jsPsychHtmlSliderResponse from '@jspsych/plugin-html-slider-response'
import jsPsychSurveyMultiChoice from '@jspsych/plugin-survey-multi-choice'
import jsPsychCallFunction from '@jspsych/plugin-call-function'
import jsPsychImageKeyboardResponse from '@jspsych/plugin-image-keyboard-response';
import jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
// import jsPsychExternalHtml from '@jspsych/plugin-external-html';
import jspsychPluginHtml from '@adp-psych/jspsych-plugin-html';
import 'jspsych/css/jspsych.css';
import '../css/robots-css.min.css'
import { images } from '../lib/utils';

// Add your jsPsych options here.
// Honeycomb will combine these custom options with other options needed by Honyecomb.
const jsPsychOptions = {
  on_trial_finish: function(data) {
    if (typeof data.value == 'undefined') {
      data.value='replacement';
    }
    if (typeof data.subject_id == 'undefined') {
      data.subject_id='replacement';
    }
    if (typeof data.missed_code == 'undefined') {
      data.missed_code='replacement';
    }
    if (typeof data.display_code == 'undefined') {
      data.display_code='replacement';
    }
    if (typeof data.response_code == 'undefined') {
      data.response_code='replacement';
    }
    if (typeof data.feedback_code == 'undefined') {
      data.feedback_code='replacement';
    }
    console.log(data)
  }
};

function reduce(numerator,denominator){
  var gcd = function gcd(a,b){
    return b ? gcd(b, a%b) : a;
  };
  gcd = gcd(numerator,denominator);
  return [numerator/gcd, denominator/gcd];
}

function buildTimeline(jsPsych) {

  // Define unique symbols.
  var symbol_array = ['c','d','e','f','j','k','m','o','x','s','t','y','C','N','O','L','T','X']

  // Shuffle symbols.
  symbol_array = jsPsych.randomization.repeat(symbol_array, 1);

  // Define the contexts.
  var practice_array = ['forrest_1', 'desert_1']
  var learn_1_array = ['forrest_2', 'desert_4']
  var learn_2_array = ['forrest_4', 'desert_3']

  // Randomize the contexts.
  var context_array = jsPsych.randomization.repeat(practice_array, 1);
  context_array = context_array.concat(['gray'])
  context_array = context_array.concat(jsPsych.randomization.repeat(learn_1_array, 1));
  context_array = context_array.concat(['gray'])
  context_array = context_array.concat(jsPsych.randomization.repeat(learn_2_array, 1));

  var debug = false
  
  // Define missed repsonses count.
  var missed_threshold = 10;
  var missed_responses = 0;

  // Define correct responses
  var correct_trial_count = 0;
  var total_trial_count = 0;

  // Define probabilities (default is all 75/25%)
  var reward_probs_a = .75
  var reward_probs_b = .75

  // Define counterfactual
  var cf = true;
  var font_size = 24;


  //---------------------------------------//
  // Define learning phase instructions.
  //---------------------------------------//
  // sample function that might be used to check if a subject has given

  const consentFormHtml = `
    <article id="pcf" class="instructions">
      <h1>Participant Consent Form</h1>
      <p>
      <p>                                  </p>
      <pCONSENT FOR RESEARCH PARTICIPATION</p>
      <p><strong>Assessing symptom and mood dynamics in pain using a
      smartphone application</strong></p>
      </blockquote>
      <p><mark>Online Task Sub-study: Perceptual Learning Computer Game Pilot
      Study</mark></p>
      <p>V4, 1/25/2023</p>
      <blockquote>
      <p><You are invited to take part in a Brown University research
      study. Your participation is voluntary.</p>
      <ul>
      <li><p style="text-align: left;">RESEARCHER:Frederike Petzschner, Ph.D.</p></li>
      <li><p style="text-align: left;">PURPOSE:This study is about assessing changes in how you learn
      and perceive different stimuli during an online computer game between
      adults with and without different common physical or psychological
      symptoms such as pain, depression, and anxiety. You are being asked to
      participate because you are an adult over the age of 18 who is a
      registered Prolific user and you have indicated that you either
      experience no pain or psychological symptoms, do experience pain of
      acute duration (for 3 months or less) or chronic duration (greater than
      3 months), and/or that you experience some common psychological symptoms
      like anxiety or depression.</p></li>
      <li><p style="text-align: left;">PROCEDURES: You will be asked to complete a computer game online
      via Prolific.</p></li>
      <li><p style="text-align: left;">TIME INVOLVED:The study will take approximately 1-1.5 hours of
      time.</p></li>
      <li><p style="text-align: left;">COMPENSATION:You will be paid $8 per hour for participation in
      this study via your existing registered Prolific account. You may
      receive a monetary bonus of up to $4 based on your performance during
      the game. Payments will be received from Prolific in accordance with
      terms and conditions agreed to through this platform.</p></li>
      <li><p style="text-align: left;">RISKS: You may feel bored or become tired during some parts of
      the computer game but other than that there are no real risks to you.
      You will be able to take breaks at instructed time throughout the task
      to help minimize this. All of your data will be stored without any
      personally identifying information on Brown University approved secure
      servers.</p></li>
      <li><p style="text-align: left;">BENEFITS:There are no direct benefits to you if you agree to be
      in this research study.</p></li>
      <li><p style="text-align: left;">CONFIDENTIALITY:To maintain confidentiality, we will assign all
      your data a numerical code. Your responses will not be connected to your
      identity. Please note that complete confidentiality can never be
      guaranteed when information is transmitted over the internet.</p></li>
      <li><p style="text-align: left;">VOLUNTARY: You do not have to be in this study if you do not want
      to be. Even if you decide to be in this study, you can change your mind
      and stop at any time.</p></li>
      <li><p style="text-align: left;">CONTACT INFORMATION: If you have any questions about your
      participation in this study, you can ask at any time, call our office at
      Brown University at (401)863-6272 or email <a
      href="mailto:soma@brown.edu">soma@brown.edu.</a></p></li>
      <li><p style="text-align: left;">YOUR RIGHTS: If you have questions about your rights as a
      research participant, you can contact Brown University’s Human Research
      Protection Program at 401-863-3050 or email them at <a
      href="mailto:IRB@Brown.edu">IRB@Brown.edu.</a></p></li>
      <li><p style="text-align: left;">CONSENT TO PARTICIPATE:Clicking the link below confirms that you
      have read and understood the information in this document, are 18 years
      old or older and that you agree to volunteer as a research participant
      for this study.</p></li>
      </p>
      <form id="consent-form">
        <label>
          <input type="checkbox" id="consent" />
          I want to participate.
        </label>
        <p id="consent-error" class="error"></p>
        <button type="button" class="jspsych-btn" id="begin">
          Begin Experiment
        </button>
      </form>
    </article>
  `;

  const isNil = (x) => typeof x === 'undefined' || x === null;

  const consentErrorMessage =
    'You must agree to the consent declaration before you may begin.';

  const checkConsent = () => {
    if (document?.querySelector('#consent')?.checked) {
      return true;
    }
    const consentError = document?.querySelector('#consent-error');
    if (!isNil(consentError)) {
      consentError.textContent = consentErrorMessage;
    }
    return false;
  };

  const idTimelineNode = {
    'check_fn': checkConsent,
    'cont_btn': 'begin',
    'html': consentFormHtml,
    'type': jspsychPluginHtml,
  };

  var instructions_000 = {
    type: jsPsychImageKeyboardResponse,
    stimulus: images['keyboard.png'],
    stimulus_height: 400,
    prompt: '<p style="font-size:'+font_size+'px;">Welcome to the experiment. You can press the Left and Right arrow keys to move through the instructions.</p>'
  };

  var instructions_00 = {
    type: jsPsychInstructions,
    pages: [
      '<p style="font-size:'+font_size+'px;">We are first going to start with a few questions about your pain levels.',
    ],
  }
  
  var pain_01 = {
    type: jsPsychHtmlSliderResponse,
    labels: ['<p style="font-size:'+font_size+'px;">no pain', '<p style="font-size:'+font_size+'px;">worst imaginable'],
    stimulus: '<p style="font-size:'+font_size+'px;">Averaged over the past week, how intense is your pain?</p>',
  };

  var pain_02 = {
    type: jsPsychHtmlSliderResponse,
    labels: ['<p style="font-size:'+font_size+'px;">no pain', '<p style="font-size:'+font_size+'px;">worst imaginable'],
    stimulus: '<p style="font-size:'+font_size+'px;">Averaged over the past week, how unpleasant is your pain?</p>',
  };

    var pain_03 = {
      type: jsPsychHtmlSliderResponse,
      labels: ['<p style="font-size:'+font_size+'px;">no pain', '<p style="font-size:'+font_size+'px;">worst imaginable'],
      stimulus: '<p style="font-size:'+font_size+'px;">How much has your pain interfered with your activities <br> over the past week?</p>',
  };

    var pain_04 = {
      type: jsPsychSurveyMultiChoice,
      questions: [
        {
          prompt: "How long have you been in pain?",
          name: 'Pain Duration', 
          options: ['I am not in pain', '< 2 weeks', '2-4 weeks', '1 – 3 months', '3 – 6 months', 
          '6 – 12 months', '1 – 5 years', '> 5 years', '> 10 years'], 
          required: true
        }
      ],
    };


  var instructions_01 = {
    type: jsPsychMyInstructions,
    pages: [
      "We are now starting the experiment.<br><br>Use the left/right arrow keys to navigate the instructions.",
      "In this task, you are picking a team of knights.<br>The knights will look like the ones below.",
      "Each knight will have a <b>unique symbol</b> on its chestplate.<br>This symbol will help you identify each knight.",
      "You'll also pick your team of knights from different places, either the desert or forest.",
      "On every turn, you will choose a knight for your team.<br>When you select a knight, it may give you:<br><b><font color=#01579b>+10 points, </font><font color=#303030>+0 points</font></b>, or <b><font color=#A41919>-10 points</font></b>.",
      "Once you've selected your knight, their platform and visor will light up to indicate your choice.",
      "To help you learn, we will also show you the points you<br><i>could have earned</i> if you had chosen the other knight.<br><b>NOTE:</b> You will earn points only for the knight you chose.",
      "Some knights are better than others. Some will gain points while others will avoid losing points. Try to earn as many points as you can.",
      "Now let's practice with the knights below. Using the left/right<br>arrow keys, select the knights for testing and try to learn<br>which will give you more points.",
      "<b>HINT:</b> You can differentiate between the knights based on the symbols on their chestplate.  Try to avoid losing points."
    ],
    symbol_L: "V",
    symbol_R: "U",
  }

  var practice_block_01 = {
    type: jsPsychPractice,
    symbol_L: "V",
    symbol_R: "U",
    outcome_L: "zero",
    outcome_R: "win",
    context:context_array[0],
    choices: ['arrowleft','arrowright'],
    correct: 'arrowright',
    feedback_duration: 2000
  }

  const instructions_02 = {
    type: jsPsychMyInstructions,
    pages: [
      "Great job! Now let's try for one more set of knights."
    ],
    symbol_L: "W",
    symbol_R: "R",
  }

  var practice_block_02 = {
    type: jsPsychPractice,
    symbol_L: "W",
    symbol_R: "R",
    outcome_L: "lose",
    outcome_R: "zero",
    context:context_array[1],
    choices: ['arrowleft','arrowright'],
    correct: 'arrowright',
    feedback_duration: 2000
  }

  const instructions_03 = {
    type: jsPsychMyInstructions,
    pages: [
      "During the task, there will be many different knights to choose from.<br>Remember to pay close attention to their symbols on their chestplates.",
      "Your job is to try to select the best knight in each pair.<br>Even though you will learn the outcomes for both knights,<br>you will only earn points for the knight you choose.",
      "<b>HINT:</b> The knights may not always give you points, but some knights are better at gaining points while other knights are better at avoiding losing points.",
      "You should try to earn as many points as you can, even if it's not possible to win points or avoid losing points on every round.",
      "At the end of the task, the total number of points you've earned will be converted into a performance percentage. You can earn up to an additional $4 based on your performance.",
      "Next, we will ask you some questions about the task.<br>You must answer all the questions correctly to be able to continue."],
      symbol_L: " ",
      symbol_R: " "
  }

  var comprehension = {
    type: jsPsychComprehension
  }

  // Define comprehension threshold.
  var max_errors = 0;
  var max_loops = 3;
  var num_loops = 0;

  if (debug){
    var instructions = {
      timeline: [
        instructions_00
      ],
    };
  }
  else { 
    instructions = {
      timeline: [
        idTimelineNode,
        instructions_000,
        instructions_00, 
        pain_01,
        pain_02,
        pain_03,
        pain_04,
        instructions_01,
        practice_block_01,
        instructions_02,
        practice_block_02,
        instructions_03,
        comprehension
      ],

    // }
      loop_function: function(data) {

        // Extract number of errors.
        const num_errors = data.values().slice(-1)[0].num_errors;

        // Check if instructions should repeat.
        if (num_errors > max_errors) {
          console.log(num_errors)
          num_loops++;
          if (num_loops >= max_loops) {
            low_quality = true;
            return false;
          } else {
            return true;
          }
        } 
        else {
          return false;
        }

      }
    }
  }


  var comprehension_check = {
    type: jsPsychCallFunction,
    func: function(){},
    on_finish: function() {
      if (low_quality) { jsPsych.endExperiment(); }
    }
  }

  var ready = {
    type: jsPsychInstructions,
    pages: [
      '<p style="font-size:'+font_size+'px;">Great job! You passed the comprehension check.',
      '<p style="font-size:'+font_size+'px;">Get ready to begin the experiment.<br>Press the right arrow key when you are ready to start.',
    ],
  }

  // // //---------------------------------------//
  // // // Define probe phase instructions.
  // // //---------------------------------------//

  var instructions_05 = {
    type: jsPsychInstructions,
    pages: () => {
      return [
        '<p style="font-size:'+font_size+'px;">That is the end of the learning phase. Great job! You have made '+Math.round(correct_trial_count/total_trial_count*100)+'% correct',
        '<p style="font-size:'+font_size+'px;">In this next part, you will see the same knights as before, but they will be shown in new pair combinations. <br>Again, your job will be to select the knight you would like to join your team.',
        '<p style="font-size:'+font_size+'px;">As you make your choices, you will not receive any feedback after your choice.',
        '<p style="font-size:'+font_size+'px;">You should still choose the knight you think is better on each trial.<br>Your choices will still contribute to your performance bonus.',
        '<p style="font-size:'+font_size+'px;">Get ready to make your selections.<br><br>Choose wisely!'
      ]
    }
  }

  var instructions_06 = {
    type: jsPsychInstructions,

    pages: () => {
      return [
        '<p style="font-size:'+font_size+'px;">That is the end of the selection phase. Great job!',
        '<p style="font-size:'+font_size+'px;">Take a break for a few moments and<br>click next when you are ready to continue.',
        '<p style="font-size:'+font_size+'px;">Great! You are now going to <b>test</b> a new set of knights.<br>The task is the same as before.',
        '<p style="font-size:'+font_size+'px;">Remember to pay close attention to the symbol on each knight<br>and try to earn as many points as you can.',
      ]
    }
  }

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
  var reduced_a;
  var reduced_b;
  var diff_a;
  var diff_b;
  var arr_1;
  var arr_2;
  var diff_arr_1;
  var diff_arr_2;
  var reward_prob;
  var iters;
  var probe_iters;
  var context_iters

  if (debug){
    iters = 2;
    probe_iters = 3;
    context_iters = 1;
  }
  else { 
    iters = 12;
    probe_iters = 9;
    context_iters = 3;
  }


  // Iteratively define trials
  // for (var i = 0; i < 2; i++) {
  for (var i = 0; i < iters; i++) {

    // const code = eventCodes.fixation;

    // Initialize (temporary) trial array.
    const trials = [];

    // Iterate over unique pairs.
    for (var j = 0; j < 4; j++) {

      // Define metadata.

      reduced_a = reduce(reward_probs_a*100, 100);
      diff_a = reduced_a[1] - reduced_a[0];
      reduced_b = reduce(reward_probs_b*100, 100);
      diff_b = reduced_b[1] - reduced_b[0];

      if (j == 0) { 
        val = 'win'; 
        arr_1 = Array(reduced_a[0]).fill('zero');
        diff_arr_1 = Array(diff_a).fill(val);
        arr_1 = arr_1.concat(diff_arr_1);
        arr_2 = Array(reduced_a[0]).fill(val);
        diff_arr_2 = Array(diff_a).fill('zero');
        arr_2 = arr_2.concat(diff_arr_2);  
        reward_prob = reward_probs_a;   
        color = context_array[3];
      }
      else if (j == 1) {
        val = 'lose'; 
        arr_1 = Array(reduced_a[0]).fill('zero');
        diff_arr_1 = Array(diff_a).fill(val);
        arr_1 = arr_1.concat(diff_arr_1);
        arr_2 = Array(reduced_a[0]).fill(val);
        diff_arr_2 = Array(diff_a).fill('zero');
        arr_2 = arr_2.concat(diff_arr_2); 
        reward_prob = reward_probs_a;    
        color = context_array[4];
      }
      else if (j == 2) {
        val = 'win'; 
        arr_1 = Array(reduced_b[0]).fill('zero');
        diff_arr_1 = Array(diff_b).fill(val);
        arr_1 = arr_1.concat(diff_arr_1);
        arr_2 = Array(reduced_b[0]).fill(val);
        diff_arr_2 = Array(diff_b).fill('zero');
        arr_2 = arr_2.concat(diff_arr_2);
        reward_prob = reward_probs_b; 
        color = context_array[3];
      }
      else { 
        val = 'lose'; 
        arr_1 = Array(reduced_b[0]).fill('zero');
        diff_arr_1 = Array(diff_b).fill(val);
        arr_1 = arr_1.concat(diff_arr_1);
        arr_2 = Array(reduced_b[0]).fill(val);
        diff_arr_2 = Array(diff_b).fill('zero');
        arr_2 = arr_2.concat(diff_arr_2);
        reward_prob = reward_probs_b;  
        color = context_array[4];
      }

      // if (val = 'win') { var color = 'reward'; }
      // else { var color = 'punish'; }

      // If you want to take away counterfactuals half time
      // if (j == 1) { var cf = false;} 
      // else if (j == 3) { var cf = false;}
      // else { var cf = true; }


      // Append trial (LR).
      var LR = {
        type: jsPsychLearning,
        symbol_L: symbol_array[2*j+0],
        symbol_R: symbol_array[2*j+1],
        outcome_L: jsPsych.randomization.sampleWithoutReplacement(arr_2,1)[0],
        outcome_R: jsPsych.randomization.sampleWithoutReplacement(arr_1,1)[0],
        probs: reward_prob,
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
            total_trial_count++;
            if (data.accuracy == 1) {
              correct_trial_count++;
            }
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
        outcome_L: jsPsych.randomization.sampleWithoutReplacement(arr_1,1)[0],
        outcome_R: jsPsych.randomization.sampleWithoutReplacement(arr_2,1)[0],
        probs: reward_prob,
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
            total_trial_count++;
            if (data.accuracy == 1) {
              correct_trial_count++;
            }
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
  // (112 total trials). Each presented 3 times 
  // either neutral (gray) background or 
  // 2 other contexts (reward or punishment) (336 trials total).

  // Initialize phase array.
  var probe_phase_1 = [];
  // Iteratively define trials
  // for (i = 0; i < 8; i++) {
  for (var p = 0; p < probe_iters; p++) {

    // for (j = 0; j < 8; j++) {
    for (var q = 0; q < probe_iters; q++) {

      for (var c = 0; c < context_iters; c++) {

        if (p != q) {


          // Append trial.
          var probe = {
            type: jsPsychProbe,
            symbol_L: symbol_array[p],
            symbol_R: symbol_array[q],
            context: context_array[4-c],
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

  // Initialize phase array.
  var learning_phase_2 = [];

  // Iteratively define trials
  for (var n = 0; n < iters; n++) {

    // Initialize (temporary) trial array.
    const trials = [];

    // Iterate over unique pairs.
    for (var m = 4; m < 8; m++) {
    // for (j = 4; j < 8; j++) {

      // Define metadata.

        reduced_a = reduce(reward_probs_a*100, 100);
        diff_a = reduced_a[1] - reduced_a[0];
        reduced_b = reduce(reward_probs_b*100, 100);
        diff_b = reduced_b[1] - reduced_b[0];

        if (m == 4) { 
          val = 'win'; 
          arr_1 = Array(reduced_a[0]).fill('zero');
          diff_arr_1 = Array(diff_a).fill(val);
          arr_1 = arr_1.concat(diff_arr_1);
          arr_2 = Array(reduced_a[0]).fill(val);
          diff_arr_2 = Array(diff_a).fill('zero');
          arr_2 = arr_2.concat(diff_arr_2);  
          reward_prob = reward_probs_a;   
          color = context_array[6];
        }
        else if (m == 5) {
          val = 'lose'; 
          arr_1 = Array(reduced_a[0]).fill('zero');
          diff_arr_1 = Array(diff_a).fill(val);
          arr_1 = arr_1.concat(diff_arr_1);
          arr_2 = Array(reduced_a[0]).fill(val);
          diff_arr_2 = Array(diff_a).fill('zero');
          arr_2 = arr_2.concat(diff_arr_2); 
          reward_prob = reward_probs_a;    
          color = context_array[7];
        }
        else if (m == 6) {
          val = 'win'; 
          arr_1 = Array(reduced_b[0]).fill('zero');
          diff_arr_1 = Array(diff_b).fill(val);
          arr_1 = arr_1.concat(diff_arr_1);
          arr_2 = Array(reduced_b[0]).fill(val);
          diff_arr_2 = Array(diff_b).fill('zero');
          arr_2 = arr_2.concat(diff_arr_2);
          reward_prob = reward_probs_b; 
          color = context_array[6];
        }
        else { 
          val = 'lose'; 
          arr_1 = Array(reduced_b[0]).fill('zero');
          diff_arr_1 = Array(diff_b).fill(val);
          arr_1 = arr_1.concat(diff_arr_1);
          arr_2 = Array(reduced_b[0]).fill(val);
          diff_arr_2 = Array(diff_b).fill('zero');
          arr_2 = arr_2.concat(diff_arr_2);
          reward_prob = reward_probs_b;  
          color = context_array[7];
        }

      // If you want to take away counterfactuals half time
      // if (j == 1) { var cf = false;} 
      // else if (j == 3) { var cf = false;}
      // else { var cf = true; }
      // Append trial (LR).
      LR = {
        type: jsPsychLearning,
        symbol_L: symbol_array[2*m+0],
        symbol_R: symbol_array[2*m+1],
        outcome_L: jsPsych.randomization.sampleWithoutReplacement(arr_2,1)[0],
        outcome_R: jsPsych.randomization.sampleWithoutReplacement(arr_1,1)[0],
        probs: reward_prob,
        counterfactual: cf,
        context:color,
        choices: ['arrowleft','arrowright'],
        correct: ((val == 'win') ? 'arrowleft' : 'arrowright'),
        data: {block: 2},
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
            total_trial_count++;
            if (data.accuracy == 1) {
              correct_trial_count++;
            }
          }

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
      RL = {
        type: jsPsychLearning,
        symbol_L: symbol_array[2*m+1],
        symbol_R: symbol_array[2*m+0],
        outcome_L: jsPsych.randomization.sampleWithoutReplacement(arr_1,1)[0],
        outcome_R: jsPsych.randomization.sampleWithoutReplacement(arr_2,1)[0],
        probs: reward_prob,
        counterfactual: cf,
        context:color,
        choices: ['arrowleft','arrowright'],
        correct: ((val == 'win') ? 'arrowright' : 'arrowleft'),
        data: {block: 2},
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
            total_trial_count++;
            if (data.accuracy == 1) {
              correct_trial_count++;
            }
          }

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
    learning_phase_2 = learning_phase_2.concat( jsPsych.randomization.repeat(trials, 1) );

  }

  // //------------------------------------//
  // // Define probe phase 2.
  // //------------------------------------//
  // // Probe phases are comprised of
  // // every possible pair combination
  // // (28 in total) presented 4 times
  // // (112 total trials).


  // Initialize phase array.
  var probe_phase_2 = [];

  // Iteratively define trials

  // // Iteratively define trials
  // for (r = 8; r < 16; r++) {

  //   for (s = 8; s < 16; s++) {

  // Iteratively define trials
  for (var r = 9; r < 17; r++) {

    for (var s = 9; s < 17; s++) {

      for (var d = 0; d < 3; d++) {

        if (r != s) {

          // Append trial.
          probe = {
            type: jsPsychProbe,
            symbol_L: symbol_array[r],
            symbol_R: symbol_array[s],
            context: context_array[7-d],
            choices: ['arrowleft','arrowright'],
            data: {block: 2},
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
        }
        // Define looping node.
        const probe_node = {
          timeline: [probe],
          loop_function: function(data) {
            return data.values()[0].missing;
          }
        }

        // Add trials twice.
        probe_phase_2.push(probe_node);
        probe_phase_2.push(probe_node);

      }

    }

  }

  // Shuffle trials.
  probe_phase_2 = jsPsych.randomization.repeat(probe_phase_2, 1);

  
  // Complete screen
  var complete = {
    type: jsPsychInstructions,
    pages: () => {
      return [
        '<p style="font-size:'+font_size+'px;">Great job! You have completed the experiment. You have made '+Math.round(correct_trial_count/total_trial_count*100)+'% correct',
    ]},
    show_clickable_nav: true,
    button_label_previous: 'Prev',
    button_label_next: 'Next',
  }

  var final_trial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<p>You've finished the last task. Thanks for participating!</p>
      <p><a href="https://app.prolific.co/submissions/complete?cc=CK5KGDJA">Click here to return to Prolific and complete the study</a>.</p>`,
    choices: "NO_KEYS"
  }

  const fullscreen = {
    type: jsPsychFullscreen
  }

  

  var timeline = [];

  timeline = timeline.concat(fullscreen);
  timeline = timeline.concat(instructions);
  timeline = timeline.concat(comprehension_check); 
  timeline = timeline.concat(ready);
  timeline = timeline.concat(learning_phase_1);
  timeline = timeline.concat(instructions_05);
  timeline = timeline.concat(probe_phase_1);  
  timeline = timeline.concat(instructions_06);
  timeline = timeline.concat(learning_phase_2);
  timeline = timeline.concat(instructions_05);
  timeline = timeline.concat(probe_phase_2);
  timeline = timeline.concat(complete);
  timeline = timeline.concat(final_trial);


  return timeline;
}


// Honeycomb, please include these options, and please get the timeline from this function.
export { jsPsychOptions, buildTimeline };
