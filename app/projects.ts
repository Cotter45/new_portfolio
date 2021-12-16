
export const full_stack_projects = [
    {
        id: 1,
        name: 'WorkDay',
        description: "WorkDay is a modern day solution to those Craiglist ads we all came to know and love. Here, you can talk with your community and share jobs you've found or need help with. If you need a website built or someone to mow your lawn, it's super easy to connect with your community and find the right person for the job. Utilizing lightning-fast modern frameworks to create a new job hunting app and social media platform. Check back regularly for updates!",
        image: '/images/fulls/workday.png',
        tech: [
            '/images/thumbs/react.png',
            './images/thumbs/redux.png',
            './images/thumbs/express.png',
            './images/thumbs/node.png',
            './images/thumbs/postgres.png',
            './images/thumbs/sequelize.png',
            './images/thumbs/css.png',
            './images/thumbs/git.png'
        ],
        github: "https://github.com/Cotter45/WorkDay-",
        live: "https://workday-app.herokuapp.com/",
        learned: [
            "Set up AWS S3 for photos in Node environment",
            "React Drag-n-Drop",
            "Custom React Hooks for window sizing, loading bar and auto scroll on route change",
        ],
        takeaways: [
            "I really learned how to set a pace during this project. There weren't many days I didn't finish a full crud operation from back to front. Of course the rest of the day was spent hunting new bugs... However I really managed to find my groove implementing features.",
            "I'm a person with great ambitions! I've always known this, however it can really interfere at times when I take on way too much. There are hundreds of lines of commented out code in this project for things I just didn't have the time to polish. I can't wait to slowly implement these as time goes on!",
            "During this project week I found a few people coming to me to ask questions, this was a first! I wasn't always able to help, but I found that taking the time away from my project and helping others for a few minutes with theirs was a major boost to my productivity as well as theirs. WIN WIN. It was a lot of fun to be working solo yet staying in touch with the whole team and working together to debug.",
            "The biggest thing I had learned while working on this project is to start with the basics. Everyone wants a flashy app that does a bunch of cool things, but without a proper backbone - it's useless."
        ],
        images: [
            '/images/fulls/workday.png',
            '/images/workday/feed.png',
            '/images/workday/jobs.png',
            '/images/workday/task_manager.gif',
            '/images/workday/workday-schema.png'
        ],
        video: [
            '/images/workday/video.mov'
        ]
    },
    {
        id: 2,
        name: 'Anarchy',
        description: "As a team of three, Walker Williams, Gerryl Esparacion and I created a Discord clone, complete with multiple full CRUD features, web sockets for live chat and updates as well as direct video chat with friends. This project uses React / Redux and vanilla CSS on the front end, and Python / Flask with SQLAlchemy / PostgreSQL on the back end.",
        image: '/images/fulls/anarchy.png',
        tech: [
            '/images/thumbs/react.png',
            './images/thumbs/redux.png',
            './images/thumbs/python.png',
            './images/thumbs/flask.png',
            './images/thumbs/postgres.png',
            './images/thumbs/sqlalchemy.png',
            './images/thumbs/css.png',
            './images/thumbs/docker.png',
            './images/thumbs/git.png'
        ],
        github: "https://github.com/Cotter45/Anarchy",
        live: "https://anarchy-app.herokuapp.com/about",
        learned: [
            "Web Sockets",
            "WebRTC",
            "AWS S3 for photos in python environment",
            "Docker containers and Heroku deployment",
            "React protected routes",
        ],
        takeaways: [
            "This project took a lot of research, and research takes a lot of time. I definitely learned how to manage my time well and work efficiently in a group.",
            "Flask is a great environment, very easy to set up and use almost right out of the box. I'm glad we used it for this project, however the biggest issue that we had was getting Flask-SocketIO to work in production. There are not a lot of resources online on how to do this, but after a ton of research and experimentation, we figured it out. It's a great way to manage the backend of a project.",
            "This is a true one page application. Everything we thought we were going to be able to do going in, very quickly changed. Almost everything is a modal or a conditional render based on a user action controlled by state variables. This was an excellent usecase for Redux, we sure learned a lot throughout this project.",
        ],
        images: [
            '/images/fulls/anarchy.png',
            '/images/anarchy/Database.png',
            '/images/anarchy/intro.png',
            '/images/anarchy/settings.png'
        ],
        video: [
            '/images/anarchy/chat.mov'
        ]
    },
    {
        id: 3,
        name: 'Vicariously',
        description: "This was a 1 week solo project for App Academy utilizing core technologies React, Redux, Express and PostGres. In this sprint I managed to complete 4 full CRUD features and implement every bonus feature listed as an option. It was a ton of fun to add in new features I had never worked with before like google maps and react-calendar. The app is designed off of the AirBnB team's beautiful CSS skills. What makes it stand out is that there is no cost and absolutely unlimited possibilities for what a user can share with their community!",
        image: '/images/fulls/vicariously.png',
        tech: [
            '/images/thumbs/react.png',
            './images/thumbs/redux.png',
            './images/thumbs/express.png',
            './images/thumbs/node.png',
            './images/thumbs/postgres.png',
            './images/thumbs/sequelize.png',
            './images/thumbs/css.png',
            './images/thumbs/git.png'
        ],
        github: "https://github.com/Cotter45/Vicariously",
        live: "https://vicariously.herokuapp.com/",
        learned: [
            "React / Redux combination",
            "How to use a Google Maps API",
            "How to use a React Calendar",
            "How to not overload a server with a search bar",
        ],
        takeaways: [
            "This was the first project I had used React / Redux for. I learned a lot about the state management of this project and how to use it effectively.",
            "I learned how to use the Google Maps API to create a map with markers and a modal to display the information of the marker. I also learned how to use the Google Calendar API to create a calendar with events and a modal to display the information of the event.",
            "I learned a lot about layout, using flexbox and modals to create a clean and intuitive user experience.",
        ],
        images: [
            '/images/fulls/vicariously.png',
            '/images/vicariously/Database.png',
            '/images/vicariously/ExplorePage.png',
            '/images/vicariously/PostPage.png',
            '/images/vicariously/ProfilePage.png',
            '/images/vicariously/ModalExample.png'
        ]
    },
    {
        id: 4,
        name: 'Pot Overflow',
        description: "This project was a major challenge of communication, git workflow and a clash of newly learned technologies! In one week of work we managed to put together a significant project, collaborate flawlessly and walk away with something we were proud to call our first team project! This app allows users to ask / answer questions about cooking and cooking related topics. As well as search for similar questions and  vote on answers to increase the popularity of the thread.",
        image: '/images/fulls/pot-overflow.gif',
        tech: [
            '/images/thumbs/pug.png',
            './images/thumbs/js.png',
            './images/thumbs/express.png',
            './images/thumbs/node.png',
            './images/thumbs/postgres.png',
            './images/thumbs/sequelize.png',
            './images/thumbs/css.png',
            './images/thumbs/git.png'
        ],
        github: "https://github.com/Cotter45/Pot-Overflow",
        live: "https://aa-pot-overflow.herokuapp.com/",
        learned: [
            "PugJS for HTML templating",
            "Server Side Rendering",
            "How much of a drawn out process Vanilla JS is",
        ],
        takeaways: [
            "This project presented it's fair share of challenges!",
            "The major highlights would be: implimenting our first search bar, adding answers to our page with DOM manipulation, authentication including a demo user, dynamic voting on both questions and answers",
            "We were very fortunate to have an excellent team to tackle this project! Communication was always first priority and allowed us to be very efficient. We had completed, except for a few bugs, our entire feature list in less than 24 hours. Any member of this team is worth their weight in GOLD, I can't wait to see what we can accomplish in the future.",
        ],
        images: [
            '/images/fulls/pot-overflow.gif',
            '/images/pot-overflow/database.png',
            '/images/pot-overflow/questions.png',
            '/images/pot-overflow/question.png',
            '/images/pot-overflow/login.jpeg',
            '/images/pot-overflow/register.jpeg',
            '/images/pot-overflow/code.png',
            '/images/pot-overflow/search.png',
        ]
    },
]

export const frontend_projects = [
    {
        id: 1,
        name: "Black Stag",
        description: "This was a project I had done for a friend of mine. He is going to be starting a general contracting business and this will be the template for his website. I built it over the course of a few days and took advantage of the time to learn react-spring for light animations and transitions. I will be returning to it to optimize it as much as possible. I will probably convert it to a Remix.run / server side rendered project in the future.",
        image: "/images/black_stag/stag.gif",
        tech: [
            './images/thumbs/js.png',
            './images/thumbs/react.png',
            './images/thumbs/css.png',
            './images/thumbs/git.png'
        ],
        github: "https://github.com/Cotter45/Black_Stag",
        live: "https://laughing-yalow-d8f449.netlify.app/",
        learned: [
            "React Spring for animations",
            "How to build to someone elses design",
            "How to build a contact form in React",
        ],
        takeaways: [
            "This project has a lot of images... Images from iPhones... The file sizes are MASSIVE. They take a long time to load. I've learned how to use the <picture> element and webP format to speed it up a little bit. I still have a ways to go with learning optimizations.",
            "I learned to work with someone else who had no idea what they wanted and how to build off of that.",
        ],
        images: [
            '/images/black_stag/animated.gif',
            '/images/black_stag/stag.gif',
            '/images/black_stag/services.png',
            '/images/black_stag/contact.png',
            '/images/black_stag/footer.png',
        ],
        video: [
            '/images/black_stag/stag.mov'
        ]
    },
    {
        id: 2,
        frame: true,
        name: "Tic Tac Toe",
        description: "This was the first project I had deployed. It's a simple tic-tac-toe game that has a 'computer' player. It was built in regular HTML, CSS and JavaScript. The game itself is an example of OOP (object oriented programming) using classes for the gaame logic. While there are certainly improvements that can be made, I kinda like it just the way it is.",
        image: "",
        tech: [
            './images/thumbs/js.png',
            './images/thumbs/css.png',
            './images/thumbs/html.png',
            './images/thumbs/git.png'
        ],
        github: "https://github.com/Cotter45/DOM-Tic-Tac-Toe",
        live: "https://tic-tac-toe-for-1.netlify.app/",
        learned: [
            "How to use OOP in JavaScript",
            "How to use classes in JavaScript",
            "Dom manipulation",
            "Hosting a website",
        ],
        takeaways: [
            "OOP can definitely be something that's difficult to wrap your head around. The first time I encountered a program built this way it spun my head round quite a few times. However after a few tries, it really comes together so cleanly. I'm glad I did this project because I learned a lot about OOP and how to use it in JavaScript.",
            "Trying to write a computer player with a bunch of if / else statements can really make code hard to read and follow."
        ],
        images: [],
    },
    {
        id: 3,
        name: "Eulerity Pets",
        description: "This project was a hackathon challenge for a company called Eulerity. Based out of New York they are a digital marketing company powered by AI to deliver automated marketing and strategies to their customers. I was given 48 hours to complete a mini website. The requirements were - Create React App / Redux, Fetch some data from their API, Search by name or description, Utilize Styled Components, Utilize React Router and allow users to download the images.",
        image: "/images/eulerity/DragDrop.png",
        tech: [
            './images/thumbs/react.png',
            './images/thumbs/redux.png',
            './images/thumbs/styled_components.png',
            './images/thumbs/js.png',
            './images/thumbs/git.png'
        ],
        github: "https://github.com/Cotter45/Eulerity_Pets",
        learned: [
            'React Drag and Drop',
            'Syled Components',
            'Downloading images',
        ],
        takeaways: [
            "This project was a great learning experience. I learned how to use React Drag and Drop and Styled Components to create a drag and drop interface. I also learned how to download images on the click of a button.",
            "I like to take any opportunity I can to learn new things and improve my skills, this was a great learning experience."
        ],
        images: [
            '/images/eulerity/DragDrop.png',
            '/images/eulerity/Fireworks.png',
        ],
    },
]