import { ParameterType } from "jspsych";

const info = {
    name: 'probe',
    parameters: {
      symbol_L: {
        type: ParameterType.STRING,
        pretty_name: 'Symbol (left)',
        default: null,
        description: 'Key code of corresponding symbol for left knight'
      },
      symbol_R: {
        type: ParameterType.STRING,
        pretty_name: 'Symbol (right)',
        default: null,
        description: 'Key code of corresponding symbol for right knight'
      },
      outcome_L: {
        type: ParameterType.STRING,
        pretty_name: 'Feedback (left)',
        default: null,
        description: 'Outcome for left knight.'
      },
      outcome_R: {
        type: ParameterType.STRING,
        pretty_name: 'Feedback (right)',
        default: null,
        description: 'Outcome for right knight.'
      },
      choices: {
        type: ParameterType.KEYCODE,
        array: true,
        pretty_name: 'Choices',
        default: ['arrowleft','arrowright'],
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      choice_duration: {
        type: ParameterType.INT,
        pretty_name: 'Trial duration',
        default: 10000,
        description: 'Duration of choice selection phase.'
      },
      robot_duration: {
        type: ParameterType.INT,
        pretty_name: 'Trial duration',
        default: 500,
        description: 'Duration of choice indication phase.'
      }
    }
  }

/**
   * **learning-trials**
   *
   * jsPsych plugin for learning trial
   *
   * @author Lucy Owen
   * @see {}
   */
class ProbePlugin {
  constructor(jsPsych) {
      this.jsPsych = jsPsych;
  }
  trial(display_element, trial) {
    //---------------------------------------//
    // Define HTML.
    //---------------------------------------//

    // Initialize HTML.
    var new_html = `<style>
    body {
      height: 100vh;
      max-height: 100vh;
      overflow: hidden;
      position: fixed;
      background: linear-gradient(0deg, rgba(210,210,210,1) 50%, rgba(230,230,230,1) 100%);
    }

    </style>`;

    // Draw task
    new_html += '<div class="wrap">';
    new_html += '<div class="floor"></div>'

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
    new_html += '<div class="visor"></div>';
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
    new_html += '<div class="visor"></div>';
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

    // draw
    display_element.innerHTML = new_html;

    // store response
    var response = {
      rt: null,
      key: null
    };

    // function to handle responses by the subject
    var after_response = (info) => {

      // Kill any timeout handlers / keyboard listeners
      this.jsPsych.pluginAPI.clearAllTimeouts();
      this.jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);

      // record responses
      response.rt = info.rt;
      response.key = info.key;

      // Visually indicate chosen robot.
      if (response.key == 'arrowleft') {
        display_element.querySelector('#ringL').setAttribute('status', 'chosen');
      } else {
        display_element.querySelector('#ringR').setAttribute('status', 'chosen');
      }

      this.jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.robot_duration);

    };

    // function to handle missed responses
    var missed_response = () => {

      // Kill all setTimeout handlers.
      this.jsPsych.pluginAPI.clearAllTimeouts();
      this.jsPsych.pluginAPI.cancelAllKeyboardResponses();

      // Display warning message.
      const msg = '<p style="font-size: 20px; line-height: 1.5em">You did not respond within the allotted time. Please pay more attention on the next trial.<br><br><b>Warning:</b> If you miss too many trials, we may end the exepriment early and reject your work.';

      display_element.innerHTML = msg;

      this.jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, 5000);

    }

    var end_trial = () => {

      if (typeof trial.stimulus == 'undefined') {
        trial.stimulus='probe';
      }
      // gather the data to store for the trial
      var trial_data = {
        "symbol_L": trial.symbol_L,
        "symbol_R": trial.symbol_R,
        "rt": response.rt,
        "stimulus": trial.stimulus,
        "key_press": response.key
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      this.jsPsych.finishTrial(trial_data);

    };

    // start the response listener
    if (trial.choices != 'NO_KEYS') {
      var keyboardListener = this.jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
    }

    // end trial if choice_duration is set
    if (trial.choice_duration !== null) {
      this.jsPsych.pluginAPI.setTimeout(function() {
        missed_response();
      }, trial.choice_duration);
    }

  }
}
ProbePlugin.info = info;

export default ProbePlugin;
