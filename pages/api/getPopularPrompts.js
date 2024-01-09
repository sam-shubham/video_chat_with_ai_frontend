import nodemailer from "nodemailer";
import { createRouter, expressWrapper } from "next-connect";
import dbConnect from "@/libs/database/dbconnect";
import popularPrompts from "@/libs/database/models/popularPrompts";
const router = createRouter();
router.get(async (req, res) => {
  try {
    await dbConnect();
    var { allPopularPrompts } = await popularPrompts.findOne({
      type: "allPopularPrompts",
    });

    res.send({ status: true, allPopularPrompts });
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
