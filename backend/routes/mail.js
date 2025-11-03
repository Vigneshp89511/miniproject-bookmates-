import nodemailer from 'nodemailer'
 
const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587||25||465,
    secure:false,
    auth:{
        user:"database189511@gmail.com",
        pass:"svjdljhxshdknkwg" 
    },
});

transporter.verify((error, success) => {
  console.log(error || success);
});

export default transporter;