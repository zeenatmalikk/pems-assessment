# Welcome to your Expo app 👋
## PEMS Digital Frontend Dev Hiring Assignment
This is a React Native mobile app built using Expo for the PEMS Digital Frontend Developer hiring assignment. The app fetches and displays users and their corresponding posts using the JSONPlaceholder API.

## Features
Home Screen: Displays a list of users fetched from the API, showing 5 users initially and loading more on scroll.
User Posts Screen: Displays posts for the selected user, with infinite scroll (5 posts at a time).
Error Handling: Graceful handling of API errors, including a message for server errors (e.g., 500 errors).
Loading States: Displays loading indicators while data is being fetched from the API.
Navigation: Click on any user to navigate to the user’s posts screen, where you can see the selected user's information and their posts.

## Technologies Used
React Native: For building the mobile app.
Expo: To simplify development, testing, and deployment.
Axios/Fetch API: For fetching data from the JSONPlaceholder API.
Hooks: Utilized useState and useEffect for managing state and handling side effects.
Infinite Scroll: Implemented infinite scrolling using a flat list for smooth data loading.

## Installation & Running the App
Follow these steps to set up and run the app locally:

1. Clone the Repository: https://github.com/zeenatmalikk/pems-assessment
2. cd pems-assignment
3. Install Dependencies: 
Ensure that you have npm installed on your machine. Then run: npm install
4. Run the App
Once dependencies are installed, start the Expo development server: npm start
You’ll then see options to open the app on an Android emulator, iOS simulator, or a physical device using the Expo Go app.

5. Testing on an Android Device
If you're testing on an Android device, you can download the APK file and install it manually:
https://drive.google.com/drive/folders/1GIP_ugrQRhI5w9Gf3tw19nNRCDiBtbMp?usp=sharing

## API Endpoints
Users List: https://jsonplaceholder.typicode.com/users
Posts by User: https://jsonplaceholder.typicode.com/posts?userId={userId}






This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
