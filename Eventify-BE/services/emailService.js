import nodemailer from "nodemailer";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Get the directory name properly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendEmail = async (name, email, message) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: email,
      to: "eventify.feedback@gmail.com",
      subject: `Feedback from ${name}`,
      text: `Sender: ${email} \n\n Message: ${message} `,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error: error.message };
  }
};

export const sendResetPassword = async (user, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
    });

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    // Define the template data
    const templateData = {
      user,
      resetLink
    };

    // Render the EJS template
    const emailHtml = await ejs.renderFile(
      path.join(__dirname, '../views/emails/passwordReset.ejs'),
      templateData
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Your Eventify Password",
      html: emailHtml,
    });

    return { message: "Reset link sent to your email!" };
  } catch (error) {
    console.error("Email error:", error);
    return { error: error.message };
  }
};

export const sendEventConfirmation = async (user, event, ticket, numberOfTickets, totalPrice) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
    });

    // Define the template data
    const templateData = {
      user,
      event,
      numberOfTickets,
      totalPrice,
      ticketId: ticket._id,
      dashboardLink: `${process.env.CLIENT_URL}/user/my-tickets`
    };

    // Render the EJS template
    const emailHtml = await ejs.renderFile(
      path.join(__dirname, '../views/emails/eventConfirmation.ejs'),
      templateData
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Event Registration Confirmed - ${event.title}`,
      html: emailHtml,
    });

    return { message: "Confirmation email sent successfully!" };
  } catch (error) {
    console.error("Email error:", error);
    return { error: error.message };
  }
};