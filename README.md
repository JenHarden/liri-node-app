# Liri-node-app
### Overview:
```
LIRI is a Language Interpretation and Recognition Interface application.  LIRI is a command line node app 
that takes in parameters and gives you data back.
```
### Technologies Used:
```
    * node.js
    * node package manager (NPM)
        * FS
        * Axios
        * Inquirer
        * Node-spotify-api
        * Moment
        * DotEnv
    * API calls
        * Bands in Town
        * OMDB
```
### Expected Workflow
```
1. You will use your terminal, such as Bash, to run this app.
2. Navagate to folder that contains the "liri.js" file, within your terminal.
3. Run the "NPM install" command to get the necessary node packages.
4. Enter "node liri.js" onto the command line.
5. The LIRI app was designed to work with user prompts.  You will be promted to interact in three different ways:
    1. You will need to chose an option from a list:
        * Find a concert - this option will use the Bands in Town API to search for concerts.
        * Find a song - this option will use the Spotify API to search for songs.
        * Find a movie - this option will use the omdb API to search for movies.
        * Do what it says - this option pulls information from the local random.txt file.
    2. What input you enter to search for:
        * If you chose "Find a concert", enter the name of the artist you would want concert information on.
        * If you chose "Find a song", enter the name of the song you want to find.
        * If you chose "Find a movie", enter the name of the movie you would like to find information on.
        * If you chose "Do what it says", then you will get the results of the information on the local random.txt file.
    3. Confirm if you wish to proceed:
        * If you confirm that you wish to continue, then you will see your results from your input above.
        * If you decide not to proceed, then you will get a message to come back later and the app will take you back to
            the user prompts again.

Each of the options chosen will produce different search results:
    * Find a concert:
        * Name of venue
        * Venue location
        * Date and time of the concert formated using moment
    * Find a song:
        * Song name
        * Song's Spotify preview URL
        * Album
        * Artist(s)
    * Find a movie:
        * Movie title
        * Year the movie was released
        * IMDB rating on movie
        * Rotten Tomatoes rating
        * Country where movie was produced
        * Language of the movie
        * Movie plot
        * Top billing actors
    * Do what it says:
        * Gives the results of the information on the local random.txt file

These results will be viewable within the command line, but also stored locally within the log.txt file.

***If you do not enter an input value for "Find the song", "Find the movie" and "Do what it says", you will see the default values for each.***
```
### Considerations
```
The Spotify API requires the developer to sign up and generate a client ID and client secret (unique to the developer).
As a safety precaution, the client ID and client secret are stored on a local .env file and then added to the local .gitignore file
to protect the information.

***If anyone wishes to clone this app from my github, to run it themselves, you will need to supply your own ".env" file for it to work.***
```
### Screenshots
```
This is a screenshot of the user prompts you will see and you will use your arrow keys to navigate to which command you would like to do:
![image](https://github.com/JenHarden/liri-node-app/blob/master/images/2019-04-28%20user%20prompts.png)

This is an example of "Find a concert".  I used the arrow keys to navigate to correct command, typed in the artist, and then confirmed the choice.
![image](https://github.com/JenHarden/liri-node-app/blob/master/images/2019-04-28%20Find%20a%20concert.png)
```