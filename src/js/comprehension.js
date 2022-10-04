
import { ParameterType } from "jspsych";

const info = {
  name: 'comprehension',
  parameters: {
    button_label: {
      type: ParameterType.STRING,
      pretty_name: 'Button label',
      default:  'Continue',
      description: 'Label of the button.'
    }
  }
}

/**
 * **PLUGIN-NAME**
 *
 * SHORT PLUGIN DESCRIPTION
 *
 * @author YOUR NAME
 * @see {@link https://DOCUMENTATION_URL DOCUMENTATION LINK TEXT}
 */
class ComprehensionPlugin {
  constructor(jsPsych) {
    this.jsPsych = jsPsych;
  }
  trial(display_element, trial) {

    // Plug-in setup
    var plugin_id_name = "jspsych-survey-multi-choice";
    var _join = (/*args*/) =>  {
      var arr = Array.prototype.slice.call(arguments, _join.length);
      return arr.join("-");
    }

    // ---------------------------------- /f/
    // Section 1: Define Prompts          //
    // ---------------------------------- //

    // Define comprehension check questions.
    var prompts = [
      "To select a knight for testing, which keys do you use?",
      "During testing, you will earn points based on which knight(s)?",
      "<i>True</i> or <i>False</i>: some knights will give you points more often than others.",
      "Will the number of points I earn affect my performance bonus?"
    ];

    // Define response options.
    var options = [
      ["<i>a/d</i> keys", "<i>1/0</i> keys", "left/right</i> arrow keys"],
      ["the knight I choose", "the knight I did not choose", "both knights"],
      ["True", "False"],
      ["Yes" ,"No"]
    ];

    // Define correct answers.
    var correct = [
      "left/right</i> arrow keys",
      "the knight I choose",
      "True",
      "Yes"
    ]

    // ---------------------------------- //
    // Section 2: Define HTML             //
    // ---------------------------------- //

    // Initialize HTML
    var html = "";

    // inject CSS for trial
    html += `<style>
    body {
      height: 100vh;
      max-height: 100vh;
      overflow: hidden;
      position: fixed;
      background: linear-gradient(0deg, rgba(210,210,210,1) 50%, rgba(230,230,230,1) 100%);
    }
    .jspsych-content-wrapper {
      overflow: hidden;
    }
    </style>`;

    // Add background.
    html += '<div class="wrap">';
    html += '<div class="floor"></div>'
    html += '</div>';

    // form element
    var trial_form_id = _join(plugin_id_name, "form");
    display_element.innerHTML += '<form id="'+trial_form_id+'"></form>';

    // Show preamble text
    html += '<div class="comprehension-box">'
    html += '<div class="jspsych-survey-multi-choice-preamble"><h4>Please answer the questions below:</h4></div>';

    // Initialize form element
    html += '<form id="jspsych-survey-multi-choice-form">';

    var i = 0;
    // Iteratively add comprehension questions.
    for (i = 0; i < prompts.length; i++) {

      // Initialize item
      html += `<div id="jspsych-survey-multi-choice-${i}" class="jspsych-survey-multi-choice-question jspsych-survey-multi-choice-horizontal" data-name="Q${i}">`;

      // Add question text
      html += `<p class="jspsych-survey-multi-choice-text survey-multi-choice">${prompts[i]}</p>`;

      var j = 0;
      // Iteratively add options.
      for (j = 0; j < options[i].length; j++) {

        // Option 1: True
        html += `<div id="jspsych-survey-multi-choice-option-${i}-${j}" class="jspsych-survey-multi-choice-option">`;
        html += `<input type="radio" name="jspsych-survey-multi-choice-response-${i}" id="jspsych-survey-multi-choice-response-${i}-${j}" value="${options[i][j]}" required>`;
        html += `<label class="jspsych-survey-multi-choice-text" for="jspsych-survey-multi-choice-response-${i}-${j}">${options[i][j]}</label>`;
        html += '</div>';

      }

      // Close item
      html += '<br></div>';
      
    }

    // add submit button
    html += '<input type="submit" id="'+plugin_id_name+'-next" class="'+plugin_id_name+' jspsych-btn"' + (trial.button_label ? ' value="'+trial.button_label + '"': '') + '"></input>';

    // End HTML
    html += '</form>';
    html += '</div></div>';

    // Display HTML
    display_element.innerHTML = html;

    // ---------------------------------- //
    // Section 2: jsPsych Functions       //
    // ---------------------------------- //

    // Detect submit button press
    document.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();

      // Measure response time
      var endTime = performance.now();
      var response_time = endTime - startTime;

      // Gather responses
      var responses = [];
      var num_errors = 0;
      for (var i=0; i<prompts.length; i++) {

        // Find matching question.
        var match = display_element.querySelector('#jspsych-survey-multi-choice-'+i);
        var val = match.querySelector("input[type=radio]:checked").value;

        // Store response
        responses.push(val)

        // Check accuracy
        if ( correct[i] != val ) {
          num_errors++;
        }

      }

      // store data
      var trial_data = {
        "responses": responses,
        "num_errors": num_errors,
        "rt": response_time
      };

      // clear html
      display_element.innerHTML += '';

      // next trial
      this.jsPsych.finishTrial(trial_data);

    });

    var startTime = performance.now();
  }
}
ComprehensionPlugin.info = info;

export default ComprehensionPlugin;