## SNOBZ 2
With a better understanding of JavaScript Snobz 2 is updated with webpack and leafletjs brought in with npm, additionally loadoutput was replaced by a site I found online. 

### - visit [Snobz2](snobz2.vercel.app)

Vercel now reads from dist folder , the src folder should be about the same as version 1 whole folder:
  * Index.html = template
  * Index.js = setting up the map
  * List.js = list icon clicks
  * About.js = about section
  * FeedBack.js = send feedback tab

Why is version 2 better than 1?
  * Webpack should create quicker loading times
  * Directions are now available
  * Feedback modal is quicker
  
Things I learned creating version 2:
  * How to use differnt webpack configurations from compression to adding babel-polyfill
  * How to use vercel better enabling enviormental variables and creating site from sidt folder
  * Having a password out on the web can get abuse , how to use use .env files
  * How to use nodes dotenv  / dotenv-webpack   
