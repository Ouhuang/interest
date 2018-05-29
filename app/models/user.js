const mongoose = require('mongoose');
const BaseModel = require("./base_model");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: { type: Number, index: true },
    login_name: { type: String },
    user_name: { type: String },
    pass_word: { type: String },
    email: { type: String }
})


UserSchema.plugin(BaseModel);
UserSchema.pre('save', function (next) {
    var now = new Date();
    this.update_at = now;
    next();
});
mongoose.model('User', UserSchema);


