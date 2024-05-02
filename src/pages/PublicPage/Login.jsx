import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Fungsi untuk mengatur nilai data menjadi kosong
  const dataKosong = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi panjang minimal password
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
  
    // Periksa manual email dan password terlebih dahulu
    if (email === 'admin@gmail.com' && password === '12345678') {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard"); 
      dataKosong(); // Setel nilai data menjadi kosong dengan menggunakan fungsi dataKosong
      return;
    }
  
    // Periksa data dari formulir registrasi
    const registrationData = JSON.parse(localStorage.getItem('registrationData'));
    if (registrationData && email === registrationData.email && password === registrationData.password) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard"); 
      dataKosong(); // Setel nilai data menjadi kosong dengan menggunakan fungsi dataKosong
    } else {
      setError('Invalid email or password'); 
    }
  }  

  useEffect(() => {
    if (isAuthenticated == "true") {
      console.log("anda sudah login");
      navigate("/dashboard"); 
    }

    const registrationData = JSON.parse(localStorage.getItem('registrationData'));
    if (registrationData) {
      setEmail(registrationData.email);
      setPassword(registrationData.password);
    }

  }, []); 

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleSubmit} className="p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>} {/* Tampilkan pesan kesalahan */}
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block font-semibold mb-2">Password</label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-blue-600 focus:bg-blue-600">
            Login
          </button>
        <div className=" mt-4">
          <p>Do not have an account? 
            <span className="text-blue-500"><Link to="/registration"> Register now</Link></span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;