import { ParameterType } from "jspsych";
import { images } from '../lib/utils';
import { eventCodes } from '../config/main'
import { pdSpotEncode } from '../lib/markup/photodiode'

const info = {
  name: 'practice',
  parameters: {
    symbol_L: {
      type: ParameterType.STRING,
      pretty_name: 'Symbol (left)',
      default: '',
      description: 'Key code of corresponding symbol for left robot'
    },
    symbol_R: {
      type: ParameterType.STRING,
      pretty_name: 'Symbol (right)',
      default: '',
      description: 'Key code of corresponding symbol for right robot'
    },
    outcome_L: {
      type: ParameterType.STRING,
      pretty_name: 'Feedback (left)',
      description: 'Outcome for left robot.'
    },
    outcome_R: {
      type: ParameterType.STRING,
      pretty_name: 'Feedback (right)',
      description: 'Outcome for right robot.'
    },
    correct: {
      type: ParameterType.KEY,
      pretty_name: 'Correct',
      description: 'The key corresponding to the better robot.'
    },
    counterfactual: {
      type: ParameterType.BOOL,
      pretty_name: 'Counterfactual feedback',
      default: true,
      description: 'Present feedback for both chosen and unchosen stimuli.'
    },
    context: {
      type: ParameterType.STRING,
      pretty_name: 'Condition',
      description: 'Win or lose condition'
    },
    context_duration: {
      type: ParameterType.INT,
      pretty_name: 'Context duration',
      default: 500,
      description: 'Duration of context.'
    },
    randomize: {
      type: ParameterType.BOOL,
      pretty_name: 'Randomize',
      default: true,
      description: 'Randomize side of robots.'
    },
    choices: {
      type: ParameterType.KEY,
      array: true,
      pretty_name: 'Choices',
      default: ['arrowleft','arrowright'],
      description: 'The keys the subject is allowed to press to respond to the stimulus.'
    },
    robot_duration: {
      type: ParameterType.INT,
      pretty_name: 'Trial duration',
      default: 500,
      description: 'Duration of choice indication phase.'
    },
    feedback_duration: {
      type: ParameterType.INT,
      pretty_name: 'Trial duration',
      default: 3000,
      description: 'Duration of outcome phase.'
    },
    feedback_win: {
      type: ParameterType.STRING,
      pretty_name: 'Feedback (win)',
      default: "+10",
      description: 'Feedback for win outcome.'
    },
    feedback_zero: {
      type: ParameterType.STRING,
      pretty_name: 'Feedback (neutral)',
      default: "+0",
      description: 'Feedback for neutral outcome.'
    },
    feedback_lose: {
      type: ParameterType.STRING,
      pretty_name: 'Feedback (lose)',
      default: "-10",
      description: 'Feedback for lose outcome.'
    }
  }
}
/**
 * **practice-trials**
 *
 * jsPsych plugin for practice trial
 *
 * @author Lucy Owen
 * @see {}
 */
class PracticePlugin {
constructor(jsPsych) {
    this.jsPsych = jsPsych;
}
trial(display_element, trial) {

  var background_images = { 
    forrest_1: images['forrest_1.jpg'],
    forrest_2: images['forrest_2.jpg'], 
    forrest_3: images['forrest_3.jpg'],
    forrest_4: images['forrest_4.jpg'],
    desert_1: images['desert_1.jpg'],
    desert_2: images['desert_2.jpg'],
    desert_3: images['desert_3.jpg'], 
    desert_4: images['desert_4.jpg'],
  }

  // Initialize HTML.
  var new_html = '';

  // Insert CSS (window animation).
  new_html += `<style>
  body {
    height: 100vh;
    max-height: 100vh;
    overflow: hidden;
    position: fixed;
  }
  .jspsych-content-wrapper {
    background: #606060;
    z-index: -1;
  }
  </style>`;

  // Draw task
  new_html += '<div class="wrap">';


  // Draw background.

  new_html += `<div class="landscape-sky" style="background: url(${background_images[trial.context]}) repeat top center"</div>`;

  // Draw screens
  new_html += '<div class="screen" side="left"><div class="screen-msg" id="screenL"></div></div>';
  new_html += '<div class="screen" side="right"><div class="screen-msg" id="screenR"></div></div>';

  // Draw platforms
  new_html += '<div class="platform" id="platformL" side="left"></div>';
  new_html += '<div class="ring" id="ringL" side="left"></div>';
  new_html += '<div class="platform" id="platformR" side="right"></div>';
  new_html += '<div class="ring" id="ringR" side="right"></div>';

  // Draw left robot.
  new_html += '<div class="robot" side="left">';
  new_html += '<div class="head">';
  new_html += '<div class="visor", id="visorL"></div>';
  new_html += '<div class="eye" id="eyeLL" side="left"></div>';
  new_html += '<div class="eye" id="eyeLR" side="right"></div>';
  new_html += '</div>';
  new_html += '<div class="torso">';
  new_html += '<div class="left"></div>';
  new_html += '<div class="right"></div>';
  new_html += `<div class="rune" id="runeL">${trial.symbol_L}</div>`;
  new_html += '</div>';
  new_html += '<div class="shado"></div>'
  new_html += '</div>';

  // Draw right robot.
  new_html += '<div class="robot" side="right">';
  new_html += '<div class="head">';
  new_html += '<div class="visor", id="visorR"></div>';
  new_html += '<div class="eye" id="eyeRL" side="left"></div>';
  new_html += '<div class="eye" id="eyeRR" side="right"></div>';
  new_html += '</div>';
  new_html += '<div class="torso">';
  new_html += '<div class="left"></div>';
  new_html += '<div class="right"></div>';
  new_html += `<div class="rune" id="runeR">${trial.symbol_R}</div>`;
  new_html += '</div>';
  new_html += '<div class="shado"></div>'
  new_html += '</div>';

  new_html += '</div>';


  // jsPsych.pluginAPI.setTimeout(function() {
  //   display_element.querySelector('#jspsych-pre-coin1').style.visibility = 'hidden';
  //   display_element.innerHTML = '<img id="jspsych-pre-coin2" class="jspsych-pre-coin" src="mask.jpg"></img>';
  //   second_change();
  // }, 1000);


  // var fixation = {
  //   type: 'html-keyboard-response',
  //   stimulus: '<div class="landscape-sky" style="background: url(${background_images[trial.context]}) repeat top center"</div>',
  //   choices: "NO_KEYS",
  //   trial_duration: 500,
  // };
  
  // this.jsPsych.pluginAPI.setTimeout(function() {
  //   fixation();
  // }, trial.context_duration);


  // draw
  display_element.innerHTML = new_html;

  //---------------------------------------//
  // Task functions.
  //---------------------------------------//


  // store response
  var response_history = [];

  // store response
  var response = {
    
    rt: null,
    key: null,
    code: null,
  };
  

  // function to handle responses by the subject
  var after_response = (info) => {

    // Kill any timeout handlers / keyboard listeners
    this.jsPsych.pluginAPI.clearAllTimeouts();
    this.jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);

    const code = eventCodes.response;
    pdSpotEncode(code);
    response.code = code;

    // record responses
    
    response.rt = info.rt;
    response.key = info.key;

    // Update response_history.
    if (trial.correct == response.key) {
      response_history.unshift(1);
    } else {
      response_history.unshift(0);
    }

    // Visually indicate chosen robot.
    if (response.key == 'arrowleft') {
      display_element.querySelector('#ringL').setAttribute('status', 'chosen');
    } else {
      display_element.querySelector('#ringR').setAttribute('status', 'chosen');
    }

    // Visually indicate chosen robot.
    if (response.key == 'arrowleft') {
      display_element.querySelector('#visorL').setAttribute('status', 'chosen');
    } else {
      display_element.querySelector('#visorR').setAttribute('status', 'chosen');
    }  

    this.jsPsych.pluginAPI.setTimeout(function() {
      present_feedback();
    }, trial.robot_duration);

  };

  // function to end trial when it is time
  var present_feedback = () => {

    // Kill any timeout handlers / keyboard listeners
    this.jsPsych.pluginAPI.clearAllTimeouts();
    this.jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);

    const code = eventCodes.feedback;
    pdSpotEncode(code);
    trial.feedback_code = code;
    
    // Update left side outcome
    if (response.key == 'arrowleft' || trial.counterfactual) {
      if (trial.outcome_L == 'win') {
        display_element.querySelector('#screenL').innerHTML = trial.feedback_win;
        display_element.querySelector('#screenL').setAttribute('outcome', 'win');
        display_element.querySelector('#runeL').setAttribute('outcome', 'win');
        display_element.querySelector('#eyeLL').setAttribute('outcome', 'win');
        display_element.querySelector('#eyeLR').setAttribute('outcome', 'win');
      } else if (trial.outcome_L == 'lose') {
        display_element.querySelector('#screenL').innerHTML = trial.feedback_lose;
        display_element.querySelector('#screenL').setAttribute('outcome', 'lose');
        display_element.querySelector('#runeL').setAttribute('outcome', 'lose');
        display_element.querySelector('#eyeLL').setAttribute('outcome', 'lose');
        display_element.querySelector('#eyeLR').setAttribute('outcome', 'lose');
      } else {
        display_element.querySelector('#screenL').innerHTML = trial.feedback_zero;
        display_element.querySelector('#screenL').setAttribute('outcome', 'zero');
        display_element.querySelector('#runeL').setAttribute('outcome', 'zero');
        display_element.querySelector('#eyeLL').setAttribute('outcome', 'zero');
        display_element.querySelector('#eyeLR').setAttribute('outcome', 'zero');
      }
    }

    // Update right side outcome
    if (response.key == 'arrowright' || trial.counterfactual) {
      if (trial.outcome_R == 'win') {
        display_element.querySelector('#screenR').innerHTML = trial.feedback_win;
        display_element.querySelector('#screenR').setAttribute('outcome', 'win');
        display_element.querySelector('#runeR').setAttribute('outcome', 'win');
        display_element.querySelector('#eyeRL').setAttribute('outcome', 'win');
        display_element.querySelector('#eyeRR').setAttribute('outcome', 'win');
      } else if (trial.outcome_R == 'lose') {
        display_element.querySelector('#screenR').innerHTML = trial.feedback_lose;
        display_element.querySelector('#screenR').setAttribute('outcome', 'lose');
        display_element.querySelector('#runeR').setAttribute('outcome', 'lose');
        display_element.querySelector('#eyeRL').setAttribute('outcome', 'lose');
        display_element.querySelector('#eyeRR').setAttribute('outcome', 'lose');
      } else {
        display_element.querySelector('#screenR').innerHTML = trial.feedback_zero;
        display_element.querySelector('#screenR').setAttribute('outcome', 'zero');
        display_element.querySelector('#runeR').setAttribute('outcome', 'zero');
        display_element.querySelector('#eyeRL').setAttribute('outcome', 'zero');
        display_element.querySelector('#eyeRR').setAttribute('outcome', 'zero');
      }
    }

    if (response_history.length < 4 || (response_history[0]+response_history[1]) < 2 ) {
      this.jsPsych.pluginAPI.setTimeout(function() {
        reset_trial();
      }, trial.feedback_duration);
    } else {
      this.jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.feedback_duration);
    }

  };

  var reset_trial = () => {

    // Reset left side HTML.
    display_element.querySelector('#screenL').innerHTML = '';
    display_element.querySelector('#screenL').setAttribute('outcome', '');
    display_element.querySelector('#runeL').setAttribute('outcome', '');
    display_element.querySelector('#eyeLL').setAttribute('outcome', '');
    display_element.querySelector('#eyeLR').setAttribute('outcome', '');
    display_element.querySelector('#ringL').setAttribute('status', '');
    display_element.querySelector('#visorL').setAttribute('status', '');

    // Reset right side HTML.
    display_element.querySelector('#screenR').innerHTML = '';
    display_element.querySelector('#screenR').setAttribute('outcome', '');
    display_element.querySelector('#runeR').setAttribute('outcome', '');
    display_element.querySelector('#eyeRL').setAttribute('outcome', '');
    display_element.querySelector('#eyeRR').setAttribute('outcome', '');
    display_element.querySelector('#ringR').setAttribute('status', '');
    display_element.querySelector('#visorR').setAttribute('status', '');

    // Randomize robot sides.
    if (trial.randomize && this.jsPsych.randomization.repeat([0,1],1)[0] == 1 ) {

      // Hacky single line swap
      trial.symbol_L = [trial.symbol_R, trial.symbol_R = trial.symbol_L][0];
      trial.outcome_L = [trial.outcome_R, trial.outcome_R = trial.outcome_L][0];

      // Update correct key.
      if (trial.choices.indexOf(trial.correct) == 0) {
        trial.correct = trial.choices[1];
      } else {
        trial.correct = trial.choices[0];
      }

      // Update runes.
      display_element.querySelector('#runeL').innerHTML = trial.symbol_L;
      display_element.querySelector('#runeR').innerHTML = trial.symbol_R;

      const code = eventCodes.display;
      pdSpotEncode(code);
      trial.display_code = code;

    }

    // Reinitialize keyboardListener.
    this.jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: after_response,
      valid_responses: trial.choices,
      rt_method: 'performance',
      persist: false,
      allow_held_key: false
    });

  }

  var end_trial = () => {

    if (typeof trial.stimulus == 'undefined') {
      trial.stimulus='practice';
    }

    // gather the data to store for the trial
    var trial_data = {
      "rt": response.rt,
      "response_code":response.code,
      "display_code":trial.display_code,
      "feedback_code":trial.feedback_code,
      "stimulus": trial.stimulus,
      "key_press": response.key
      
    };


    // clear the display
    display_element.innerHTML = '';

    // move on to the next trial
    this.jsPsych.finishTrial(trial_data);

  };

  // start the response listener
  var keyboardListener = this.jsPsych.pluginAPI.getKeyboardResponse({
    callback_function: after_response,
    valid_responses: trial.choices,
    rt_method: 'performance',
    persist: false,
    allow_held_key: false
  });
}
}

PracticePlugin.info = info;

export default PracticePlugin;
