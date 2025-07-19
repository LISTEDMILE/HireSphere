
const User = require('./userModel');
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    profileName: {
        type: String,
        required: [true, "Profile Name is required"],
    },
    profileGender: {
        type: String,
        required: [true, "Mention Gender"],
    },
    profilePost: {
        type: String,
        required: [true, "Profile Post is required"],
    },
    profileCourse: {
        type: String,
        required: [true, "Profile Course is required"],
    },
    profileSkills: {
        type: String,
        required: [true, "Profile Skills are required"],
    },
    profileEmail: {
        type: String,
        required: [true, "Profile Email is required"],
    },
    profileMobile: {
        type: String,
        required: [true, "Profile Mobile is required"],
    },
    profileTenth: {
        type: String,
        required: [true, "Profile Tenth is required"],
    },
    profileTwelth: {
        type: String,
        required: [true, "Profile Twelth is required"],
    },
    profileGraduation: {
        type: String,
        required: [true, "Profile Graduation is required"],
    },
    profileDescription: {
        type: String,
        required: [true, "Profile Description is required"],
    },
    profilePostDescription: {
        type: String,
        required: [true, "Profile Post Description is required"],
    }
});

profileSchema.pre('findOneAndDelete', async function(next) {
    const profileId = this.getQuery()['_id'];
    await User.findOneAndUpdate(
        { profilesPosted: profileId },
        { $pull: { profilesPosted: profileId } }
    );
    await User.findOneAndUpdate(
        { profileFavourites: profileId },
        { $pull: { profileFavourites: profileId } }
    );
    await User.findOneAndUpdate(
        { chosenProfiles: profileId },
        { $pull: { chosenProfiles: profileId } }
    );
    next();
});

module.exports = mongoose.model('Profile', profileSchema);


   

