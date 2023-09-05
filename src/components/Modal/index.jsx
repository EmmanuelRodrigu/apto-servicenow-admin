import React from 'react';
import ReactDOM from "react-dom";
import classNames from 'classnames/bind';
import styles from './styles.module.css';
const cx = classNames.bind(styles);
const modal = document.querySelector("#modal");

export default ({
    isOpen,
    actionOpenOrClose,
    size = 'large',
    title = null,
    description = null,
    children,
}) =>
    isOpen
        ? ReactDOM.createPortal(
            <div className={cx('wrapper', isOpen == true ? 'active' : '')}>
                <div
                    className={cx(
                      'modal',
                      'justify-center',
                      'items-center',
                      'grid',
                      'overflow-x-hidden',
                      'overflow-y-auto',
                      'fixed',
                      'inset-0',
                      'z-50',
                      'my-6',
                      'p-5'
                  )}
                    onClick={() => {
                        actionOpenOrClose(false);
                    }}
                >
                    <div
                        className={cx('content', size, 'relative', 'max-w-full')}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <div className="border-0 rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-12">
                            <button
                                className={cx('close', 'outline-none', 'focus:outline-none')}
                                onClick={() => {
                                    actionOpenOrClose(false);
                                }}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11.1726 10.0056L19.7458 1.43242C20.0767 1.11285 20.0858 0.585581 19.7663 0.254693C19.4467 -0.0761956 18.9194 -0.0853707 18.5885 0.234195C18.5816 0.240881 18.5748 0.247714 18.568 0.254693L9.9948 8.82787L1.42161 0.254644C1.09072 -0.064922 0.56345 -0.0557469 0.243884 0.275141C-0.0678737 0.597928 -0.0678737 1.10963 0.243884 1.43242L8.81707 10.0056L0.243884 18.5788C-0.0812947 18.904 -0.0812947 19.4313 0.243884 19.7565C0.569112 20.0816 1.09639 20.0816 1.42161 19.7565L9.9948 11.1833L18.568 19.7565C18.8989 20.0761 19.4262 20.0669 19.7457 19.736C20.0574 19.4132 20.0574 18.9015 19.7457 18.5788L11.1726 10.0056Z"
                                        fill="black"
                                    />
                                </svg>
                            </button>
                            {title != null && (
                                <h1 className="text-center font-bold mb-6">{title}</h1>
                            )}
                            {description != null && (
                                <p
                                    className="text-center mx-auto mb-6"
                                    dangerouslySetInnerHTML={{ __html: description }}
                                ></p>
                            )}
                            {children}
                        </div>
                    </div>
                </div>
                <div className="opacity-50 fixed inset-0 z-50 bg-black"></div>
            </div>, modal) : null


