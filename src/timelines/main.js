import jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import jsPsychImageKeyboardResponse from '@jspsych/plugin-image-keyboard-response';
import 'jspsych/css/jspsych.css';
import { images } from '../lib/utils';


// Add your jsPsych options here.
// Honeycomb will combine these custom options with other options needed by Honyecomb.
const jsPsychOptions = {
  on_trial_finish: function (data) {
    console.log(data)
  }
};



// Add your jsPsych timeline here.
// Honeycomb will call this function for us after the subject logs in, and run the resulting timeline.
// The instance of jsPsych passed in will include jsPsychOptions above, plus other options needed by Honeycomb.
function buildTimeline(jsPsych) {
  console.log(jsPsych.version()); // no unused vars
  var timeline = [];
  var instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
      <p>Blue and Orange!</>
      <div style='width: 700px;'>
        <div style='float: left;'><img src='${images['blue.png']}' /></div>
        <div style='float: right;'><img src='${images['orange.png']}' /></div>
      </div>`
    };
  timeline.push(instructions);

  var blue_trial = {
    type: jsPsychImageKeyboardResponse,
    stimulus: images['blue.png'],
  };
  timeline.push(blue_trial);

  return timeline;
}

// Honeycomb, please include these options, and please get the timeline from this function.
export { jsPsychOptions, buildTimeline };
