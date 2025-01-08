import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import PaymentPage from "./components/PaymentPage";
import HomePage from './components/HomePage';
import MainApp from './components/MainApp';


function App() {

   // Sample data to pass to MainApp
   const token = 'i2ZxKJIljb0+XGmWttdP3F2U832t7HM9tVnAl+LDL5DlGne13/f5HRtPL3DhqAY6uheG0GFX4tuTIwyiI6CexZL4Dm20PqZa6G+9kRlcqCK8Bct+ZBxoCWmZ/tw41q3QwUiIee3lCSZyqX7hvt5dRiZ+EH9Aeq7L0Eysepxgko2Hi4NWJy6yDw5LqzkfW5hPhc/MO1QpreFH/99qh/vjnXzgy4pH32Bs9mo1PfosJ3eX0ceSyOb+dZUCIgpfVzznXN8GLWw0WAmFwA874GyF5Fo0JMwRsnStezgcbIxV+QT9QmzN0zz1n0zzTilA7mMhZp2hqtxGDYqSdhI6M/1NqQ==';
   const amount = '100';
   const remark = 'Payment for service';
   const identifier = 'bm001';
   const orderId = generateOrderId();
   
 
   // Function to generate orderId
   function generateOrderId() {
     const now = new Date();
     const year = now.getFullYear();
     const month = (now.getMonth() + 1).toString().padStart(2, '0');
     const day = now.getDate().toString().padStart(2, '0');
     const hour = now.getHours().toString().padStart(2, '0');
     const minute = now.getMinutes().toString().padStart(2, '0');
     const second = now.getSeconds().toString().padStart(2, '0');
 
     return `ORDERID${year}${month}${day}${hour}${minute}${second}`;
   }

  return (


    <div className="App">
      {/* <HomePage /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route 
            path="/" 
            element={<MainApp 
              token={token} 
              amount={amount} 
              remark={remark} 
              identifier={identifier} 
              orderId={orderId} 
            />} 
          />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
