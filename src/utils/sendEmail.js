import nodemailer from "nodemailer";


export async function sendEmail (to,subject,html){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "faltahrawy@gmail.com",
          pass: "ufeg syxt xdop mrjm",
        },
      });
    
      const info = await transporter.sendMail({
        from: '"Node 10" <faltahrawy@gmail.com>', 
        to, 
        subject, 
        html, 
      });
}
