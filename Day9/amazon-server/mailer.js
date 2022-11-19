const nodemailer = require('nodemailer')
const config = require('./config')

function sendEmail(email, subject, body, callback){
    const transport = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: config.emailUser,
            pass: config.emailPassword
        }
    })

    const options = {
        from: config.emailUser,
        to: email,
        subject: subject,
        // html: `
        //     <h1>Welcome to mystore</h1>

        //     <div>Hello,</div>
        //     <div>Welcome to mystore application.</div>
        //     <div>here.....</div>
            
        //     <div>Best Regards,</div>
        //     <div>admin.</div>
        //     `
        html: body
    }

    // transport.sendMail(options, (error, info) => {
    //     console.log(error)
    //     console.log(info)
    // })

    transport.sendMail(options, callback)
    
    
}

module.exports = {
    sendEmail: sendEmail
}

// sendEmail(
//     'sahildhatrak51@gmail.com', 
//     'Welcome to mystore', 
//     `
//     <h1>Welcome to mystore</h1>
//     <div>Hello,</div>
//     <div>Welcome to mystore application.</div>
//     <div>here.....</div>
        
//     <div>Best Regards,</div>
//     <div>admin.</div>        
// `)