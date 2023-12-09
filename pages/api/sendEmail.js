import nodemailer from "nodemailer";
import { createRouter, expressWrapper } from "next-connect";
const router = createRouter();
router.post(async (req, res) => {
  try {
    await sendMail(req.body);
    res.send({ status: true });
  } catch (error) {
    res.send({ status: false });
  }
});
export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});

var sendMail = async (dataobj) => {
  var transporter = nodemailer.createTransport({
    host: "shared.bestnodes.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "aiwebsite@24justice.com",
      pass: "AI24Justice2023!",
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  const info = await transporter.sendMail({
    from: '"AI Website" <aiwebsite@24justice.com>', // sender address
    to: "bilal@24justice.pk", // list of receivers
    // to: "adityakr010.101@gmail.com", // list of receivers
    subject: "AI Website Enquiry", // Subject line
    text: `User Name: ${dataobj["User Name"]}\nEmail: ${dataobj["Email"]}\nPhone Number: ${dataobj["Phone number"]}\nContacting From: ${dataobj["Contacting from"]}\nAdditional Info: ${dataobj["Additional info"]}`,
    html: `<p><strong>User Name:</strong> ${dataobj["User Name"]}</p>
           <p><strong>Email:</strong> ${dataobj["Email"]}</p>
           <p><strong>Phone Number:</strong> ${dataobj["Phone number"]}</p>
           <p><strong>Contacting From:</strong> ${dataobj["Contacting from"]}</p>
           <p><strong>Additional Info:</strong> ${dataobj["Additional info"]}</p>`,
  });

  console.log("Message sent: %s", info);
};
