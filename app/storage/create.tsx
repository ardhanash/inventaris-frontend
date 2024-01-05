"use client";
import { SyntheticEvent, use, useState } from 'react';
import axios from 'axios';
import Item from './page'
import { useRouter } from 'next/navigation';
import RuangTable from '../ruang/page';
import ApiRuang from '../ruang/api';
import ApiCategory from '../category/api';

interface Item {
    Category: {
        id: number;
        category: string;
    }
    Ruang: {
        id: number;
        ruang: string;
    }
}

interface ApiDataRuang {
    id: number;
    ruang: string;
}

interface ApiDataCategory {
    id: number;
    category: string;
}

const Tambah: React.FC = () => {

    const [apiDataRuang, setApiDataRuang] = useState<ApiDataRuang[]>([]);
    const [apiDataCategory, setApiDataCategory] = useState<ApiDataCategory[]>([]);

    const handleDataRuang = (data: ApiDataRuang[]) => {
        setApiDataRuang(data)
    };
    const handleDataCategory = (data: ApiDataCategory[]) => {
        setApiDataCategory(data)
    };

    const [isOpen, setIsOpen] = useState(false);
    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    const router = useRouter();

    const [newData, setNewData] = useState({
        item_code: '',
        item_name: '',
        quantity: 0,
        category_id: 0,
        ruang_id: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value });
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const SelectedOption = e.target.value;
        const { name, value } = e.target;

        setNewData((newData) => ({
            ...newData,
            Category: {
                category_id: SelectedOption,
            },
        }));
        setNewData({ ...newData, [name]: value });
    };

    const handleRuangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const SelectedOption = e.target.value;
        const { name, value } = e.target;

        setNewData((newData) => ({
            ...newData,
            Ruang: {
                ruang_id: SelectedOption,
            },
        }));
        setNewData({ ...newData, [name]: value });
    };

    const handleAddData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3333/storage/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
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
                <div className="modal-box" style={{ height: 500 }}>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModal}>✕</button>
                    </form>

                    <h1 style={{ fontWeight: 'bold' }} >Tambah Data</h1>
                    <form >
                        <div className='form-control w-full'>
                            <label className='label font-bold' >Kode</label>
                            <input
                                type="text"
                                placeholder="Kode"
                                name='item_code'
                                onChange={handleInputChange}
                                className="input input-bordered" />
                        </div>

                        <div className='form-control w-full'>
                            <label className='label font-bold' >Barang</label>
                            <input
                                type="text"
                                placeholder="Barang"
                                name='item_name'
                                onChange={handleInputChange}
                                className="input input-bordered" />
                        </div>

                        <div className='form-control w-full'>
                            <label className='label font-bold' >Stok</label>
                            <input
                                type="number"
                                placeholder="Stok"
                                name='quantity'
                                onChange={handleInputChange}
                                className="input input-bordered" />
                        </div>

                        <div className='form-control w-full' >

                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20 }} >

                                <div className='form-control w-full' >
                                    <label className='label font-bold' >Kategori</label>

                                    <ApiCategory onDataReceived={handleDataCategory} />

                                    <select className='select select-bordered' name='category_id' value={newData.category_id}
                                        onChange={handleCategoryChange}>
                                        <option >
                                            Pilih Kategori
                                        </option>
                                        {apiDataCategory.map((Category, index) => (
                                            <option key={index} value={Category.id} >
                                                {Category.category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className='form-control w-full' >
                                    <label className='label font-bold' >Ruang</label>

                                    <ApiRuang onDataReceived={handleDataRuang} />

                                    <select className='select select-bordered' name='ruang_id' value={newData.ruang_id} onChange={handleRuangChange} >
                                        <option >
                                            Pilih Ruang
                                        </option>
                                        {apiDataRuang.map((Ruang, index) => (
                                            <option key={index} value={Ruang.id} >
                                                {Ruang.ruang}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
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

export default Tambah