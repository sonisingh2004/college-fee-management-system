# Testing Protected Routes

## Issue: Protected Routes Not Working

The protected routes have been fixed with improved error handling and debug logging. Follow these steps to test:

### Step 1: Clear Browser Storage
Open Developer Console (F12) and run:
```javascript
// Clear all localStorage data
localStorage.clear();

// Or manually clear:
localStorage.removeItem("auth");
localStorage.removeItem("students");
localStorage.removeItem("admins");
```

Then refresh the page.

### Step 2: Register a Student Account
1. Go to `http://localhost:3000/register`
2. Fill in the form:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123`
3. Click Register

Expected: Should see success message

### Step 3: Register an Admin Account
1. Go to `http://localhost:3000/admin/register`
2. Fill in the form:
   - Username: `admin1`
   - Email: `admin@example.com`
   - Password: `admin123`
3. Click Register

Expected: Should see success message

### Step 4: Login as Student
1. Go to `http://localhost:3000/login`
2. Enter:
   - Email: `john@example.com`
   - Password: `password123`
3. Click Login

Expected: 
- Redirects to `/student` dashboard
- Check console for: "Student logged in. Auth data: {role: "student", email: "john@example.com", name: "John Doe"}"

### Step 5: Access Student Dashboard
You should now see:
- StudentLayout with header and sidebar
- Dashboard content loads
- Check console for: "ProtectedRoute - Access granted"

### Step 6: Try to Access Admin Route as Student
1. Manually go to `http://localhost:3000/admin`

Expected:
- Check console for: "ProtectedRoute - Role mismatch. User role: student Required: admin"
- Should be redirected back to `/student`

### Step 7: Login as Admin
1. Go to `http://localhost:3000/logout` (doesn't exist, but you can logout manually)
2. Open console and run: `AuthService.logout()`
3. Go to `http://localhost:3000/admin/login`
4. Enter:
   - Email: `admin@example.com`
   - Password: `admin123`
5. Click Login

Expected:
- Redirects to `/admin` dashboard
- Check console for: "Admin logged in. Auth data: {role: "admin", email: "admin@example.com", name: "admin1"}"

### Step 8: Access Admin Dashboard
You should now see:
- AdminLayout with navigation
- Dashboard content loads
- Check console for: "ProtectedRoute - Access granted"

### Step 9: Try to Access Student Route as Admin
1. Manually go to `http://localhost:3000/student`

Expected:
- Check console for: "ProtectedRoute - Role mismatch. User role: admin Required: student"
- Should be redirected back to `/admin`

### Step 10: Test Login Failure
1. Go to `http://localhost:3000/login`
2. Enter wrong credentials:
   - Email: `wrong@example.com`
   - Password: `wrongpass`
3. Click Login

Expected:
- See error message: "Invalid student credentials"
- Stays on login page

## Debug Console Output

Watch the browser console for these debug logs:

**On Protected Route Check:**
```
ProtectedRoute - User Object: {role: "student", email: "john@example.com", name: "John Doe"}
ProtectedRoute - Required Role: student
ProtectedRoute - Access granted
```

**On Login:**
```
Student logged in. Auth data: {role: "student", email: "john@example.com", name: "John Doe"}
getUser() returning: {role: "student", email: "john@example.com", name: "John Doe"}
```

**On Role Mismatch:**
```
ProtectedRoute - User Object: {role: "student", email: "john@example.com", name: "John Doe"}
ProtectedRoute - Required Role: admin
ProtectedRoute - Role mismatch. User role: student Required: admin
```

**On No Auth:**
```
ProtectedRoute - User Object: null
ProtectedRoute - Required Role: student
ProtectedRoute - No user or role, redirecting to login
```

## Common Issues & Solutions

### Issue: Redirect Loop
**Symptoms:** Page keeps redirecting, never loads

**Solutions:**
1. Check browser console for the debug logs
2. Verify localStorage is not empty: `localStorage.getItem("auth")`
3. Verify the user object has a `role` property
4. Clear all data and re-register: `localStorage.clear()`

### Issue: Can't Login
**Symptoms:** Login button doesn't work

**Solutions:**
1. Check console for error logs
2. Verify you registered the account first
3. Verify credentials match exactly (case-sensitive email)
4. Run: `JSON.parse(localStorage.getItem("students"))` to see registered students

### Issue: Role Mismatch
**Symptoms:** Logged in but redirected to wrong page

**Solutions:**
1. Check the auth object: `localStorage.getItem("auth")`
2. Verify role is set correctly (should be "student" or "admin")
3. Clear and re-login: `localStorage.clear()`

### Issue: Lost Session on Page Refresh
**Symptoms:** Login works but refreshing page logs you out

**Solutions:**
1. This is expected behavior (localStorage is persistent but component re-renders)
2. Check if localStorage still has auth: `localStorage.getItem("auth")`
3. This will be fixed when connecting to backend JWT

## Logout Function

To add a logout button, use:
```javascript
import { AuthService } from "./auth/AuthService";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };
  
  return <button onClick={handleLogout}>Logout</button>;
}
```

## Next Steps

Once protected routes work:
1. Connect frontend login to backend API (APIService)
2. Use JWT tokens instead of localStorage
3. Add token refresh mechanism
4. Implement proper session management
