import React, { useState, useEffect } from 'react'
import Tooltip from 'rc-tooltip';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import 'rc-tooltip/assets/bootstrap.css';
export default function Submenu({
    index,
    sidebar,
    title = [],
    children = [],
    activeInitial = false }) {
    const [isActive, setIsActive] = useState(activeInitial);

    useEffect(() => {
        setIsActive(activeInitial);
    }, [activeInitial])
    return (
        <>
            <div className={`submenu ${isActive ? 'submenu-open' : ''}`}>
                <div className="submenu-header" onClick={() => setIsActive(!isActive)}>
                    {sidebar ? (
                        <>
                            {title.map((value, ind) => (
                                <span
                                    key={`${ind}-title`}
                                    className={ind == 1 ? 'text' : ''}
                                >
                                    {value}
                                </span>
                            ))}
                        </>
                    ) : (
                        <>
                            <Tooltip
                                key={`${index}-Tooltip-Submenu`}
                                placement="right"
                                overlay={[
                                    title[1],
                                    <div className="sidebar-menu-tooltip">
                                        {children.map((value, ind) => (
                                            <span key={`${ind}-Tooltip-subItemLink`}>{value}</span>
                                        ))}
                                    </div>,
                                ]}
                            >
                                {title[0]}
                            </Tooltip>
                        </>
                    )}
                    <div className='arrow'>{isActive ? <FaAngleUp size={16} color="#ffffff" /> : <FaAngleDown size={16} color="#ffffff" />}</div>
                </div>
            </div>
            {isActive && <div className="submenu-content">
                {sidebar && (
                    <>
                        {children.map((value, ind) => (
                            <span key={`${ind}-subItemLink`}>{value}</span>
                        ))}
                    </>
                )}
            </div>}
        </>
    );
}
