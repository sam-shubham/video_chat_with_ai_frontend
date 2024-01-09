const mongoose = require("mongoose");

const popularPromptsSchema = new mongoose.Schema({
  allPopularPrompts: {
    type: Array,
    required: true,
    default: [],
  },
  type: { type: String, required: false, default: "allPopularPrompts" },
});

export default mongoose.models?.popularPrompts ||
  mongoose.model("popularPrompts", popularPromptsSchema);
