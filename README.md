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
