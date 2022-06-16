import React from 'react';
import styles from "../../styles/admin/Datatable.module.css";
import Link from "next/link";

const TableHeader = ({title, cat}) => {
    console.log(title)
    return (
        <>
            {title && <div className={styles.datatableTitle}>
                {cat === 'order' && <>Order Number:  </>}
                {title[0].toUpperCase() + title.substring(1)}
                {cat !== 'order' && cat !== 'orders' && <Link href={`/admin/new/${cat}`} passHref>
                    <span className={styles.link}>Add New</span>
                </Link>}
            </div>}

        </>
    );
};

export default TableHeader;
