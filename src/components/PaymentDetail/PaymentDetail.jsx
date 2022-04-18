import React from 'react';
import { useTranslation } from 'react-i18next';
import s from './PaymentDetail.module.css';

function PaymentDetail({ price }) {
    const [t, i18n] = useTranslation('global')
    return (
        <div className={s.paymentGrid}>
            <div className={s.payment}>{t("paymentDetail.det")}</div>
            <div>
                <div className={s.flight}>
                    <div className={s.name}>{t("paymentDetail.vuelo")}</div>
                    <div className={s.name}>U$D {price}</div>
                </div>
                <div className={s.flight}>
                    <div className={s.name}>{t("paymentDetail.imp")}</div>
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