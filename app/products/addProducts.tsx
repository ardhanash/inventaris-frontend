"use client";
import { SyntheticEvent, use, useState } from 'react';
import type { Brand } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddProducts = ({brands}: {brands: Brand[]}) => {

  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [brand, setBrand] = useState("")

  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  }

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post('/api/products', {
      title: title,
      price: Number(price),
      brandId: Number(brand)
    })

    setTitle("")
    setPrice("")
    setBrand("")
    
    router.refresh();
    setIsOpen(false);
  }

  return (
    <div>
      <button className="btn" onClick={handleModal} >Add New Product</button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box" style={{ height: 450 }}>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModal}>✕</button>
          </form>

          <h3 className="font-bold text-lg">Add New Product</h3>
          <form onSubmit={handleSubmit} >
            <div className='form-control w-full'>
            <label className='label font-bold' >Product Name</label>
              <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Product Name" 
              className="input input-bordered" />
            </div>

            <div className='form-control w-full'>
            <label className='label font-bold' >Price</label>
              <input 
              type="text" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price" 
              className="input input-bordered" />
            </div>

            <div className='form-control w-full'>
              <label className='label font-bold' >Brand</label>
              <select className='select select-bordered' value={brand} onChange={(e) => setBrand(e.target.value)} >
                <option disabled>
                  Select Brand
                </option>
                {brands.map((brand) => (
                  <option value={brand.id} key={brand.id}>
                  {brand.name}
                </option>
                ))}
              </select>
            </div>

            <div className='modal-action'>
              <button type='button' className='btn' onClick={handleModal} >Close</button>
              <button type='submit' className='btn btn-primary' onClick={handleModal} >Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProducts