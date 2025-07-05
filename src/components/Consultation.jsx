import React,{useState,useEffect} from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

const Consultation = () => {
    const [consultation,setConsultation] =useState([]);

    useEffect(()=>{
        const fetchConsultation=async()=>{
            try{
                const consultationCollection=collection(db,'consultation');
                const consultationSnapshot=await getDocs(consultationCollection);
                const consultationList=consultationSnapshot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data(),
                }))
                setConsultation(consultationList);
            }catch(error){
                console.log(error);
            }
        }
        fetchConsultation();
    },[])

  return (
    <div className='p-4 rounded bg-[#3f8578] border-slate-100 mt-4'>
        <h3 className='text-xl font-bold  my-1 mb-2'>My Consultations</h3>
      {consultation.length > 0 ? (
        <ul className='flex flex-col gap-4  px-4'>
          {consultation.map(item => (
            <li key={item.id} className='flex align-center border gap-4 rounded border-black p-2 '>
              <h4 className='font-semibold  text-2xl px-2'>{item.subject}</h4>
              <p className='text-md text-red-500 mt-2 px-2'>{item.date} at {item.time} </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-slate-600'>No consultations scheduled.</p>
      )}
    </div>
  )
}

export default Consultation
