export default {
  clientId: '60973883963-b9ofcjs3n6s8qf22d52fd7k67ecc0bap.apps.googleusercontent.com',
  apiKey: 'AIzaSyBa1UqnbaH8vmoDEaxprYTt0njc0S2C7aM',
  discoveryDocs: {
    classroom: ['https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest'],
  },
  scope: 'https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/drive.readonly',
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
  services: {
    spread: {
      title: 'Kalkylark',
      icon: 'description',
      color: '',
    },
    doc: {
      title: 'Kalkylark',
      icon: 'description',
      color: '',
    },
  },
}
