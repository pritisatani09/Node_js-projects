const { sendMail } = require("../middleware/mailer");

/** 
 * @param {String} firstName 
 * @param {String} lastName 
 * @param {String} email 
 * @param {string} plainPassword 
 */
const sendCredentialsMail = async (user, plainPassword) => {
  const subject = "Welcome to Company Portal";

  const text = `
  <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial', sans-serif;
        }
        
        body {
            background-color: #0a0a0a;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }
        
        .email-container {
            max-width: 600px;
            width: 100%;
            background: #1a1a1a;
            border-radius: 0;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(255, 0, 0, 0.1);
            border: 1px solid #333;
        }
        
        .email-header {
            background: linear-gradient(135deg, #000000, #8B0000);
            color: #ffffff;
            padding: 40px 30px;
            text-align: center;
            border-bottom: 3px solid #ff0000;
        }
        
        .email-header h1 {
            font-size: 32px;
            margin-bottom: 15px;
            font-weight: 700;
            letter-spacing: 1px;
        }
        
        .email-header p {
            opacity: 0.9;
            font-size: 16px;
            font-weight: 300;
        }
        
        .email-body {
            padding: 40px 30px;
            background: #1a1a1a;
        }
        
        .greeting {
            font-size: 24px;
            margin-bottom: 25px;
            color: #ffffff;
            font-weight: 600;
            border-bottom: 1px solid #333;
            padding-bottom: 10px;
        }
        
        .message {
            margin-bottom: 30px;
            line-height: 1.7;
            color: #cccccc;
            font-size: 16px;
        }
        
        .credentials {
            background: #2a2a2a;
            border-radius: 0;
            padding: 25px;
            margin: 30px 0;
            border-left: 4px solid #ff0000;
            border-right: 1px solid #333;
            border-top: 1px solid #333;
            border-bottom: 1px solid #333;
        }
        
        .credential-item {
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            padding: 8px 0;
        }
        
        .credential-label {
            font-weight: 600;
            min-width: 100px;
            color: #ffffff;
            font-size: 16px;
        }
        
        .credential-value {
            color: #ff4444;
            font-weight: 500;
            font-size: 16px;
            background: #333;
            padding: 8px 12px;
            border-radius: 3px;
            margin-left: 10px;
            flex-grow: 1;
        }
        
        .instructions {
            background: #2a1a1a;
            border-radius: 0;
            padding: 25px;
            margin: 30px 0;
            border-left: 4px solid #8B0000;
            border-right: 1px solid #333;
            border-top: 1px solid #333;
            border-bottom: 1px solid #333;
        }
        
        .instructions p {
            margin-bottom: 12px;
            color: #cccccc;
            font-size: 15px;
        }
        
        .instructions p:first-child {
            color: #ffffff;
            font-weight: 600;
            margin-bottom: 15px;
            font-size: 16px;
        }
        
        .button-container {
            text-align: center;
            margin: 35px 0;
        }
        
        .login-button {
            display: inline-block;
            background: #ff0000;
            color: #ffffff;
            padding: 16px 40px;
            text-decoration: none;
            border-radius: 0;
            font-weight: 600;
            font-size: 16px;
            letter-spacing: 1px;
            text-transform: uppercase;
            transition: all 0.3s;
            border: 1px solid #ff0000;
        }
        
        .login-button:hover {
            background: #8B0000;
            border-color: #8B0000;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 0, 0, 0.3);
        }
        
        .footer {
            margin-top: 40px;
            padding-top: 25px;
            border-top: 1px solid #333;
            text-align: center;
            color: #888;
            font-size: 14px;
        }
        
        .password-warning {
            color: #ff4444;
            font-weight: 600;
            margin-top: 15px;
            font-size: 15px;
            text-align: center;
            padding: 12px;
            background: #2a1a1a;
            border: 1px solid #333;
        }
        
        .company-name {
            color: #ff0000;
            font-weight: 700;
        }
        
        .security-badge {
            display: inline-block;
            background: #8B0000;
            color: white;
            padding: 5px 10px;
            font-size: 12px;
            border-radius: 3px;
            margin-left: 10px;
            vertical-align: middle;
        }
        
        @media (max-width: 600px) {
            .email-body {
                padding: 25px 20px;
            }
            
            .email-header {
                padding: 30px 20px;
            }
            
            .email-header h1 {
                font-size: 26px;
            }
            
            .credential-item {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .credential-value {
                margin-left: 0;
                margin-top: 5px;
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>WELCOME TO COMPANY PORTAL</h1>
            <p>Your account has been successfully created</p>
        </div>
        
        <div class="email-body">
            <h2 class="greeting">Hello ${user.firstName},</h2>
            
            <p class="message">Thank you for joining <span class="company-name">Company Portal</span>! Your account has been created successfully and is ready to use.</p>
            
            <div class="credentials">
                <div class="credential-item">
                    <span class="credential-label">Email:</span>
                    <span class="credential-value">${user.email}</span>
                </div>
                <div class="credential-item">
                    <span class="credential-label">Password:</span>
                    <span class="credential-value">${plainPassword}</span>
                </div>
            </div>
            
            <div class="instructions">
                <p>For your security, we recommend that you:</p>
                <p>• Change your password after first login</p>
                <p>• Enable two-factor authentication</p>
                <p>• Review your account settings</p>
                <p>• Log out after each session</p>
            </div>
            
            <p class="password-warning">⚠️ Please keep your login credentials secure and do not share them with anyone.</p>
            
            <div class="button-container">
                <a href="#" class="login-button">Access Your Account</a>
            </div>
            
            <div class="footer">
                <p>If you have any questions, please contact our support team.</p>
                <p>&copy; 2023 <span class="company-name">Company Portal</span>. All rights reserved. <span class="security-badge">SECURE</span></p>
            </div>
        </div>
    </div>
</body>`;

  await sendMail(user.email, subject, text);
};

module.exports = { sendCredentialsMail };
