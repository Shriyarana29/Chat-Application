import React, { useState, useContext } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {

  const [currentState, setCurrentState] = useState('Sign Up')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const {login} = useContext(AuthContext)

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (currentState === 'Sign Up' && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return
    } 
    login(currentState === 'Sign Up' ? 'signup':'login',{fullName, email, password, bio})
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

      {/*    LEFT   */}
      <img src={assets.logo_big} alt='' className='w-[min(30vw,250px)]' />

      {/*    RIGHT   */}

      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg w-[450px] max-w-full'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currentState}
          {
            isDataSubmitted && <img onClick={() => setIsDataSubmitted(false)} src={assets.arrow_icon} alt='' className='w-5 cursor-pointer' />
          }

        </h2>

        {
          currentState === 'Sign Up' && !isDataSubmitted && (
            <input type='text' placeholder='Full name' required className='p-2 border border-gray-500 rounded-md focus:outline-none' />
          )}

        {
          !isDataSubmitted && (
            <>
              <input className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />

              <input className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />

            </>
          )}

        {
          currentState === 'Sign Up' && isDataSubmitted && (

            <textarea rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
              placeholder='Provide a short bio...' value={bio} onChange={(e) => setBio(e.target.value)} required></textarea>
          )}

        <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
          {currentState === 'Sign Up' && isDataSubmitted ? 'Create Account' : 'Login Now'}
        </button>

        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type='checkbox' />
          <p>Agree to terms of use and privacy policy</p>
        </div>

        <div className='flex flex-col gap-2'>
          {
            currentState === 'Sign Up' ? (
              <p className='text-sm text-gray-600'>Already have an account?
                <span className='font-medium text-violet-500 cursor-pointer'
                  onClick={() => { setCurrentState('Login'); setIsDataSubmitted(false) }}> Login Here</span>
              </p>
            ) : (
              <p className='text-sm text-gray-500'>Create and Account
                <span className='text-blue-500 cursor-pointer'
                  onClick={() => setCurrentState('Sign Up')}> Click Here</span>
              </p>
            )
          }
        </div>

      </form>
    </div>
  )
}

export default LoginPage
