import React from 'react';
import {Phone} from 'lucide-react';
import Quicktips from '@/components/Quicktips';

const Page = () => {
  return (
    <div className="flex bg-slate-100 flex-row gap-4 p-4">
      <div className="flex flex-col gap-2 bg-blue-100 rounded-lg p-4 basis-[70%]">
        <h1 className="text-2xl text-black font-bold text-center">Emergency</h1>
        <p className="text-sm text-black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
        </p>
      </div>
      <div className='flex flex-col gap-4'>
      <div className="flex flex-col items-center justify-center bg-[#3f8578] rounded-lg p-4 basis-[30%]">
        <Phone className="text-white" size={25} />
        <span className='border-b border-white w-25 my-2'></span>
        <h1 className="text-xl  font-bold ">Call Now</h1>
        <h2 className="text-sm">Call now for Immediate assistance</h2>
        <a href="tel:1234567890" className="bg-white text-black mt-2 text-xs font-semibold px-4 py-2 rounded bg-gray-200 transition-colors">
          Call 123-456-7890
        </a>
      </div>
      <Quicktips />
       </div>
      
    </div>
  );
};

export default Page;
