'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import SideBar from '../dashboard/sidebar'
import axios from 'axios'

interface Item {
    id: number;
    category: string;
    // Add other properties as needed
}

const CategoryTable: React.FC = () => {

    // const [storage, setStorage] = useState([]);

    // const [data, setData] = useState<Item[] | null>(null);
    const [data, setData] = useState<Item[]>([]);
    // const [categorys, setCategory] = useState<Categorys[] | null>(null);
    // const [ruangs, setRuang] = useState<Ruangs[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3333/category');
                const result = await response.json();
                console.log('Fetched data:', result); // Log data yang diambil
                setData(result.response); // Atur state dengan array dari properti 'response'
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };

        fetchData();
    }, []);


    console.log(data)

    return (
        <div>
            <SideBar />
            <div className="drawer drawer-end" style={{ boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', width: '73%', height: '100vh', position: 'absolute', right: 0 }} >

                <div className="overflow-x-auto">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <h1 style={{ fontSize: 30, fontWeight: 'bold', padding: 30 }} >Category</h1>

                    </div>

                    <input type="text" placeholder="Search" className="input input-bordered w-full max-w-xs" style={{ marginLeft: 30, height: 30, boxShadow: 'none' }} />

                    <div style={{ margin: 30 }} >


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

