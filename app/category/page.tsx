'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import SideBar from '../dashboard/sidebar'
import axios from 'axios'
import TambahKategori from './create'
import DeleteKategori from './delete'
import { useRouter } from 'next/navigation'
import EditKategori from './edit'

interface Item {
    id: number;
    category: string;
}

const CategoryTable: React.FC = () => {

    const [data, setData] = useState<Item[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3333/category');
                const result = await response.json();
                console.log('Fetched data:', result); // Log data yang diambil
                setData(result.response); // Atur state dengan array dari properti 'response'
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const router = useRouter();

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:3333/category/destroy/${id}`);
            router.refresh();
            console.log(response.data);
            window.location.reload();

        } catch (error) {
            console.error('Gagal menghapus data:', error);
        }

        console.log('Menghapus item dengan ID:', id);
    };

    const handleUpdateData = async (id: number) => {
        console.log('item yg mau di edit :', id)
    }

    return (
        <div>
            <SideBar />
            <div className="drawer drawer-end" style={{ boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', width: '73%', height: '100vh', position: 'absolute', right: 0 }} >

                <div className="overflow-x-auto">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <h1 style={{ fontSize: 30, fontWeight: 'bold', padding: 30 }} >Category</h1>
                        <TambahKategori />
                    </div>

                    <div style={{ margin: 30 }} >

                        {loading && <span className="loading loading-bars loading-lg" style={{ position: 'fixed', left: '60%', top: '60%', backgroundColor: '#3559E0' }} ></span>}
                        {data && Array.isArray(data) ? (
                            <table className="table table-zebra w-full">

                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Kategori</th>

                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index} >
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.category}</td>
                                            <td>
                                                <div style={{ display: 'flex', gap: 10 }} >
                                                    <DeleteKategori id={item.id} category={item.category} onDelete={handleDelete} />
                                                    <EditKategori
                                                        id={item.id}
                                                        category={item.category}
                                                        onUpdate={handleUpdateData} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        ) : (
                            <p>Loading data...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CategoryTable

