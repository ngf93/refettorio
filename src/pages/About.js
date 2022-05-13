import React, { useEffect } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

const About = () => {

    useEffect(() => {
        document.title = "О нас"
    }, [])

    return (
        <main>
            <section id="sec-about" className="position-relative mb-8">
                <div className="container">
                    <h1 className="h2 fw-6 mb-4 text-center text-md-start">О нас</h1>
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <div className="about-collage">
                                <img src="/images/about-1.png" alt="Только свежие ингредиенты" id="img-1" className="round-img w-100" />
                            </div>
                        </div>
                        <div className="col-md-8 py-md-5">
                            <div className="fs-15 mb-3"><b>TOTO’S PIZZA</b> - компания и пиццерия, основанная в 2016 году под руководством итальянского Шефа ТОТО, который является главным наставником и вдохновителем кулинарных идей.</div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="sec-about" className="position-relative mb-8">
                <div className="container">
                    <div className="row flex-md-row-reverse align-items-center">
                        <div className="col-md-4 d-md-flex justify-content-end">
                            <div className="about-collage">
                                <img src="/images/about-2.jpg" alt="Только свежие ингредиенты" id="img-1" className="round-img w-100" />
                            </div>
                        </div>
                        <div className="col-md-8 py-md-5">
                            <div className="fs-15 mb-3">Пицца от <b>TOTO'S PIZZA</b> особенная благодаря тесту, которое делается исключительно на оливковом масле первого отжима, муки лучшего качества, при долгой холодной ферментации теста, благодаря чему из него извлекаются вредные сахара и крахмал.</div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="sec-about" className="position-relative mb-8">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <div className="about-collage">
                                <img src="/images/about-3.png" alt="Только свежие ингредиенты" id="img-1" className="round-img w-100" />
                            </div>
                        </div>
                        <div className="col-md-8 py-md-5">
                            <div className="fs-15 mb-3">Высшая награда для команды <b>TOTO'S PIZZA</b> - чтобы наш клиент был доволен сделанным выбором и непременно вернулся к нам за новой порцией своего счастья, ведь быть счастливым – это наслаждаться жизнью в её полном многообразии проявлений, а вкусная еда – одна из них!</div>
                        </div>
                    </div>
                </div>
            </section>
        </main >
    );
};

export default About;
