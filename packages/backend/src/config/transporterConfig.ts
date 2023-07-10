const transporterConfig = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS_USER,
    pass: process.env.EMAIL_ADDRESS_PASS,
  },
};

export default transporterConfig;
