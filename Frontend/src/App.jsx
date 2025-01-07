import { useState } from 'react'
//import './App.css'

// Importar Router
import { Route, Routes } from 'react-router-dom';

// Importar componentes
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

// Importar páginas
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Registro from '@/pages/Registro';
import Admin from '@/pages/Admin';

function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 p-4 w-full bg-gray-200'>Soy main
        
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Registro" element={<Registro />}></Route>
          <Route path="/Admin" element={<Admin />}></Route>
        </Routes>


      </main>
      <Footer />
    </div>
  )
}

export default App
