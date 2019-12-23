export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: '#{OMNIFLIX_FIREBASE_APIKEY}#',
    authDomain: '#{OMNIFLIX_FIREBASE_AUTHDOMAIN}#',
    databaseURL: '#{OMNIFLIX_FIREBASE_DATABASEURL}#',
    projectId: '#{OMNIFLIX_FIREBASE_PROJECTID}#',
    storageBucket: '#{OMNIFLIX_FIREBASE_STORAGEBUCKET}#',
    messagingSenderId: '#{OMNIFLIX_FIREBASE_MESSAGERSENDINGID}#',
    appId: '#{OMNIFLIX_FIREBASE_APPID}#'
  },
  tmdbToken: '#{TMDB_APIKEY}#',
  fanartApiKey: '#{FANART_APIKEY}#'
};
