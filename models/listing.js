const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const Review = require("./review.js");



// Schema difinition
const listingSchema  = new Schema({
  title:{
    type:String,
    required:true,
  },
  description:{
    type:String,
  },
  image:{
    url: String,
    filename: String,   
    },
    
  price:{
    type:Number,
    required:true
  },
  location:String,
  country:String,
  reviews: [  
    {
    type: Schema.Types.ObjectId,
    ref: "Review"
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates:{
    type: [Number],
    required: true
  }
}
});

listingSchema.post("findOneAndDelete",async(listing) => {
  if(listing) {
  await Review.deleteMany({_id : {$in: listing.reviews}});
  }
});

// Model creation
const Listing = Mongoose.model("Listing",listingSchema);
module.exports = Listing ;

