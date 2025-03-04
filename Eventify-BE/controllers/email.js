import { sendEmail } from "../services/emailService.js";

export const handleSendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  const response = await sendEmail(name, email, message);
  if (response.success) {
    res.status(200).json(response);
  } else {
    res.status(500).json(response);
  }
};
