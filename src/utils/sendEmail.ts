import nodemailer from 'nodemailer'

const sendEmail = async (email: string, subject: string, text: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'chungducquang2@gmail.com',
        pass: 'qafn bnvw ecgk fmjo'
      },
      tls: {
        ciphers: 'SSLv3'
    }
    })

    await transporter.sendMail({
      from: 'chungducquang2@gmail.com',
      to: email,
      subject: subject,
      text: text
    })
    console.log('email sent sucessfully')
  } catch (error) {
    console.log('email not sent')
    console.log(error)
  }
}

export default {
  sendEmail
}
