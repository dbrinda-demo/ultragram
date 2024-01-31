How to build and run:

1. You must generate an api key for the instagram graph API. this can be done here https://developers.facebook.com/tools/explorer
   - This requires you to have set up a
     - facebook business account
     - instagram business account
     - facebook business page
     - link your ig account to the fb page
     - create an developer app with access to the instagram graph API
   - instructions can be found here
     - https://superface.ai/blog/instagram-setup
     - https://superface.ai/blog/instagram-account-id
2. Add your api key to config/config.js
3. You must have docker and docker compose installed and configured correctly.
4. cd build && docker compose up
5. If all goes well it should have built, the ui can take several seconds to download all packages.
6. cd ../run && docker compose up
7. go to http://localhost:8080
8. hopefully it works

Quick install instructions and demo:
https://www.youtube.com/watch?v=P79yWC-WK18

Instagram API usage:

GET /me/accounts
  - required to get pages for the facebook account api key

GET /:pageId?fields=instagram_business_account
  - required to get instagram account id associated to the page

GET /:instagramUserId/media?fields=id,caption,like_count,media_type,media_url,timestamp&limit=5&cursor=abc123
  - pull limit amount of posts with the fields I needed to display in the UI starting after cursor

GET /:albumId/children?fields=id,media_url
  - fetch all images for an album post (some posts can have multiple images)
  - I did not batch requests to save time. This would have been worth investigating in a real system.

Design Choices

In general my goal was to build something similar to how you might build a real production system.
The scope was larger than anything you could accomplish in a few days if your goal was a 100% production system. 
I could have done more, but honestly felt I had done enough to prove I can work on and design a complex system. 
I'd rather do a good job on fewer things than rush to get everything done half baked. 

Planning phase

I planned out a directory structure and went back and forth on some design decisions. I brought some ideas here from previous experience.
I decided not to use TypeScript because it would increase the time spent on this project without huge benefit (imo). I would have to write a lot more boiler plate.
I chose to have a separate server and UI process, as this modeled the real world more closely. 
I chose to use next/react and express since they are a stack I'm familiar with and suitable for a production system. They also are similar to the nomad stack.

Bootstrap phase

I set up a basic container to run npm build in the top level directories.
I spent a lot of time trying to get an Instagram API key.
I did a lot of googling about webpack. I was more familiar with express set up.
Eventually got to a "hello world" state with a backend and UI running with a directory structure and stubbed out some files.

UI Design

I came up with a basic UI layout that would be easy to scale for both desktop/mobile browsers. I did not do much fancy responsive design tricks.
I tested with the browser tool that simulates different screen sizes and rotation.

Coding phase

I first worked on getting the Instagram API integrated into the backend. I needed to understand how it worked to better understand the constraints of my app.
I then wrote some backend code to convert the instagram api into something easier for the UI to work with. I tested with curl along the way to debug.
I tried to create reasonable logging and error handling, but this is definitely lacking compared to a real system. 
I did not worry about caching since this seemed like more of a nice to have that could add debugging complexity.

I then moved on to the UI. I started by getting a basic layout with some navigation and page structure.
Then I moved on to implementing the post list and integrating with my backend api.
At this point I added some extremely basic caching in my backend because I was worried about getting rate limited (200 req/hr).
I chose to use a infinite scrolling list because this is what every "wall" of posts seems to do. I used an open source component to save time.
I used an open source carousel component for the album media types. It seemed like a very common component and would have a popular/supported package.

I chose to not complete the hashtag requirement. This seemed to be fairly redundant and I felt I could use my time better elsewhere.

Testing

I did not write tests for this to save time. The app has almost no conditional logic beyond input validation. 
The bigger risk was that it may not work when starting from scratch. 
I manually tested the app by creating a new empty VM and following my own instructions to see if my app worked.

Things I could have improved

- Better logging and error handling
- Batch some API request to facebook
- Caching
- i18n support
- better looking UI
- hashtag search feature
- automated tests
- production build/container
- use something like swagger for internal API
- use typescript
- accelerate development using AI tools (I have no experience with these)


Feedback on Project

The scope of this felt very large and the project took me about 20 hours. Some of that was being rusty with react, but the instagram API key was also a big pain point.
My starting point was creating an empty directory and installing docker. It's hard for me to see how this project could be done well and in entirety in under 2 days.

Suggestions:

1. pick either hashtag search or posts feature
2. either eliminate testing requirement or list it as a stretch goal
3. include a link to the instagram graph API docs and possibly some articles about setting up the business account stuff

Even with these suggestions, I feel it is still a very large task that some candidates may pass on completing, especially if they already have a job.
Maybe you guys are ok with that.
