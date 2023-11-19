import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.css';

const cx = classNames.bind(styles);

export default function Splash() {
    return (
        <div className={cx('loader-spin')}>
            <div className={cx('content')}>
                <div
                    className={`${cx(
                        'loader'
                    )} ease-linear rounded-full border-4 border-t-4 
                      h-12 w-12 mb-1 text-green-external-1
                      `}
                ></div>

                <div className={cx('wrapper', 'font-medium')}>
                    <h4>CARGANDO...</h4>
                </div>
            </div>
        </div>
    );
}