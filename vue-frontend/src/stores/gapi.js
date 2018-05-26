export default {
  apiConfig: {
    clientId: '612906472953-gc2me54kfu55d4mslu6rmfj9hgv22ja8.apps.googleusercontent.com',
    // clientId: '60973883963-b9ofcjs3n6s8qf22d52fd7k67ecc0bap.apps.googleusercontent.com',
    apiKey: 'AIzaSyAL1WPa-CEmEKxuYNR9s5wfx7dc6ImYGG0',
    // apiKey: 'AIzaSyDgioruz6XDJqJUbMklLCYiO5Ox1mxyDfg',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest'],
    scope: 'https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/drive.metadata',
    appId: '612906472953',
  },
  shareModes: [
    {
      enum: 'VIEW',
      name: 'Eleverna kan visa filen',
    },
    {
      enum: 'EDIT',
      name: 'Eleverna kan redigera filen',
    },
    {
      enum: 'STUDENT_COPY',
      name: 'Gör en kopia för varje elev',
    },
  ],
}
