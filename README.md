# json-web-token-Authorization-
Test this app on postman.
procedure is as follows- 1. post to localhost:3000/login with email:sharma@gamil.com, password:1234
                         2. after successfull login user will get long sequence jwt on the screen, copy that and paste it inside with Authorization header.
                         3. after pasting the jwt in header get to localhost:3000/home.
                         4. home page will show up.
                         5. without token user won't be able to access the home page
