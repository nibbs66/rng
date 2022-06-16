import styles from '../../styles/admin/Chart2.module.css'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {useState} from "react";
import useToggle from "../hooks/useToggle";
const initialValue = {id: 'WebShop', color: '#8884d8'};

const Chart2 = () => {
    const [view, setView] = useState(initialValue);
    const [singleChart, setSingleChart] = useToggle()

    const handleClick = (data) => {
        if (!singleChart) {
            setView({id: data.id, color: data.color})
            setSingleChart()
        } else {
            setView({id: data.id, color: data.color})
        }
    };

    const data = [
        { name: "January", WebShop: 1200, Rentals: 3000, Cursus: 2200, Service: 1800},
        { name: "February", WebShop: 2100, Rentals: 500, Cursus: 3000, Service: 2500},
        { name: "March", WebShop: 800, Rentals: 2400,Cursus: 300, Service: 600 },
        { name: "April", WebShop: 1600, Rentals: 300, Cursus: 1300, Service: 2300},
        { name: "May", WebShop: 900, Rentals: 1200, Cursus: 500, Service: 1500},
        { name: "June", WebShop: 1700, Rentals: 950, Cursus: 900, Service: 1100},
    ];


    return (
        <div className={styles.chart}>
            <div className={styles.title}>Last 6 Months(Revenue)
                <button className={styles.webButton}  onClick={()=>handleClick({id: 'WebShop', color: '#8884d8'})}>WebShop</button>
                <button className={styles.rentalButton} onClick={()=>handleClick({id: 'Rentals', color: '#82ca9d'})}>Rentals</button>
                <button className={styles.cursButton} onClick={()=>handleClick({id: 'Cursus', color: '#2dc6d3'})}>Cursus</button>
                <button className={styles.serviceButton} onClick={()=>handleClick({id: 'Service', color: '#6e7b8f'})}>Service</button>
                <button className={styles.resetButton} onClick={()=>(
                    setSingleChart(),
                        setView(initialValue)

                )}>Reset</button>

            </div>
            <ResponsiveContainer width="100%" aspect={4/1}>
                <AreaChart width={730} height={250} data={data}
                           margin={{ top: 10, right: 30, left: 0, bottom: 0 }} >
                    <defs>
                        <linearGradient  id={view.id}   x1="0" y1="0" x2="0" y2="1" >
                            <stop offset="5%" stopColor={view.color} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={view.color} stopOpacity={0}/>
                        </linearGradient>
                        { !singleChart && (<><linearGradient id="Rentals" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                            <linearGradient id="Cursus"   x1="0" y1="0" x2="0" y2="1" >
                                <stop offset="5%" stopColor="#2dc6d3" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#2dc6d3" stopOpacity={0}/>

                            </linearGradient>
                            <linearGradient id="Service"   x1="0" y1="0" x2="0" y2="1" >
                            <stop offset="5%" stopColor="#6e7b8f" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#6e7b8f" stopOpacity={0}/>

                            </linearGradient></>)
                        }

                    </defs>
                    <XAxis dataKey="name" stroke="lightslategray"/>

                    <CartesianGrid strokeDasharray="3 3" className='chartGrid' />
                    <Tooltip />
                    <Area type="monotone" dataKey={view.id} stroke={view.color} fillOpacity={1}  fill={`url(#${view.id})`}/>
                    {!singleChart && <><Area type="monotone" dataKey="Rentals" stroke="#82ca9d" fillOpacity={1} fill="url(#Rentals)"/>
                        <Area type="monotone" dataKey="Cursus" stroke="#2dc6d3" fillOpacity={1} fill="url(#Cursus)" />
                        <Area type="monotone" dataKey="Service" stroke="#6e7b8f" fillOpacity={1} fill="url(#Service)" /></>}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart2;
