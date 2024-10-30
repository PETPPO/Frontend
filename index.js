// import { AppRegistry } from 'react-native';
// import App from './App'; // App.js 파일을 가져옵니다.
// import { name as appName } from './app.json'; // app.json의 name을 가져옵니다.

// AppRegistry.registerComponent(appName, () => App); // 앱을 등록합니다.

import { AppRegistry } from 'react-native';
import App from './App'; // App.js 파일을 가져옵니다.
import { name as appName } from './app.json'; // app.json의 name을 가져옵니다.

AppRegistry.registerComponent(appName, () => App); // 앱을 등록합니다.

