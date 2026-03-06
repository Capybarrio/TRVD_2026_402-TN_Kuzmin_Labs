const mongoose = require("mongoose");

function isSrvDnsError(error) {
  return error?.syscall === "querySrv" || /querySrv/i.test(error?.message || "");
}

async function connectWithUri(uri) {
  await mongoose.connect(uri);
  console.log("MongoDB Connected");
}

async function connectDatabase({ mongoUri, mongoUriDirect }) {
  try {
    await connectWithUri(mongoUri);
    return;
  } catch (error) {
    if (isSrvDnsError(error) && mongoUriDirect) {
      console.warn("SRV DNS resolution failed, trying MONGO_URI_DIRECT fallback...");
      await connectWithUri(mongoUriDirect);
      return;
    }

    if (isSrvDnsError(error) && !mongoUriDirect) {
      error.message = `${error.message}\nSet MONGO_URI_DIRECT to a non-SRV Atlas URI (mongodb://...) or fix DNS for SRV records.`;
    }

    throw error;
  }
}

module.exports = { connectDatabase };
