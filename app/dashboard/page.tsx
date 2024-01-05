import React from 'react'
import styles from './styles.module.css'
import SideBar from './sidebar'
import Link from 'next/link'

const Dashboard = () => {
    return (
        <div>
            <SideBar />
            <div className="artboard" style={{ boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', width: '73%', height: '100vh', position: 'absolute', right: 0 }} >
                <h1 style={{ fontSize: 30, paddingLeft: 50, paddingTop: 20 }} >Dashboard</h1>

                <div className='grid grid-rows-3 grid-flow-col gap-5' style={{ margin: 50 }} >
                    <div className='row-span-3' style={{ backgroundColor: '#FFFFFF', borderRadius: 15, color: '#2B2B2B', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }}>
                        <Link href={'storage'}>
                            <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', top: '50%', left: '14%', gap: 10 }} >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                    <path d="M5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V8.725C2.7 8.54167 2.45833 8.30417 2.275 8.0125C2.09167 7.72083 2 7.38333 2 7V4C2 3.45 2.19583 2.97917 2.5875 2.5875C2.97917 2.19583 3.45 2 4 2H20C20.55 2 21.0208 2.19583 21.4125 2.5875C21.8042 2.97917 22 3.45 22 4V7C22 7.38333 21.9083 7.72083 21.725 8.0125C21.5417 8.30417 21.3 8.54167 21 8.725V20C21 20.55 20.8042 21.0208 20.4125 21.4125C20.0208 21.8042 19.55 22 19 22H5ZM5 9V20H19V9H5ZM4 7H20V4H4V7ZM9 14H15V12H9V14Z" fill="#2B2B2B" />
                                </svg>
                                Storage
                            </div>
                        </Link>
                    </div>
                    <div className='col-span-2' style={{ height: 130, backgroundColor: '#3559E0', borderRadius: 15, color: 'white', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }} >
                        <Link href={'ruang'}>

                            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 50, gap: 10 }} >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 19H6V11H18V19H20V8.35L12 5.15L4 8.35V19ZM2 21V7L12 3L22 7V21H16V13H8V21H2ZM9 21V19H11V21H9ZM11 18V16H13V18H11ZM13 21V19H15V21H13Z" fill="#FFFFFF" />
                                </svg>
                                Ruang
                            </div>
                        </Link>
                    </div>
                    <div className='row-span-2 col-span-2' style={{ backgroundColor: '#FFFFFF', borderRadius: 15, color: '#2B2B2B', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }} >
                        <Link href={'category'}>

                            <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', top: '65%', left: '59%', gap: 10 }} >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.5 11L12 2L17.5 11H6.5ZM17.5 22C16.25 22 15.1875 21.5625 14.3125 20.6875C13.4375 19.8125 13 18.75 13 17.5C13 16.25 13.4375 15.1875 14.3125 14.3125C15.1875 13.4375 16.25 13 17.5 13C18.75 13 19.8125 13.4375 20.6875 14.3125C21.5625 15.1875 22 16.25 22 17.5C22 18.75 21.5625 19.8125 20.6875 20.6875C19.8125 21.5625 18.75 22 17.5 22ZM3 21.5V13.5H11V21.5H3ZM17.5 20C18.2 20 18.7917 19.7583 19.275 19.275C19.7583 18.7917 20 18.2 20 17.5C20 16.8 19.7583 16.2083 19.275 15.725C18.7917 15.2417 18.2 15 17.5 15C16.8 15 16.2083 15.2417 15.725 15.725C15.2417 16.2083 15 16.8 15 17.5C15 18.2 15.2417 18.7917 15.725 19.275C16.2083 19.7583 16.8 20 17.5 20ZM5 19.5H9V15.5H5V19.5ZM10.05 9H13.95L12 5.85L10.05 9Z" fill="#2B2B2B" />
                                </svg>
                                Category
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
