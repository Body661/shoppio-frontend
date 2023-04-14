import React from 'react'
import { Link } from 'react-router-dom'

const SectionTitle = ({ title, btnTitle, pathText }) => {
    return (
        <div className="d-flex justify-content-between align-items-center pt-4">
            <div className="section-header-title">{title}</div>
            {btnTitle ? (
                <Link to={`${pathText}`}>
                    <div className="section-header-btn p-1">{btnTitle}</div>
                </Link>
            ) : null}
        </div>
    )
}

export default SectionTitle
