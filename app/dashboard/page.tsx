import React from 'react'
import styles from './styles.module.css'
import SideBar from './sidebar'
import Link from 'next/link'

const Dashboard = () => {
    return (

        <div>
            <SideBar />
            <div className="artboard" style={{ boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', width: '73%', height: '100vh', position: 'absolute', right: 0 }} >
                <h1 style={{ fontSize: 30, paddingLeft: 20, paddingTop: 20 }} >Menu</h1>
                <div style={{ paddingTop: 120, gridAutoColumns: 'auto auto', gap: 40, marginLeft: 50 }} >
                    <div className="card bg-base-70 shadow-xl" style={{ width: 160, height: 160 }} >
                        <div className="card-body items-center text-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V8.725C2.7 8.54167 2.45833 8.30417 2.275 8.0125C2.09167 7.72083 2 7.38333 2 7V4C2 3.45 2.19583 2.97917 2.5875 2.5875C2.97917 2.19583 3.45 2 4 2H20C20.55 2 21.0208 2.19583 21.4125 2.5875C21.8042 2.97917 22 3.45 22 4V7C22 7.38333 21.9083 7.72083 21.725 8.0125C21.5417 8.30417 21.3 8.54167 21 8.725V20C21 20.55 20.8042 21.0208 20.4125 21.4125C20.0208 21.8042 19.55 22 19 22H5ZM5 9V20H19V9H5ZM4 7H20V4H4V7ZM9 14H15V12H9V14Z" fill="#2B2B2B" />
                            </svg>
                            <h2 className="card-title">Storage</h2>
                        </div>
                    </div>
                    <div className="card bg-base-70 shadow-xl" style={{ width: 160, height: 160 }} >
                        <div className="card-body items-center text-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V8.725C2.7 8.54167 2.45833 8.30417 2.275 8.0125C2.09167 7.72083 2 7.38333 2 7V4C2 3.45 2.19583 2.97917 2.5875 2.5875C2.97917 2.19583 3.45 2 4 2H20C20.55 2 21.0208 2.19583 21.4125 2.5875C21.8042 2.97917 22 3.45 22 4V7C22 7.38333 21.9083 7.72083 21.725 8.0125C21.5417 8.30417 21.3 8.54167 21 8.725V20C21 20.55 20.8042 21.0208 20.4125 21.4125C20.0208 21.8042 19.55 22 19 22H5ZM5 9V20H19V9H5ZM4 7H20V4H4V7ZM9 14H15V12H9V14Z" fill="#2B2B2B" />
                            </svg>
                            <h2 className="card-title">Ruang</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Dashboard
