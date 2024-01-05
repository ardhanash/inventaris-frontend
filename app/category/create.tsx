"use client";
import { SyntheticEvent, use, useState } from 'react';
import axios from 'axios';
import Item from './page'
import { useRouter } from 'next/navigation';
import RuangTable from '../ruang/page';
import ApiRuang from '../ruang/api';
import ApiCategory from '../category/api';

interface Kategori {
    id: number;
    category: string;
}

const TambahKategori: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);
    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    const router = useRouter();

    const [newKategori, setNewKategori] = useState({
        category: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewKategori({ ...newKategori, [name]: value });
    };

    // const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const SelectedOption = e.target.value;
    //     const { name, value } = e.target;

    //     setNewData((newData) => ({
    //         ...newData,
    //         Category: {
    //             category_id: SelectedOption,
    //         },
    //     }));
    //     setNewData({ ...newData, [name]: value });

    // };

    // const handleRuangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const SelectedOption = e.target.value;
    //     const { name, value } = e.target;

    //     setNewData((newData) => ({
    //         ...newData,
    //         Ruang: {
    //             ruang_id: SelectedOption,
    //         },
    //     }));
    //     setNewData({ ...newData, [name]: value });
    // };

    const handleAddData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3333/category/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newKategori),
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
    };


    return (
        <div>
            <button className='btn' onClick={handleModal} style={{ margin: 30, backgroundColor: '#3559E0', color: 'white' }} >
                + Add Data
            </button>

            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box" style={{ height: 250 }}>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModal}>✕</button>
                    </form>

                    <h1 style={{ fontWeight: 'bold' }} >Tambah Data</h1>
                    <form >
                        <div className='form-control w-full'>
                            <label className='label font-bold' >Ruang</label>
                            <input
                                type="text"
                                placeholder="Kategori"
                                name='category'
                                onChange={handleInputChange}
                                className="input input-bordered" />
                        </div>
                    </form>

                    <form>
                        <div className='modal-action'>
                            <button type='button' className='btn' onClick={handleModal} >No</button>
                            <button type='button' className='btn btn-error' onClick={handleAddData} >Yes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TambahKategori