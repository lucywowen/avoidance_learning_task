# Avoidance learning Task

<p style="float: left">
  <img src="msit.svg" width="200" alt="MSIT Icon"/>
</p>

[![Actions Status](https://github.com/brown-ccv/task-msit/workflows/Test%2C%20Build%2C%20and%20Package/badge.svg)](https://github.com/brown-ccv/task-msit/actions)
[![Actions Status](https://github.com/brown-ccv/task-msit/workflows/Build%20at%20home%20version%20%28Windows%29/badge.svg)](https://github.com/brown-ccv/task-msit/actions)

This repo contains the avoidance learning task. It is a [jspsych7](https://www.jspsych.org/) task built with React and Electron. This
task uses [Honeycomb](https://brown-ccv.github.io/honeycomb-docs/) (also known as Neuro Task Starter).

## Getting Started

1. Clone this repo onto your computer

```
git clone https://github.com/lucywowen/avoidance_learning_task.git
```

2. Change directory into the new folder

```
cd avoidance_learning_task
```

3. Set the remote url to your tasks' repo (create a github repo if not yet created)

```
git remote set-url origin <PATH_TO_YOUR_REPO>
```

4. Install the dependencies (the -D flag installs the dev dependencies as well as the production ones)

```
npm install -D
```

5. Run the task in dev mode - this should launch an electron window with the task with the inspector open to the console
   and will hot-reload when changes are made to the app

```
npm run dev
```

6. Check out the data - the data is saved throughout the task to the users's app directory. This is logged at the
   beginning of the task wherever you ran `npm run dev`



## To run EEG participants:


1. Change directory into the new folder

```
cd avoidance_learning_task
```

2. Pull any changes to the task, just in case

```
git pull
```

3. Install the dependencies (the -D flag installs the dev dependencies as well as the production ones)

```
npm install -D
```

4. Run the task 

```
npm run dev:clinic
```

5. Use whatever participant name you want, but try to use the same study ID across subjects. For example, use 'TEST' for study ID if you're just debugging and use 'STUDY'.  

6. If you need to change anything, please use a different branch!!

```
git checkout -b <new branch name>
```

7. Push any changes on the different branch

```
git push
```

8. Hope for no merge issues :) 