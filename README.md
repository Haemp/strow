![image](https://user-images.githubusercontent.com/956386/62692066-dda94800-b9c7-11e9-9867-5e2bc2c7d449.png)
Experimental Habit Tracking, now with more physics! Is available at https://strow.web.app

# Techy bits
Strow is an experiment in using the native web platform and not relying on any build tools for compilation. 

## Compilation
There is none! All the files in this project 


# Difficulties
- Not having a build system means decoupling the imported dependencies with the deployed dependencies. 
  this kind of forces you to setup your own mini script to only include the needed files to the deploy

- This is a total bitch since firebase won't let me only deploy certain folders for hosting. 
