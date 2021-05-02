const nodemailer = require("nodemailer");


const sendEmail = async function(options){

    const transporter = nodemailer.createTransport({
        service : process.env.EMAIL_SERVICE,
        auth : {
            user : process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from : process.env.EMAIL_FROM,
        to : options.to,
        subject : options.subject,
        html : options.text
    }

    try{

        const info = await transporter.sendMail(mailOptions);
        //if ok no errors 
        console.log(info);
        return info;

    }catch(error){
        console.error(error);
        return undefined;
    }

}


module.exports = sendEmail;