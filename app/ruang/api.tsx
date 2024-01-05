'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import SideBar from '../dashboard/sidebar'
import axios from 'axios'

interface ApiData {
    id: number;
    ruang: string;
}

const ApiRuang: React.FC<{ onDataReceived: (data: ApiData[]) => void }> = ({ onDataReceived }) => {

    const [data, setData] = useState<ApiData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3333/ruang');
                const result = await response.json();
                setData(result.response); 
                onDataReceived(result.response)
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };

        fetchData();
    }, []);

    return (
        <div>

        </div>
    )
}

export default ApiRuang

