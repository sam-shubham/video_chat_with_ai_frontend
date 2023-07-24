const mongoose = require("mongoose");

const StageCommandSchema = new mongoose.Schema({
  openaiSettings: {
    type: Object,
    required: true,
  },
  type: { type: String, required: false, default: "openaiSettings" },
});

export default mongoose.models?.openAiSettings ||
  mongoose.model("openAiSettings", StageCommandSchema);
