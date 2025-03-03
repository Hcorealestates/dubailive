"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';

export default function FormCommon({ projectName }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new URLSearchParams();
        formData.append('token1', process.env.token1);
        formData.append('token2', process.env.token2);
        const finalresult = await fetch(process.env.API_URL + 'users/GetCountryList/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData,
        });
        const result = await finalresult.json();
        setCountries(result.countries);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('6')
  const [mobileNo, setMobileNo] = useState('')
  const [proName, setProjectname] = useState(projectName)

  //console.log(projectName);
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new URLSearchParams();
    formData.append('token1', process.env.token1);
    formData.append('token2', process.env.token2);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('country', country);
    formData.append('mobileNo', mobileNo);
    formData.append('projectName', proName);
    const finalresult = await fetch(process.env.API_URL + 'users/submitQueryForm/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });
    const data = await finalresult.json();
    setIsSubmitting(false);
    if (data.error == true) {
      setError(data.message);
    } else {
      router.push('https://www.dubaihousing-ae.com/thank-you');
    }
  };
  return <>
    <form className="flex flex-col gap-6" onSubmit={submitHandler}>
    {error && <p className="text-red-600">{error}</p>}
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" required className="outline-hidden block w-full rounded-md border-0 p-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />

      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" className="outline-hidden block w-full rounded-md border-0 p-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
      <select value={country} onChange={e => setCountry(e.target.value)} required className="outline-hidden block w-full rounded-md border-0 py-4 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6">
        {countries.map(function (country) {
          return (
            <option key={country.id} value={country.id}>{country.name}</option>
          );
        })}
      </select>
      <input type="tel" value={mobileNo} onChange={e => setMobileNo(e.target.value)} className="outline-hidden block w-full rounded-md border-0 p-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" placeholder="Enter Mobile Number" />

      <button  disabled={isSubmitting} className="btn btn-primary">{isSubmitting ? "Submitting..." : "Submit"}</button>
    </form>
  </>
}