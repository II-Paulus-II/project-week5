# Workflow Notes

## Client side

Need level counter on client side - Global let levelCounter = { level: 1 } starts at 1
Need to send the level in both requests [Upgrade perhaps with usernames can save progress so no need for that later - unless player wants to repeat a level maybe]
Check server side code to see it. 

Changed src line for app.js to be type = module so i could use npm run dev instead of live server SEE LINE 7 in html

Will add some scripts to automate use of images and then creating src info in database. 

### Job 1 -- Images 

Find images to be used - can find any number of these as long as whoever finds them uses the following format.

Save in images/NAME.fileextension 

NAME must be one word that we will use to fill the database with the item name. 

For example:

Images of a cow - call it cow.jpg or cow.png
Image of a car - call it car.jpg

TODO: Paul - write script to automate image size optimization and convert to webp and then save them in a particular place. [wont take long]

## Server side
