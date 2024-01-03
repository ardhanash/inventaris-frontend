'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import SideBar from '../dashboard/sidebar'
import axios from 'axios'
import Delete from './delete'
import Edit from './edit'
import Tambah from './create'

interface Item {
    id: number;
    item_code: string;
    item_name: string;
    quantity: number;
    Category: {
        id: number;
        category: string;
    };
    Ruang: {
        id: number;
        ruang: string;
    };
    // Add other properties as needed
}

const StorageTable: React.FC = () => {

    // const [storage, setStorage] = useState([]);

    // const [data, setData] = useState<Item[] | null>(null);
    const [item, setItem] = useState<Item[]>([]);
    // const [categorys, setCategory] = useState<Categorys[] | null>(null);
    // const [ruangs, setRuang] = useState<Ruangs[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3333/storage');
                const result = await response.json();
                console.log('Fetched data:', result); // Log data yang diambil
                setItem(result.response); // Atur state dengan array dari properti 'response'
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };

        fetchData();
    }, []);


    console.log(item)

    return (
        <div>
            <SideBar />
            <div className="drawer drawer-end" style={{ boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', width: '73%', height: '100vh', position: 'absolute', right: 0 }} >

                <div className="overflow-x-auto">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <h1 style={{ fontSize: 30, fontWeight: 'bold', padding: 30 }} >Storage</h1>
                        <Tambah/>
                    </div>

                    <input type="text" placeholder="Search" className="input input-bordered w-full max-w-xs" style={{ marginLeft: 30, height: 30, boxShadow: 'none' }} />
                    
                    <div style={{ margin: 30 }}> 
                    {item && Array.isArray(item) ? (
                        <table className="table table-zebra" style={{ marginTop: 20 }}>

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
                                                <Delete />
                                                <Edit />
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

export default StorageTable

// pages/index.tsx

// import React, { useState, useEffect } from 'react';

// interface Item {
//   item_code: string;
//   item_name: string;
//   // Add other properties as needed
// }

// const Home = () => {
//   const [data, setData] = useState<Item[] | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:3333/storage');
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   console.log('Data type:', typeof data)

//   return (
//     <div>
//       <h1>Next.js API Fetch Example</h1>
//       {data && data.response ? (
//     <ul>
//       {data.response.map((item, index) => (
//         <li key={index}>{JSON.stringify(item, null, 2)}</li>
//       ))}
//     </ul>
//   ) : (
//     <p>Data is not an array.</p>
//   )}

//     </div>
//   );
// };

// export default Home;
