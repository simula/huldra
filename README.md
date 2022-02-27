# Huldra: A Framework for Collecting Crowdsourced Feedback on Multimedia Assets

Collecting crowdsourced feedback to evaluate, rank, or score multimedia content can be cumbersome and time consuming. Most of the existing survey tools are complicated, hard to customize, or tailored for a specific asset type. In this repository, we present an open source framework called Huldra, designed explicitly to address the challenges associated with user studies involving crowdsourced feedback collection. The web-based framework is built in a modular and configurable fashion to allow for the easy adjustment of the user interface (UI) and the multimedia content, while providing integrations with reliable and stable backend solutions to facilitate the collection and analysis of responses. 
Our proposed framework can be used as an online survey tool by researchers working on different topics such as Machine Learning (ML), audio, image, and video quality assessment, Quality of Experience (QoE), and require user studies for the benchmarking of various types of multimedia content. 

Example use-cases of Huldra include [HOST-XAI](https://host-xai.herokuapp.com), a survey for the collection of feedback from medical experts about how they perceive different eXplainable Artificial Intelligence (XAI) methods demonstrated on images from the gastrointestinal (GI) tract, and [HOST-ATS](https://host-ats.herokuapp.com), a survey for the collection of feedback from the general public about how they perceive alternative thumbnails for a given soccer video clip, both of which use customized versions of Huldra. 

## 1. Assets

Set up the folder structure in your Firebase storage bucket, prepare and upload the multimedia assets corresponding to your desired cases. Please prefix all your cases with their correspnding types (`audio-lorem`, `video-ipsum`, `hybrid-amet`, `image-sit`). The assets to be used have to adhere to the following naming convention:
- Main asset: `caseLabel`.*
- Option A: `caseLabel-a`.*
- Option B: `caseLabel-b`.*

## 1a. Directories Tree

```
gallery 
└───cases
│   └───audio-lorem
|       └───audio-lorem-a.mp3   
|       └───audio-lorem-b.mp3  
│   └───video-ipsum
|       └───video-ipsum-a.mp4
|       └───video-ipsum-b.mp4
│   └───hybrid-amet
|       └───hybrid-amet.mp4   
|       └───hybrid-amet-a.jpeg
|       └───hybrid-amet-b.jpeg 
│   └───image-sit
|       └───image-sit.jpeg  
|       └───image-sit-a.jpeg
|       └───image-sit-b.jpeg 
```
## 1b. Supported File Extensions

| Audio Format | Support |
| ------------- | ------------- |
| `AAC`  | ✅   |
| `AIFF`  | ❌  |
| `FLAC`  | ✅   |
| `MP3`  | ✅   |
| `OGG`  | ✅   |
| `WAW`  | ✅   |
| `WMA`  | ❌  |

| Video Format | Support |
| ------------- | ------------- |
| `MP4`  | ✅   |


| Image Format | Support |
| ------------- | ------------- |
| `JPEG`  | ✅   |
| `PNG`  | ✅  |




## 2. Codebase

Clone this repository:

`git clone https://github.com/simula/huldra`

## 3. Configuration

Update configuration parameters in the `src/config.json` file as needed, to customize your instance. 
Note that you can also specify configuration parameters through the Heroku interface (e.g., if you do not want to make any code changes). 

For security reasons, Firebase connection parameters should not go into configuration files, but rather be passed as environment variables: 

````
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_APP_ID=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_ROOT_DIRECTORY=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
````

## 4a. Deployment (Heroku)

Enter the Firebase connection parameters in the Heroku interface as config vars for your app (from the project page: `Settings` -> `Config Vars`). 
Deploy the relevant branch of your repository on Heroku (see https://devcenter.heroku.com/articles/github-integration for help). 
The survey will be accessible at `https://<application-name>.herokuapp.com` by default. 

## 4b. Deployment (Local)

Enter the Firebase connection parameters in a file called `.env` in the project directory. 
Run `npm install` and then `npm start` to start your local server. This runs the app in the development mode. 
Open [http://localhost:3000](http://localhost:3000) to view the survey in the browser. 
The page will reload if you make edits. 

## 5. Outputs

You can retrieve participant response files from your S3 bucket (`<root directory>` -> `responses`) at your convenience.
