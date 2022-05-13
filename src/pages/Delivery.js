import React, { useEffect } from 'react'

const About = () => {
    useEffect(() => {
        document.title = "Доставка и оплата"
    }, [])
    return (
        <main>
            <section id="sec-8" className="mb-8">
                <div className="container">
                    <h1 className="h3 fw-6 mb-4 text-center text-md-start">Доставка и оплата</h1>
                    <div className="row mb-5">
                        <div className="col-md-4">
                            <div id="map">
                                <iframe src="https://www.google.com/maps/d/embed?mid=17lCQLErcNQTUS5rYvyk5pt7kMc84FI5X&ehbc=2E312F" width="100%" height="400"></iframe>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <ul className="ul-style-default">
                                <li>Принятие заказов ежедневно (пн-вс) с 10:00 до 21:00</li>
                                <li>При доставке на расстояние менее 9 км</li>
                                <ul className="my-2 my-md-0">
                                    <li>Минимальный заказ 450 р</li>
                                    <li>Бесплатная достовка при заказе от 700 р</li>
                                </ul>
                                <li>При доставке на расстояние более 9 км</li>
                                <ul className="my-2 my-md-0">
                                    <li>Минимальный заказ 1000 р</li>
                                    <li>Бесплатная достовка при заказе от 1500 р</li>
                                </ul>
                                <li>Среднее время доставки составляет от 45 минут. Максимальное время доставки заказа от 60 до 90 минут.<br />
                                    <a className="text-success fw-6 d-inline-block color-green mt-3">Подробнее о доставке</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h2 className="h3 fw-6 mb-4 text-center text-md-start">Варианты оплаты</h2>
                    <div className="row row-cols-md-3 row-cols-lg-3 mb-5">
                        <div>
                            <div className="text-center card card-body">
                                <h5 className="fw-6 text-center">Курьеру</h5>
                                <div className="d-flex justify-content-center align-items-center mb-3">
                                    <img className="mx-2" src="/images/nal.png" height="35" />
                                    <img className="mx-2" src="/images/visa.png" height="20" />
                                    <img className="mx-2" src="/images/mastercard.png" height="25" />
                                    <img className="mx-2" src="/images/mir.png" height="20" />
                                </div>
                                <p>Наличными или банковской картой через платежный терминал курьеру</p>
                            </div>
                        </div>
                        <div>
                            <div className="text-center card card-body">
                                <h5 className="fw-6 text-center">В ресторане</h5>
                                <div className="d-flex justify-content-center align-items-center mb-3">
                                    <img className="mx-2" src="/images/nal.png" height="35" />
                                    <img className="mx-2" src="/images/visa.png" height="20" />
                                    <img className="mx-2" src="/images/mastercard.png" height="25" />
                                    <img className="mx-2" src="/images/mir.png" height="20" />
                                </div>
                                <p>Наличными или банковской картой через платежный терминал в ресторане</p>
                            </div>
                        </div>
                        <div>
                            <div className="text-center card card-body">
                                <h5 className="fw-6 text-center">На сайте</h5>
                                <div className="d-flex justify-content-center align-items-center mb-3">
                                    <img className="mx-2" src="/images/visa.png" height="20" />
                                    <img className="mx-2" src="/images/mastercard.png" height="25" />
                                    <img className="mx-2" src="/images/mir.png" height="20" />
                                </div>
                                <p>Банковской картой через безопасный платежный сервис веб-сайта</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;
