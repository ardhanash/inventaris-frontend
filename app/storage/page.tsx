'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import SideBar from '../dashboard/sidebar'
import axios from 'axios'
import Delete from './delete'
import Edit from './edit'
import Tambah from './create'
import { useRouter } from 'next/navigation'
import ApiCategory from '../category/api'

interface Item {
    id: number;
    item_code: string;
    item_name: string;
    quantity: number;
    category_id: number;
    Category: {
        id: number;
        category: string;
    };
    ruang_id: number;
    Ruang: {
        id: number;
        ruang: string;
    };
}

const StorageTable: React.FC<{ onDataReceived: (data: Item[]) => void }> = () => {

    const router = useRouter();

    const [item, setItem] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState({
        search: ''
    });

    // const [apiDataCategory, setApiDataCategory] = useState<ApiDataCategory[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3333/storage');
                const result = await response.json();
                setItem(result.response);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:3333/storage/destroy/${id}`);
            router.refresh();
            console.log(response.data);
            window.location.reload();

        } catch (error) {
            console.error('Gagal menghapus data:', error);
        }
    };

    const handleUpdateData = async (id: number) => { }

    const handleSearch = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3333/storage/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ search: search.search }),
            });

            const result = await response.json();
            setItem(result.response);
            console.log(item)

        } catch (error) {
            console.error('Error fetching search results:', error);
        }
        console.log('hasil search :', search)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearch(item => ({ ...item, [name]: value }));
    };

    return (
        <div>
            <SideBar />
            <div className="drawer drawer-end" style={{ boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', width: '73%', height: '100vh', position: 'absolute', right: 0 }} >
                <div className="overflow-x-auto">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <h1 style={{ fontSize: 30, fontWeight: 'bold', padding: 30 }} >Storage</h1>
                        <Tambah />
                    </div>

                    <form>
                        <div style={{ display: 'flex', gap: 10 }} >
                            <input
                                type="text"
                                name='search'
                                placeholder="Search"
                                value={search.search}
                                onChange={handleInputChange}
                                className="input input-bordered w-full max-w-xs" style={{ marginLeft: 30, height: 48, boxShadow: 'none' }} />

                            <button type='button' className='btn' style={{ backgroundColor: '#3559E0', color: 'white' }} onClick={() => { handleSearch() }} >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" fill="white" />
                                </svg>
                            </button>
                        </div>
                    </form>

                    <div style={{ margin: 30 }}>
                        {loading && <span className="loading loading-bars loading-lg" style={{ position: 'fixed', left: '60%', top: '60%', backgroundColor: '#3559E0' }} ></span>}
                        {item && Array.isArray(item) ? (
                            <table className="table table-zebra" style={{ marginTop: 20, paddingBottom: 20 }}>
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Kode</th>
                                        <th>Barang</th>
                                        <th>Stok</th>
                                        <th>Kategori</th>
                                        <th>Ruang</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.map((item, index) => (
                                        <tr key={index} >
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.item_code}</td>
                                            <td>{item.item_name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.Category.category}</td>
                                            <td>{item.Ruang.ruang}</td>
                                            <td>
                                                <div style={{ display: 'flex', gap: 10 }} >
                                                    <Delete id={item.id} item_name={item.item_name} onDelete={handleDelete} />
                                                    <Edit
                                                        id={item.id}
                                                        item_code={item.item_code}
                                                        item_name={item.item_name}
                                                        quantity={item.quantity}
                                                        category_id={item.category_id}
                                                        ruang_id={item.ruang_id}
                                                        onUpdate={handleUpdateData} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <span className="loading loading-bars loading-lg" style={{ position: 'fixed', left: '60%', top: '50%', backgroundColor: '#3559E0' }} ></span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StorageTable