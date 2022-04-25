import mongoose from 'mongoose';

const DB_URL = 'mongodb://localhost:27017/video_links';

const connection = mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });



  export {DB_URL, connection }