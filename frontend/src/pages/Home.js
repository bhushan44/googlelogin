import React from 'react'
import { useEffect,useState } from 'react'

export default function Home() {
  const [data,setData]=useState([])
  useEffect(()=>{
   async function getdata(){
    const res=await fetch("http://localhost:4000/getuser")
    const result=await res.json()

    setData(result.data)
    console.log(result)
    console.log(data)

    }
    getdata()
  },[])
  // useEffect(() => {
  //   console.log(data); // Logs the data whenever it changes
  // }, [data]); // Dependency array with data to trigger the effect when data changes

  return (
    <div>
      <p>name:{data[0]?.name}</p>
      <p>email:{data[0]?.email}</p>
      <img src={data[0]?.picture} alt="bhu"></img>
    </div>
  )
}
