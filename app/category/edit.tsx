"use client";
import { SyntheticEvent, use, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ApiRuang from '../ruang/api';
import ApiCategory from '../category/api';

interface UpdatePropsEdit {
    id: number;
    category: string;
    onUpdate: (id: number) => void;
}

const EditKategori: React.FC<UpdatePropsEdit> = ({ id, category, onUpdate }) => {

    const [isOpen, setIsOpen] = useState(false);
    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    const [updateData, setUpdateData] = useState({
        category: category,
    });

    // const [apiDataRuang, setApiDataRuang] = useState<ApiDataRuang[]>([]);
    // const [apiDataCategory, setApiDataCategory] = useState<ApiDataCategory[]>([]);

    // const handleDataRuang = (data: ApiDataRuang[]) => {
    //     setApiDataRuang(data)
    // };
    // const handleDataCategory = (data: ApiDataCategory[]) => {
    //     setApiDataCategory(data)
    // };

    // const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const SelectedOption = e.target.value;
    //     const { name, value } = e.target;

    //     setUpdateData((newData) => ({
    //         ...newData,
    //         Category: {
    //             category_id: SelectedOption,
    //         },
    //     }));
    //     setUpdateData({ ...updateData, [name]: value });
    // };

    // const handleRuangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const SelectedOption = e.target.value;
    //     const { name, value } = e.target;

    //     setUpdateData((newData) => ({
    //         ...newData,
    //         Ruang: {
    //             ruang_id: SelectedOption,
    //         },
    //     }));
    //     setUpdateData({ ...updateData, [name]: value });
    // };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdateData({ ...updateData, [name]: value });
    };

    const router = useRouter();

    const handleUpdateData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:3333/category/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (response.status === 404) {
                console.error('Error adding data. Endpoint not found (404).');
            } else if (!response.ok) {
                console.error('Error adding data. Status:', response.status);
            } else {
                const result = await response.json();
                console.log('Parsed Result:', result);
            }
        } catch (error) {
            console.error('Error adding data:', error);
        }

        router.refresh();
        window.location.reload();
        setIsOpen(false);
        onUpdate(id);
        console.log('item yg mau di edit :', id)
    }

    return (
        <div>
            <button onClick={handleModal} >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5.00001C3 4.45001 3.19583 3.97917 3.5875 3.58751C3.97917 3.19584 4.45 3.00001 5 3.00001H13.925L11.925 5.00001H5V19H19V12.05L21 10.05V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM9 15V10.75L18.175 1.57501C18.375 1.37501 18.6 1.22501 18.85 1.12501C19.1 1.02501 19.35 0.975006 19.6 0.975006C19.8667 0.975006 20.1208 1.02501 20.3625 1.12501C20.6042 1.22501 20.825 1.37501 21.025 1.57501L22.425 3.00001C22.6083 3.20001 22.75 3.42084 22.85 3.66251C22.95 3.90417 23 4.15001 23 4.40001C23 4.65001 22.9542 4.89584 22.8625 5.13751C22.7708 5.37917 22.625 5.60001 22.425 5.80001L13.25 15H9ZM11 13H12.4L18.2 7.20001L17.5 6.50001L16.775 5.80001L11 11.575V13Z" fill="#3559E0" />
                </svg>
            </button>

            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box" style={{ height: 250 }}>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModal}>✕</button>
                    </form>

                    <h1 style={{ fontWeight: 'bold' }} >Update Data</h1>
                    <form >
                        <div className='form-control w-full'>
                            <label className='label font-bold' >Kategori</label>
                            <input
                                type="text"
                                placeholder="Kode"
                                name='category'
                                value={updateData.category}
                                onChange={handleInputChange}
                                className="input input-bordered" />
                        </div>
                    </form>

                    <form>
                        <div className='modal-action'>
                            <button type='button' className='btn' onClick={handleModal} >No</button>
                            <button type='button' className='btn btn-error' onClick={handleUpdateData} >Yes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditKategori