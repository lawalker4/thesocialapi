const { Schema, model } = require('mongoose');


const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thoughts"
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        //prevents virtuals from created duplicate of id as id
        id: false
    }
);


// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
}
);

const User = model('User', UserSchema);

module.exports = User;
