'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import SideBar from '../dashboard/sidebar'
import axios from 'axios'
import TambahRuang from './create'
import EditRuang from './edit'
import DeleteRuang from './delete'
import { useRouter } from 'next/navigation'


interface Item {
    id: number;
    ruang: string;
}

interface ApiComponentProps {
    onDataReceived: (data: {
        id: number;
        ruang: string;
    }) => void;
}

const RuangTable: React.FC<ApiComponentProps> = () => {

    const [data, setData] = useState<Item[]>([]);

    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3333/ruang');
                const result = await response.json();
                setData(result.response); // Atur state dengan array dari properti 'response'
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false)
            }

        };

        fetchData();
    }, []);

    const handleUpdateData = async (id: number) => {
        console.log('item yg mau di edit :', id)
    }

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:3333/ruang/destroy/${id}`);
            router.refresh();
            console.log(response.data);
            window.location.reload();

        } catch (error) {
            console.error('Gagal menghapus data:', error);
        }

        console.log('Menghapus item dengan ID:', id);
    };

    return (
        <div>
            <SideBar />
            <div className="drawer drawer-end" style={{ boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', width: '73%', height: '100vh', position: 'absolute', right: 0 }} >

                <div className="overflow-x-auto">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <h1 style={{ fontSize: 30, fontWeight: 'bold', padding: 30 }} >Ruang</h1>
                        <TambahRuang />
                    </div>

                    <div style={{ margin: 30 }}>
                    {loading && <span className="loading loading-bars loading-lg" style={{ position: 'fixed', left: '60%', top: '60%', backgroundColor: '#3559E0' }} ></span>}
                        {data && Array.isArray(data) ? (
                            <table className="table table-zebra" style={{ marginTop: 20 }}>

                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Ruang</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index} >
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.ruang}</td>
                                            <td>
                                                
                                                <div style={{ display: 'flex', gap: 10 }} >
                                                    <DeleteRuang id={item.id} ruang={item.ruang} onDelete={handleDelete} />
                                                    <EditRuang
                                                        id={item.id}
                                                        ruang={item.ruang}
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

export default RuangTable

