# Integration Guide - Frontend to Backend

## 1. Frontend to Backend Connection

### API Service Setup

The `ApiService.js` is already created and handles all API communication. It:
- Manages JWT tokens
- Handles authentication headers
- Provides methods for all backend endpoints
- Auto-handles errors

### Using the API Service

```javascript
import APIService from './services/ApiService';

// Student Login
const response = await APIService.studentLogin(email, password);
APIService.setToken(response.token);

// Get Fees
const fees = await APIService.getStudentFees(studentId);

// Create Payment
const payment = await APIService.createPayment({
  fee: feeId,
  amount: 5000,
  paymentMethod: 'razorpay'
});
```

## 2. Payment Gateway Integration (Razorpay)

### Setup Razorpay Account

1. **Create Account**: https://razorpay.com
2. **Get API Keys**: Go to Settings → API Keys
3. **Update .env** in backend:
   ```
   RAZORPAY_KEY_ID=your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret
   ```

### Payment Flow

1. **Create Order**:
   - User clicks "Pay Now" button
   - Frontend calls `/payments/create-order` API
   - Razorpay order is created

2. **User Payment**:
   - Razorpay modal opens
   - User enters payment details
   - Payment is processed

3. **Verify Payment**:
   - Frontend gets payment response
   - Calls `/payments/verify-payment` API
   - Backend verifies with Razorpay
   - Payment record is saved in MongoDB

4. **Send Confirmation**:
   - Email confirmation sent to student
   - Admin notification sent
   - Fee status is updated

### Using PaymentComponent

```javascript
import PaymentComponent from './components/PaymentComponent';

export default function StudentPayments() {
  const handlePaymentSuccess = (receipt) => {
    console.log('Payment successful!', receipt);
    // Update UI or redirect
  };

  return (
    <PaymentComponent 
      feeId="65abc123def456"
      amount={5000}
      feeType="Tuition Fee"
      onPaymentSuccess={handlePaymentSuccess}
    />
  );
}
```

## 3. Email Notifications Setup

### Gmail Configuration

1. **Enable 2FA** in Gmail account
2. **Generate App Password**:
   - Go to Google Account → Security
   - Create App Password for Gmail
   - Copy the 16-character password

3. **Update .env** in backend:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ADMIN_EMAIL=admin@college.edu
   ```

### Email Templates Sent

1. **Student Registration**
   - Welcome email with account details
   - Login instructions

2. **Fee Assignment**
   - New fee notification
   - Due date reminder
   - Fee details and payment link

3. **Payment Confirmation**
   - Receipt and transaction ID
   - Payment method and amount
   - Date and status

4. **Fee Reminder**
   - Days overdue notification
   - Outstanding amount
   - Action required message

5. **Admin Notifications**
   - New payment received
   - Student details
   - Admin panel link

## 4. Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### Backend (.env)
```
# Database
MONGODB_URI=mongodb://localhost:27017/fee-management

# Authentication
JWT_SECRET=your_secret_key

# Server
PORT=5000
NODE_ENV=development

# Email
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@college.edu

# Payment Gateway
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# URLs
FRONTEND_URL=http://localhost:3000
ADMIN_PANEL_URL=http://localhost:3000/admin
```

## 5. Installation & Running

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
# From root directory
npm install
npm start
```

## 6. API Endpoints Reference

### Authentication
- `POST /api/auth/student/register` - Register student
- `POST /api/auth/student/login` - Login student
- `POST /api/auth/admin/register` - Register admin
- `POST /api/auth/admin/login` - Login admin
- `GET /api/auth/me` - Get current user

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify-payment` - Verify payment
- `GET /api/payments` - Get payments
- `POST /api/payments/:id/receipt` - Generate receipt

### Students
- `GET /api/students` - Get all students (Admin)
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Add student (Admin)
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student (Admin)

### Fees
- `GET /api/fees` - Get fees
- `POST /api/fees` - Create fee (Admin)
- `PUT /api/fees/:id` - Update fee (Admin)
- `DELETE /api/fees/:id` - Delete fee (Admin)

### Reports
- `GET /api/reports/fee-collection` - Fee report (Admin)
- `GET /api/reports/payments` - Payment report (Admin)
- `GET /api/reports/students` - Student report (Admin)
- `GET /api/reports/student/:id` - Student fee status

## 7. Testing the Integration

### Test Student Payment

1. **Login as Student**
   - Email: student@college.com
   - Password: test123

2. **View Fees**
   - Navigate to Payments tab
   - See assigned fees

3. **Make Payment**
   - Click "Pay Now"
   - Use Razorpay test credentials:
     - Card: 4111 1111 1111 1111
     - Expiry: Any future date
     - CVV: Any 3 digits

4. **Verify Success**
   - Check email for confirmation
   - Verify payment in dashboard
   - Check admin notifications

### Test Admin Functions

1. **Login as Admin**
   - Email: admin@college.com
   - Password: admin123

2. **Add Student**
   - Go to Add Student
   - Fill in all details
   - Submit

3. **Create Fee**
   - Go to Fees
   - Assign fee to student
   - Set due date

4. **View Reports**
   - Check fee collection
   - Check payment history
   - View student reports

## 8. Troubleshooting

### API Connection Issues
- Ensure backend is running on port 5000
- Check .env REACT_APP_API_URL
- Verify CORS is enabled in backend

### Email Not Sending
- Check EMAIL_USER and EMAIL_PASSWORD
- Verify Gmail 2FA is enabled
- Check app password is correct
- Check ADMIN_EMAIL is valid

### Payment Not Processing
- Verify Razorpay keys are correct
- Check payment status in Razorpay dashboard
- Verify MongoDB is connected
- Check network tab for errors

## 9. Deployment

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables
4. Deploy

### Backend (Heroku/Railway)
1. Push to GitHub
2. Connect to Heroku/Railway
3. Set environment variables
4. Deploy

## 10. Production Checklist

- [ ] Change JWT_SECRET to strong random string
- [ ] Update Razorpay to live keys
- [ ] Setup email with production account
- [ ] Configure database backups
- [ ] Enable HTTPS
- [ ] Setup monitoring and logging
- [ ] Test all payment flows
- [ ] Verify email templates
- [ ] Setup error tracking (Sentry)
- [ ] Enable rate limiting
