'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import SideBar from '../dashboard/sidebar'
import axios from 'axios'


interface Item {
    id: number;
    ruang: string;
    // Add other properties as needed
}

interface ApiComponentProps {
    onDataReceived: (data: {
            id: number;
            ruang: string;
    }) => void;
  }

const RuangTable: React.FC<ApiComponentProps> = ({ onDataReceived }) => {

    // const [storage, setStorage] = useState([]);

    // const [data, setData] = useState<Item[] | null>(null);
    const [data, setData] = useState<Item[]>([]);
    // const [categorys, setCategory] = useState<Categorys[] | null>(null);
    // const [ruangs, setRuang] = useState<Ruangs[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3333/ruang');
                const result = await response.json();
                setData(result.response); // Atur state dengan array dari properti 'response'
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };

        fetchData();
    }, []);

    return (
        <div>
            <SideBar />
            <div className="drawer drawer-end" style={{ boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', width: '73%', height: '100vh', position: 'absolute', right: 0 }} >

                <div className="overflow-x-auto">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <h1 style={{ fontSize: 30, fontWeight: 'bold', padding: 30 }} >Ruang</h1>
                        
                    </div>

                    <input type="text" placeholder="Search" className="input input-bordered w-full max-w-xs" style={{ marginLeft: 30, height: 30, boxShadow: 'none' }} />
                    
                    <div style={{ margin: 30 }}>
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

