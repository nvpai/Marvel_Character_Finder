# Marvel_Character_Finder

The Marvel Character Finder is a web application designed for Marvel fans and enthusiasts who want to explore the vast universe of Marvel characters. The app allows users to search for characters by name or keyword and view detailed information about their appearances in comics. It utilizes the Marvel API to fetch accurate and up-to-date data.

Technologies Used
<ul>
<li>HTML: For the structure of the web pages.</li>
<li>CSS: For styling the application.</li>
<li>Handlebars.js: For creating templates and rendering dynamic content.</li>
<li>Node.js: Backend server.</li>
<li>Express.js: To build and manage routes.</li>
<li>Axios: For making HTTP requests to the Marvel API.</li>
<li>Marvel API: To fetch character data and details.</li>
</ul>


The application is deployed using Vercel
Here is the link- https://marvel-character-finder-red.vercel.app/


Steps to run the project manually on local environment
1. Clone the Repository: git clone https://github.com/nvpai/Marvel_Character_Finder.git  
2. Go to https://developer.marvel.com/ and get a private key 
3. Create a .env file to add the private key and save the variable name as below
4. MARVEL_PRIVATE_KEY='Enter_Your_Private_Key_Here'
5. Install Dependencies: npm install 
6. Run: npm start
7. Open the browser and go to: http://localhost:3000 