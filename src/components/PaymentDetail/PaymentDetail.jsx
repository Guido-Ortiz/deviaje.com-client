import React from 'react';
import s from './PaymentDetail.module.css';

function PaymentDetail({ price }) {
    return (
        <div className={s.paymentGrid}>
            <div className={s.payment}>Payment detail</div>
            <div>
                <div className={s.flight}>
                    <div className={s.name}>Flight</div>
                    <div className={s.name}>U$D {price}</div>
                </div>
                <div className={s.flight}>
                    <div className={s.name}>Taxes and fees</div>
                    <div className={s.name}>U$D {(price * .8).toFixed()}</div>
                </div>
                <div className={s.flight}>
                    <div className={s.total}>Total</div>
                    <div className={s.total}>U$D {(price * 1.8).toFixed()}</div>
                </div>
            </div>
        </div>
    );
}

export default PaymentDetail;