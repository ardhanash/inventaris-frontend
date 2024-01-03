"use client";
import { SyntheticEvent, use, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Product = {
    id: number;
    title: string;
    price: number;
    brandId: number;
}

const DeleteProducts = ({ product }: { product: Product }) => {

  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    setIsOpen(!isOpen);
  }

  const router = useRouter();

  const handleDelete = async (productId: number) => {
    await axios.delete(`/api/products/:id/${productId}`)

    router.refresh();
    setIsOpen(false);
    console.log(productId)
  }

  return (
    <div>
      <button className="btn btn-error" onClick={handleModal} >DELETE</button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box" style={{ height: 200 }}>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModal}>✕</button>
          </form>

          <h3 className="font-bold text-lg">Are you sure to delete {product.title} ? </h3>
          <form>
            <br />
            <div className='modal-action'>
              <button type='button' className='btn' onClick={handleModal} >No</button>
              <button type='button' className='btn btn-error' onClick={() => handleDelete(product.id)} >Yes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DeleteProducts