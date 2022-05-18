import React, { useContext, useEffect, useState } from 'react'
import MetaTags from 'react-meta-tags'
import ProductList from "../components/ProductList"
import { observer } from "mobx-react-lite"
import { Context } from "../index"
import Radio from "./../components/Radio"
import DopList from "./../components/DopList"
import { Modal, CloseButton } from "react-bootstrap"
import { useParams, useHistory, Link } from "react-router-dom"
import { fetchProducts, fetchOneProduct } from "../http/productAPI"
import { HOME_ROUTE } from "../utils/consts"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper'

SwiperCore.use([Navigation, Pagination])

const Home = observer(() => {
    const { product, cart } = useContext(Context)
    const { productId, catalogId } = useParams()
    const [dop, setDop] = useState(false)
    const [show, setShow] = useState(true)
    const [btnAdd, setBtnAdd] = useState({ status: false, count: 1 })
    const dataCart = cart.checkCart(product)
    const [count, setCount] = useState((dataCart) ? dataCart.count : 0)
    const [updateState, setUpdateState] = useState(false)
    const history = useHistory()
    const handleClose = () => history.push(HOME_ROUTE)
    const [android, setAnd] = useState(false)
    const [ios, setIOS] = useState(false)
    const [review, setReview] = useState(false)

    const addCart = () => {
        cart.setCart(product.product)
        setBtnAdd(cart.checkCart(product.product))
    }

    useEffect(() => {
        if (catalogId) {
            let selectCategory = product.category.find(el => el.id == catalogId)
            if (selectCategory) {
                product.setSelectedCategory(selectCategory)
            }
        } else {
            fetchProducts().then(data => {
                product.setProducts(data)
            })
        }
    }, [product.page, product.selectedCategory, product.category])

    useEffect(() => {
        if (productId) {
            fetchOneProduct(productId).then(data => {
                if (data) {
                    if (data.product.attribute && data.product.attribute[1]) {
                        setDop(data.product.attribute[1])
                    }
                    product.setProduct(data.product)
                }
            })
        }
    }, [productId])

    const plusCount = (product) => {
        cart.setCartCountPlus(product)
        setUpdateState(!updateState)
    }
    const minusCount = (product) => {
        cart.setCartCountMinus(product)
        setUpdateState(!updateState)
    }
    const changeCount = (e) => {
        console.log(e.nativeEvent.target.value)
        setCount(e.nativeEvent.target.value)
        cart.setCartCount(product, e.nativeEvent.target.value)
        setUpdateState(!updateState)
    }
    return (
        <>
            {
                (productId) &&
                <>
                    <MetaTags>
                        <title>{product.product.title}</title>
                        <meta name="description" content={product.product.title} />
                        <meta property="og:title" content={product.product.title} />
                        <meta property="og:image" content={process.env.REACT_APP_API_URL + '/' + product.product.image} />
                    </MetaTags>
                    <Modal show={show} onHide={handleClose} dialogClassName="modal-90w product-modal">
                        <CloseButton aria-label="Hide" onClick={handleClose} />
                        <Modal.Body>
                            {
                                product.product ?
                                    <div className="short-info row">
                                        <div className="col-md-5">
                                            <div className="img-prod mb-5 mb-md-0">
                                                {(product.product.image) ? <img className="w-100" src={process.env.REACT_APP_API_URL + '/products/' + product.product.image} alt={product.product.title} /> : null}
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h1 className="h2 fw-6 mb-0">{product.product.title}</h1>
                                                {
                                                    <div className="fs-14 fw-5 text-secondary">{product.product.weight * 1000} г</div>
                                                }
                                            </div>
                                            <div className="text-secondary fs-14 mb-4"><span className="me-2">{(product.product.mini_description) ? product.product.mini_description : (product.product.description) ? product.product.description : 'Нет состава'}</span></div>
                                            <div className="d-flex flex-row justify-content-between align-items-center">
                                                {
                                                    (product.product.attribute && product.product.attribute[0]) && <Radio />
                                                }
                                                <div className="sec-font ms-2 mb-3 ms-sm-4">
                                                    <div className="fs-20 fw-5">{product.product.price} ₽</div>
                                                    {(product.product.sale > 0) && <div className="gray-3 text-decoration-line-through align-middle me-1 me-md-0 ms-1">{product.product.sale} ₽</div>}
                                                </div>
                                            </div>
                                            {
                                                (dop) ?
                                                    <>
                                                        <h5 className="fw-6">Дополнительные ингредиенты:</h5>
                                                        <div className="dop-scroll">
                                                            <DopList product={product.product} dop={dop} />
                                                        </div>
                                                    </>
                                                    : <div className="dop-scroll"></div>
                                            }
                                            <div className="d-flex flex-row align-items-center  mt-4">
                                                <div className="d-none d-md-flex justify-content-between align-items-center">
                                                    <button type="button" onClick={addCart} className="btn btn-1 fs-12 px-4 px-sm-5">{(btnAdd.status) ? 'Добавлено' : 'В корзину'}</button>
                                                </div>
                                                <div className="position-fixed d-md-none py-3">
                                                    <button type="button" onClick={addCart} className="btn btn-1 w-100 fs-12 px-4 px-sm-5">{(btnAdd.status) ? 'Добавлено за ' + product.product.price + '₽' : 'В корзину за ' + product.product.price + '₽'}</button>
                                                </div>
                                                {
                                                    cart.getCartProductCount(product.product) ?
                                                        <div className="input-box ms-3">
                                                            <button type="button" onClick={() => minusCount(product.product)}>
                                                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M5 12H19" />
                                                                </svg>
                                                            </button>
                                                            <input type="number" placeholder="1" value={cart.getCartProductCount(product.product)} min={1} className="fs-12 fw-5" readOnly={true} />
                                                            <button type="button" onClick={() => plusCount(product.product)}>
                                                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12 4.99992V18.9999" />
                                                                    <path d="M5 12H19" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    : <div className="loading loading-absolute"><img src="/images/loader.png" /></div>
                            }
                        </Modal.Body>
                    </Modal>
                </>
            }
            <main>
                <section className='sec-1'>
                    <Swiper
                        loop={true}
                        slidesPerView={1}
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                        className="swiper-main"
                    >
                        <SwiperSlide className='position-relative'>
                            <img src="/images/main-slider/slide1.jpg" alt="" className='slide-bg'/>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <h1>Пиццерия Refettorio!</h1>
                                        <p className='fs-15 mb-2'>Дорогие гости!</p>
                                        <p className='fs-15 mb-3'>Мы возвращаем скидку в заведении по будням с 12 до 15 - 20%.</p>
                                        <ul className='list-unstyled fs-13 ps-3 mb-3'>
                                            <li>! Скидка на день рождения остаётся прежней -15%;</li>
                                            <li>! Скидка по карте гостя остаётся прежней -10%;</li>
                                            <li>! Скидка на самовывоз-10%.</li>
                                        </ul>
                                        <p className='fs-15'>С уважением Ваша REFETTORIO!</p> 
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='position-relative'>
                            <img src="/images/main-slider/slide2.jpg" alt="" className='slide-bg'/>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <h2>Вы можете скачать наше мобильное приложение</h2>
                                        <p className='fs-15 mb-2'>Наше приложение на доставку уже появилось в GOOGLE PLAY и APP STORE*</p>
                                        <div className='d-flex justify-content-center justify-content-md-start text-center mt-4'>
                                            <figure className='position-relative'>
                                                <img src="/images/qr-1.jpeg" alt="Android"/>
                                                <figcaption className='mt-2'><a className='stretched-link' onClick={()=>setAnd(true)}>Android</a></figcaption>
                                            </figure>
                                            <figure className='position-relative ms-4'>
                                                <img src="/images/qr-2.jpeg" alt="IOS"/>
                                                <figcaption className='mt-2'><a className='stretched-link' onClick={()=>setIOS(true)}>IOS</a></figcaption>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </section>

                <section className="sec-2 mb-8 mt-4 mt-md-5">
                    <div className="container">
                        <h2>Мы предлагаем ознакомиться с нашим меню</h2>
                        <div className='d-lg-flex flex-lg-row-reverse align-items-center justify-content-between'>
                            <div className='text-lg-end ms-lg-5 mb-3 mb-lg-0'>ГОТОВОЕ БЛЮДО МОЖЕТ ОТЛИЧАТЬСЯ ОТ БЛЮДА НА ФОТОГРАФИИ</div>
                            <div className='ingredints-sort d-flex align-items-center flex-wrap'>
                                <a href="" className='me-2 me-lg-md-3 mb-2'>
                                    <img src='/images/icons/vegan.png' alt="вегетарианское" className='me-2'/>
                                    вегетарианское
                                </a>
                                <a href="" className='me-2 me-lg-3 mb-2'>
                                    <img src='/images/icons/seafood.png' alt="рыбы" className='me-2'/>
                                    рыбы
                                </a>
                                <a href="" className='me-2 me-lg-3 mb-2'>
                                    <img src='/images/icons/spicy.png' alt="острое" className='me-2'/>
                                    острое
                                </a>
                                <a href="" className='me-2 me-lg-3 mb-2'>
                                    <img src='/images/icons/chicken.png' alt="курица" className='me-2'/>
                                    курица
                                </a>
                                <a href="" className='me-2 me-lg-2 mb-2'>
                                    <img src='/images/icons/meat.png' alt="мясо" className='me-2'/>
                                    мясо
                                </a>
                            </div>
                        </div>
                    
                        {/* <p style={{textAlign: 'center',margin: 30,fontSize: 18, color: 'red'}}>На сайте ведутся технические работы, заказы принимаем по телефонам: Ямашева 97: +7 843 226-80-60, Гвардейская 33: +7 843 226-80-06</p> */}
                        {/* <div className="card my-4">
                            <div className="card-body text-danger">В данный момент мы не принимаем заказы с сайта. Вы можете сделать заказ по номерам 226-80-06 (Гвардейская 33) или 226-80-60 (Ямашева 97)</div>
                        </div> */}
                        {
                            product.selectedCategory && product.selectedCategory.title ?
                                <h1 className="h3 fw-6 mb-4 text-center text-md-start">{product.selectedCategory.title}</h1>
                                : ''
                        }

                        <ProductList />
                    </div>
                </section>

                <section id="sec-12" className='mb-5'>
                    <div className='container'>
                        <h2>Спецпредложения и акции</h2>
                        <Swiper
                            className='classic-arrows pb-5'
                            loop={true}
                            slidesPerView={1}
                            spaceBetween={10}
                            modules={[Navigation, Pagination]}
                            pagination={{ 
                                clickable: true,
                                type: 'fraction'
                             }}
                            navigation
                            breakpoints={{
                                576: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                992: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                                1200: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                }
                            }}
                        >
                            <SwiperSlide>
                                <div className='promotion'>
                                    <img src="/images/img1.jpeg" alt="Время ланча"/>
                                    <div className='promo-info'>
                                        <div className='title'><div>Время ланча</div></div>
                                        <div>С&nbsp;понедельника по&nbsp;пятницу с&nbsp;12&nbsp;до&nbsp;15 скидка&nbsp;15% на&nbsp;все&nbsp;меню по&nbsp;кухне</div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='promotion'>
                                    <img src="/images/img2.jpeg" alt="Дарим скидку 10% на заказ с собой"/>
                                    <div className='promo-info'>
                                        <div className='title'><div>Дарим скидку 10% на заказ с собой</div></div>
                                        <div>Закажите ароматную пиццу и другие блюда итальянской кухни.</div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='promotion'>
                                    <img src="/images/img3.jpeg" alt="Отмечай День рождения вместе с нами!"/>
                                    <div className='promo-info'>
                                        <div className='title'><div>Отмечай День рождения вместе с нами!</div></div>
                                        <div>Дарим скидку -15% на все меню по кухне.</div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    
                    <Swiper
                        loop={true}
                        slidesPerView={1}
                        centeredSlides={true}
                        spaceBetween={20}
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                            767: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            992: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            }
                        }}
                        className="home-slider swiper-gallery"
                    >
                        <SwiperSlide className="px-2"><img src="/images/home-slide-1.jpg" alt="" className='img-fluid' /></SwiperSlide>
                        <SwiperSlide className="px-2"><img src="/images/home-slide-2.jpg" alt="" className='img-fluid' /></SwiperSlide>
                        <SwiperSlide className="px-2"><img src="/images/home-slide-3.jpg" alt="" className='img-fluid' /></SwiperSlide>
                        <SwiperSlide className="px-2"><img src="/images/home-slide-4.jpg" alt="" className='img-fluid' /></SwiperSlide>
                    </Swiper>
                </section>

                <section id="sec-4">
                    <div className='container'>
                        <h2>Пиццерия «Refettorio» рекомендуют наши гости</h2>
                        <Swiper
                            className='classic-arrows'
                            loop={true}
                            slidesPerView={1}
                            spaceBetween={10}
                            modules={[Navigation, Pagination]}
                            pagination={{ 
                                clickable: true,
                                type: 'fraction'
                             }}
                            navigation
                            breakpoints={{
                                576: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                992: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                }
                            }}
                        >
                            <SwiperSlide>
                                <div className='review'>
                                    <div className='d-flex align-items-center mb-3 mb-sm-4'>
                                        <img src="/images/icons/user2.svg" alt="клиент"/>
                                        <div className='ms-3 fs-13 text-truncate'>Darina Sokolovskaya</div>
                                    </div>
                                    <p className='fs-12'>Хорошее заведение! Все понравилось, еда и приятная атмосфера. Очень вкусная пицца на очень тонком тесте. Вежливый и отзывчивый персонал!</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='review'>
                                    <div className='d-flex align-items-center mb-3 mb-sm-4'>
                                        <img src="/images/icons/user2.svg" alt="клиент"/>
                                        <div className='ms-3 fs-13 text-truncate'>Альберт</div>
                                    </div>
                                    <p className='fs-12'>Добрый день! Наконец-то появилась возможность разместить заказ на сайте. Молодцы! Ждем мобильное приложение!</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='review'>
                                    <div className='d-flex align-items-center mb-3 mb-sm-4'>
                                        <img src="/images/icons/user2.svg" alt="клиент"/>
                                        <div className='flex-1 ms-3 fs-13 text-truncate'>Татьяна</div>
                                    </div>
                                    <p className='fs-12'>Очень любим с семьей ходить в A'ROME! Приятная атмосфера, вкусная еда, доброжелательный персонал. Пицца просто огонь!</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='review'>
                                    <div className='d-flex align-items-center mb-3 mb-sm-4'>
                                        <img src="/images/icons/user2.svg" alt="клиент"/>
                                        <div className='flex-1 ms-3 fs-13 text-truncate'>Лилия</div>
                                    </div>
                                    <p className='fs-12'>После карантина стали даже лучше! Отличная подача, вкусно, порции достаточные, есть гибкая система скидок и акций. Отлично настроили сайт!</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='review'>
                                    <div className='d-flex align-items-center mb-3 mb-sm-4'>
                                        <img src="/images/icons/user2.svg" alt="клиент"/>
                                        <div className='flex-1 ms-3 fs-13 text-truncate'>Юлия</div>
                                    </div>
                                    <p className='fs-12'>Очень вкусная пицца!)</p>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                        <button type="button" onClick={()=>setReview(true)} className='btn btn-1 fs-12 mt-4 mt-sm-5'>Оставить отзыв</button>
                    </div>
                </section>

                <section id="sec-5" className='mb-md-5'>
                    <div className='container py-5'>
                        <div class="row">
                            <div class="col-lg-4 mb-4 mb-lg-0">
                                <h2>Контакты</h2>
                                <div className='fs-12'>
                                    <div className='fw-6 mb-2'>Телефон:</div>
                                    <div className='mb-2'><a href="tel:+78432920292">+7 (843) 292-0-292</a></div>
                                    <div><a href="tel: +79872152215"> +7 (987) 215-22-15</a></div>

                                    <div className='fw-6 mt-4 mb-2'>Время работы:</div>
                                    <div className='mb-2'>Пиццерия открыта ежедневно с&nbsp;10:00 до&nbsp;23:00</div>
                                    <div>Заказы на доставку принимаются ежедневно с&nbsp;10:00 до&nbsp;22:30</div>

                                    <div className='fw-6 mt-4 mb-2'>Адрес:</div>
                                    <div>г.Казань, ул. Театральная д.3</div>

                                    <div className='fw-6 mt-4 mb-2'>Вопросы и&nbsp;предложения:</div>
                                    <div><a href="mailto:Refetorio@yandex.ru">Refetorio@yandex.ru</a></div>
                                </div>
                            </div>
                            <div class="col-lg-8 map">
                                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A3fc00c6449a118eb4c90e7d11a3b4a6759d15f3188120b09ab509d7ad83df91b&amp;source=constructor" width="100%" height="100%" frameborder="0"></iframe>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            {/* Modal */}
            <Modal size="lg" show={android} onHide={()=>setAnd(false)}>
                <Modal.Body>
                    <img src="/images/qr-1.jpeg" alt="Android" className='img-fluid'/>
                </Modal.Body>
                <CloseButton aria-label="Hide" onClick={()=>setAnd(false)} className="position-absolute top-1 right-1"/>
            </Modal>
            <Modal size="lg" show={ios} onHide={()=>setIOS(false)}>
                <Modal.Body>
                    <img src="/images/qr-2.jpeg" alt="IOS" className='img-fluid'/>
                </Modal.Body>
                <CloseButton aria-label="Hide" onClick={()=>setIOS(false)} className="position-absolute top-1 right-1"/>
            </Modal>
            <Modal show={review} onHide={()=>setReview(false)}>
                <Modal.Body>
                    <form>
                        <h3>Оставить отзыв</h3>
                        <p className='fs-12 mb-4'>Напишите отзыв о нашей работе или продукции</p>
                        <div className='row g-3'>
                            <div className='col-6'>
                                <input type='text' placeholder='Имя'/>
                            </div>
                            <div className='col-6'>
                                <input type='tel' placeholder='Номер телефона'/>
                            </div>
                            <div className='col-12'>
                                <textarea rows='3' placeholder='Комментарий'></textarea>
                            </div>
                        </div>
                        <button type="submit" className='btn btn-1 fs-12 mt-4'>Отправить</button>
                    </form>
                </Modal.Body>
                <CloseButton aria-label="Hide" onClick={()=>setReview(false)} className="position-absolute top-1 right-1"/>
            </Modal>
        </>
    );
});

export default Home;