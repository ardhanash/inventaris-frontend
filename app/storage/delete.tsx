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

const Delete = () => {

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
                <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" fill="#F40000" />
            </svg>
            </button>

            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box" style={{ height: 200 }}>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModal}>✕</button>
                    </form>

                    <h3 className="font-bold text-lg">Are you sure to delete? </h3>
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

export default Delete