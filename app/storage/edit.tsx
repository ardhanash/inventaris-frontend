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

const Edit = () => {

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
            <button onClick={handleModal} >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5.00001C3 4.45001 3.19583 3.97917 3.5875 3.58751C3.97917 3.19584 4.45 3.00001 5 3.00001H13.925L11.925 5.00001H5V19H19V12.05L21 10.05V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM9 15V10.75L18.175 1.57501C18.375 1.37501 18.6 1.22501 18.85 1.12501C19.1 1.02501 19.35 0.975006 19.6 0.975006C19.8667 0.975006 20.1208 1.02501 20.3625 1.12501C20.6042 1.22501 20.825 1.37501 21.025 1.57501L22.425 3.00001C22.6083 3.20001 22.75 3.42084 22.85 3.66251C22.95 3.90417 23 4.15001 23 4.40001C23 4.65001 22.9542 4.89584 22.8625 5.13751C22.7708 5.37917 22.625 5.60001 22.425 5.80001L13.25 15H9ZM11 13H12.4L18.2 7.20001L17.5 6.50001L16.775 5.80001L11 11.575V13Z" fill="#3559E0" />
                </svg>
            </button>

            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box" style={{ height: 400 }}>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModal}>✕</button>
                    </form>

                    <form >
                        <div className='form-control w-full'>
                            <label className='label font-bold' >Kode</label>
                            <input
                                type="text"
                                placeholder="Kode"
                                className="input input-bordered" />
                        </div>

                        <div className='form-control w-full'>
                            <label className='label font-bold' >Barang</label>
                            <input
                                type="text"
                                placeholder="Barang"
                                className="input input-bordered" />
                        </div>

                        <div className='form-control w-full'>
                            <label className='label font-bold' >Stok</label>
                            <input
                                type="text"
                                placeholder="Stok"
                                className="input input-bordered" />
                        </div>
                    </form>

                    <form>
                        <br />
                        <div className='modal-action'>
                            <button type='button' className='btn' onClick={handleModal} >No</button>
                            <button type='button' className='btn btn-error' >Yes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Edit