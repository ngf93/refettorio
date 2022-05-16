import React, { useContext, useState } from 'react'
import { Context } from "../index"
import { Link, NavLink } from "react-router-dom"
import { HOME_ROUTE, PROFILE_ROUTE, DELIVERY_ROUTE, ABOUT_ROUTE, POLICY_ROUTE, CART_ROUTE, FAVORITES_ROUTE, CATALOG_ROUTE, TERMS_ROUTE, OFFER_ROUTE } from "../utils/consts"
import { observer } from "mobx-react-lite"
import { login, registration, newPassword } from "../http/userAPI"
import InputMask from 'react-input-mask'
import { NotificationManager } from 'react-notifications'

const Footer = observer(() => {
    const { user, cart, product } = useContext(Context)
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [isRegistarion, setIsRegistarion] = useState(false)
    const [isNewPassword, setIsNewPassword] = useState(false)
    const [viewPass, setViewPass] = useState(false)
    const viewPassword = () => setViewPass(!viewPass)
    const formLogin = async (e) => {
        try {
            e.preventDefault()
            if (!phone || phone.length < 10 || !password || password.length < 4) {
                NotificationManager.error('Введите номер телефона и пароль')
                return;
            }
            let data = await login(phone, password)

            if (data) {
                NotificationManager.success('Вы успешно авторизовались')
                user.setUser(data)
                user.setIsAuth(true)
                window.location.reload()
            } else {
                NotificationManager.error('Неверно введен номер телефона или пароль')
            }
        } catch (e) {
            NotificationManager.error(e.response.data.message)
        }
    }
    const formReg = async (e) => {
        try {
            e.preventDefault()
            if (!phone || phone.length < 10) {
                NotificationManager.error('Введите номер телефона')
                return;
            }
            let data = await registration(phone)
            if (data) {
                setIsRegistarion(true)
            } else {
                NotificationManager.error('Неверно введен номер телефона или пароль')
            }
        } catch (e) {
            NotificationManager.error(e.response.data.message)
        }
    }
    const formNewPassword = async (e) => {
        try {
            e.preventDefault()
            if (!phone || phone.length < 10) {
                NotificationManager.error('Введите номер телефона')
                return;
            }
            let data = await newPassword(phone)

            if (data) {
                setIsNewPassword(true)
            } else {
                NotificationManager.error('Такого пользователя не существует')
            }
        } catch (e) {
            console.log(e.response.data)
            NotificationManager.error(e.response.data.message)
        }
    }
    return (
        <>
            <footer className="d-none d-md-block">
                <div className='container'>
                    <div className='row'>
                        <div className='col-3'>
                            <div className='mb-4'>@{(new Date().getFullYear())} REFETTORIO</div>
                            <ul className='list-unstyled primary'>
                                <li className='mb-1'><Link to={POLICY_ROUTE}>Политика конфиденциальности</Link></li>
                                <li className='mb-1'><Link to={OFFER_ROUTE}>Договор оферты</Link></li>
                                <li><Link to={TERMS_ROUTE}>Правила оплаты</Link></li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <nav className='w-100'>
                                <ul className='list-unstyled w-100'>
                                    <li><a href="">Меню</a></li>
                                    <li><a href="">О нас</a></li>
                                    <li><a href="">Вакансии</a></li>
                                    <li><a href="">Доставка и оплата</a></li>
                                </ul>
                            </nav>
                            <ul className='list-unstyled payment mt-4'>
                                <li>
                                    <img src="/images/payment/alpha.png" alt="Альфа-банк"/>
                                </li>
                                <li>
                                    <img src="/images/payment/visa.png" alt="visa"/>
                                </li>
                                <li>
                                    <img src="/images/payment/mastercard.png" alt="mastercard"/>
                                </li>
                                <li>
                                    <img src="/images/payment/mir.png" alt="мир"/>
                                </li>
                                <li>
                                    <img src="/images/payment/verified-by-visa.png" alt="verified by visa"/>
                                </li>
                                <li>
                                    <img src="/images/payment/securecode.png" alt="mastercard securecode"/>
                                </li>
                                <li>
                                    <img src="/images/payment/miraccept.png" alt="mir accept"/>
                                </li>
                            </ul>
                        </div>
                        <div className='col-3 text-end'>
                            <div className='mb-2'><a href='tel:+78432920292'>+7 (843) 292-0-292</a></div>
                            <div className='d-flex align-items-center justify-content-end'>
                                <span>Наши социальные сети:</span>
                                <a href="https://www.instagram.com/arome_kzn/" className="social ms-3" target="_blank">
                                    <img src="/images/icons/insta.svg" alt="instagram" />
                                </a>
                            </div>
                            <a href="http://asmpromo.ru/" alt="Создание и продвижение сайтов" title="Создание и продвижение сайтов" target="_blank" className='asm mt-5'>
                                <span>Создание и продвижение сайтов</span>
                                <img src="/images/asm_white.png" alt="asm" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-4 col-xl-3">
                            <div className="row gx-2 gx-lg-4">
                                <div className="col-6">
                                    <nav>
                                        <ul>
                                            {
                                                product.category.map(item => (<li><Link to={CATALOG_ROUTE + '/' + item.id}>{item.title}</Link></li>))
                                            }
                                        </ul>
                                    </nav>
                                </div>
                                <div className="col-6">
                                    <nav>
                                        <ul>
                                            <li><Link to={ABOUT_ROUTE}>О нас</Link></li>
                                            <li><Link to={DELIVERY_ROUTE}>Доставка и оплата</Link></li>
                                            <li><Link to={POLICY_ROUTE}>Политика конфиденциальности</Link></li>
                                            <li><Link to={TERMS_ROUTE}>Пользовательское соглашение</Link></li>
                                            <li><Link to={OFFER_ROUTE}>Публичная оферта</Link></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-xl-3 text-center d-flex flex-column justify-content-between">
                            <div className="mb-3 mb-lg-0">
                                <Link to={HOME_ROUTE} className="d-inline-block mb-2 mb-lg-4"><img src="/images/footerlogo.svg" alt="Totos" className="img-fluid footer-logo" /></Link>
                                <div>© 2021</div>
                            </div>
                            <div>
                                <div className="sec-font mb-2 mb-lg-3">Мы в социальных сетях:</div>
                                <div className="d-flex justify-content-center">
                                    <a href="https://www.instagram.com/totospizza.ru/" className="social" target="_blank">
                                        <img src="/images/icons/instagram.svg" alt="" />
                                    </a>
                                    <a href="https://vk.com/totospizza" className="social" target="_blank">
                                        <img src="/images/icons/vk.svg" alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-xl-3 d-flex flex-column justify-content-between">
                            <div>
                                <div className="sec-font d-flex align-items-start">
                                    Ямашева 97 ТЦ “XL” (+7 843 226-80-60) Гвардейская 33 (+7 843 226-80-06)
                                </div>
                            </div>
                            <div>
                                <a href="http://asmpromo.ru/" alt="Создание и продвижение сайтов"
                                    title="Создание и продвижение сайтов" target="_blank"
                                    className="d-flex justify-content-end align-items-center">
                                    <div className="sec-font text-end">Создание и продвижение сайтов</div>
                                    <img src="/images/asm.svg" alt="" className="ms-3" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div> */}
            </footer>

            <footer className="mobile d-flex d-md-none">
                <Link to={HOME_ROUTE} className="link">
                    <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 7.1125L21.25 12.7375V22.5H18.75V15H11.25V22.5H8.75V12.7375L15 7.1125ZM15 3.75L2.5 15H6.25V25H13.75V17.5H16.25V25H23.75V15H27.5L15 3.75Z" />
                    </svg>
                </Link>
                {
                    (user.isAuth) ?
                        <Link to={PROFILE_ROUTE} className="btn-svg ms-3 link ms-3 d-block d-lg-none">
                            <svg viewBox="0 0 38 39" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 19.5C20.8897 19.5 22.7019 18.7296 24.0381 17.3582C25.3743 15.9869 26.125 14.1269 26.125 12.1875C26.125 10.2481 25.3743 8.38814 24.0381 7.01678C22.7019 5.64542 20.8897 4.875 19 4.875C17.1103 4.875 15.2981 5.64542 13.9619 7.01678C12.6257 8.38814 11.875 10.2481 11.875 12.1875C11.875 14.1269 12.6257 15.9869 13.9619 17.3582C15.2981 18.7296 17.1103 19.5 19 19.5ZM23.75 12.1875C23.75 13.4804 23.2496 14.7204 22.3588 15.6346C21.468 16.5489 20.2598 17.0625 19 17.0625C17.7402 17.0625 16.532 16.5489 15.6412 15.6346C14.7504 14.7204 14.25 13.4804 14.25 12.1875C14.25 10.8946 14.7504 9.65459 15.6412 8.74035C16.532 7.82611 17.7402 7.3125 19 7.3125C20.2598 7.3125 21.468 7.82611 22.3588 8.74035C23.2496 9.65459 23.75 10.8946 23.75 12.1875ZM33.25 31.6875C33.25 34.125 30.875 34.125 30.875 34.125H7.125C7.125 34.125 4.75 34.125 4.75 31.6875C4.75 29.25 7.125 21.9375 19 21.9375C30.875 21.9375 33.25 29.25 33.25 31.6875ZM30.875 31.6778C30.8726 31.0781 30.5093 29.2744 28.899 27.6217C27.3505 26.0325 24.4364 24.375 19 24.375C13.5612 24.375 10.6495 26.0325 9.101 27.6217C7.49075 29.2744 7.12975 31.0781 7.125 31.6778H30.875Z"></path>
                            </svg>
                        </Link>
                        :
                        <Link data-bs-toggle="modal" data-bs-target="#entrance" className="btn-svg ms-3 link ms-3 d-block d-lg-none">
                            <svg viewBox="0 0 38 39" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 19.5C20.8897 19.5 22.7019 18.7296 24.0381 17.3582C25.3743 15.9869 26.125 14.1269 26.125 12.1875C26.125 10.2481 25.3743 8.38814 24.0381 7.01678C22.7019 5.64542 20.8897 4.875 19 4.875C17.1103 4.875 15.2981 5.64542 13.9619 7.01678C12.6257 8.38814 11.875 10.2481 11.875 12.1875C11.875 14.1269 12.6257 15.9869 13.9619 17.3582C15.2981 18.7296 17.1103 19.5 19 19.5ZM23.75 12.1875C23.75 13.4804 23.2496 14.7204 22.3588 15.6346C21.468 16.5489 20.2598 17.0625 19 17.0625C17.7402 17.0625 16.532 16.5489 15.6412 15.6346C14.7504 14.7204 14.25 13.4804 14.25 12.1875C14.25 10.8946 14.7504 9.65459 15.6412 8.74035C16.532 7.82611 17.7402 7.3125 19 7.3125C20.2598 7.3125 21.468 7.82611 22.3588 8.74035C23.2496 9.65459 23.75 10.8946 23.75 12.1875ZM33.25 31.6875C33.25 34.125 30.875 34.125 30.875 34.125H7.125C7.125 34.125 4.75 34.125 4.75 31.6875C4.75 29.25 7.125 21.9375 19 21.9375C30.875 21.9375 33.25 29.25 33.25 31.6875ZM30.875 31.6778C30.8726 31.0781 30.5093 29.2744 28.899 27.6217C27.3505 26.0325 24.4364 24.375 19 24.375C13.5612 24.375 10.6495 26.0325 9.101 27.6217C7.49075 29.2744 7.12975 31.0781 7.125 31.6778H30.875Z"></path>
                            </svg>
                        </Link>
                }
                <Link to={CART_ROUTE} className="btn-svg position-relative link">
                    <svg viewBox="0 0 41 41" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.4997 3.84375C16.9813 3.84375 14.0934 6.73169 14.0934 10.25V11.5312H7.7666L7.68716 12.7331L6.40591 35.7956L6.3252 37.1562H34.6728L34.5934 35.7943L33.3122 12.7318L33.2314 11.5312H26.9059V10.25C26.9059 6.73169 24.018 3.84375 20.4997 3.84375ZM20.4997 6.40625C21.5191 6.40625 22.4968 6.81122 23.2176 7.53206C23.9384 8.2529 24.3434 9.23057 24.3434 10.25V11.5312H16.6559V10.25C16.6559 9.23057 17.0609 8.2529 17.7817 7.53206C18.5026 6.81122 19.4802 6.40625 20.4997 6.40625ZM10.1689 14.0938H14.0934V17.9375H16.6559V14.0938H24.3434V17.9375H26.9059V14.0938H30.8304L31.9515 34.5938H9.04913L10.1689 14.0938Z" />
                    </svg>
                    {(cart.cart.length > 0) && <div className="count">{cart.cart.length}</div>}
                </Link>
                <button className="btn-svg ms-3 link btn-svg-2 ms-3 d-block d-lg-none" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#right-menu">
                    <svg viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.125 16.5H28.875" />
                        <path d="M4.125 8.25H28.875" />
                        <path d="M4.125 24.75H28.875" />
                    </svg>
                </button>
            </footer>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="right-menu">
                <div className="offcanvas-header">
                    <Link to={HOME_ROUTE} className="logo"><img src='/images/logo.svg' alt="Totos" /></Link>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas">
                    </button>
                </div>
                <div className="offcanvas-body">
                    <nav>
                        <ul data-bs-dismiss="offcanvas">
                            <li><Link to={HOME_ROUTE}>Главная</Link></li>
                            <li><NavLink to={HOME_ROUTE}>Акции</NavLink></li>
                            <li><NavLink to={DELIVERY_ROUTE}>Доставка и оплата</NavLink></li>
                            <li><NavLink to={DELIVERY_ROUTE}>Контакты</NavLink></li>
                            <li><NavLink to={ABOUT_ROUTE}>О нас</NavLink></li>
                            <li><NavLink to={FAVORITES_ROUTE}>Избранное</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <div className="offcanvas-footer">
                    <div className="py-3 d-block d-md-none text-center">
                        <div className="mb-2">
                            Ямашева 97 ТЦ “XL” (+7 843 226-80-60)
                        </div>
                        <div className="mb-2">
                            Гвардейская 33 (+7 843 226-80-06)
                        </div>
                    </div>
                </div>
            </div>

            <div id="cookie" className="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                <p className="gray-1 lh-15 mb-4">Мы используем файлы cookie, чтобы помочь персонализировать контент, адаптировать и оценивать рекламу, а также повысить безопасность. Оставаясь на этом веб-сайте, вы соглашаетесь на использование файлов cookie в соответствии с нашей Политикой использования файлов cookie.</p>
                <div className="d-flex">
                    <button type="button" className="btn btn-1">Согласен</button>
                    <button type="button" className="btn gray-3 ms-sm-4" data-bs-dismiss="toast" aria-label="Закрыть">Закрыть окно</button>
                </div>
            </div>

            {(!user.isAuth) &&
                <>
                    <div className="modal fade" id="entrance" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <button type="button" className="btn-close" data-bs-dismiss="modal">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 6L6 18" />
                                        <path d="M6 6L18 18" />
                                    </svg>
                                </button>
                                <div className="modal-body">
                                    <h5 className="text-center mb-4 mb-md-5">Вход</h5>
                                    <form onSubmit={formLogin}>
                                        <div className="mb-2 mb-md-3">Номер телефона</div>
                                        <InputMask mask="+7 999 999 99 99" placeholder="+7 000 000 00 00" maskChar="" className="mb-3 mb-md-4" defaultValue={phone} onChange={e => setPhone(e.target.value)} />
                                        <div className="mb-2 mb-md-3">Пароль</div>
                                        <div className="password mb-3 mb-md-4">
                                            <input type={viewPass ? 'text' : 'password'} name="password" autoComplete="current-password" minLength="4" maxLength="50" placeholder="Пароль" data-state="invisible" onChange={e => setPassword(e.target.value)} />
                                            <button type="button" data-state={viewPass ? 'visible' : 'invisible'} onClick={viewPassword} className="pass_btn" ></button>
                                        </div>
                                        <div className="d-flex flex-column flex-sm-row align-items-center my-4 my-md-5">
                                            <button type="submit" className="btn btn-1 px-5 py-sm-3 me-sm-3 me-md-4 mb-3 mb-sm-0">Войти</button>
                                            <button type="button" className="blue" data-bs-toggle="modal" data-bs-target="#new-password" data-bs-dismiss="modal">Забыли пароль?</button>
                                        </div>
                                        <div className="d-flex flex-wrap align-items-center">
                                            <span>У вас ещё нет учётной записи?</span>
                                            <button type="button" className="blue ms-1" data-bs-toggle="modal" data-bs-target="#registration" data-bs-dismiss="modal">Регистрация</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="registration" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <button type="button" className="btn-close" data-bs-dismiss="modal">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 6L6 18" />
                                        <path d="M6 6L18 18" />
                                    </svg>
                                </button>
                                <div className="modal-body">
                                    {
                                        (isRegistarion) ?
                                            <>
                                                <h5 className="text-center">Войдите в свой профиль</h5>
                                                <div className="text-center mb-3 mb-md-5">На номер {phone} выслано СМС-сообщение с данными для входа.</div>
                                                <div className="d-flex justify-content-center">
                                                    <button type="button" className="blue ms-1" data-bs-toggle="modal" data-bs-target="#entrance" data-bs-dismiss="modal">Войти в профиль</button>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <h5 className="text-center mb-4 mb-md-5">Регистрация</h5>
                                                <form onSubmit={formReg}>
                                                    <div className="mb-2 mb-md-3">Номер телефона</div>
                                                    <InputMask mask="+7 999 999 99 99" placeholder="+7 000 000 00 00" maskChar="" className="mb-3 mb-md-4" defaultValue={phone} onChange={e => setPhone(e.target.value)} />
                                                    <button type="submit" className="btn btn-1 py-sm-3 mb-4 mb-md-5">Зарегистрироваться</button>
                                                    <div className="d-flex flex-wrap align-items-center">
                                                        <span>У вас уже есть учётная запись?</span>
                                                        <button type="button" className="blue ms-1" data-bs-toggle="modal" data-bs-target="#entrance" data-bs-dismiss="modal">Вход</button>
                                                    </div>
                                                </form>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="new-password" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <button type="button" className="btn-close" data-bs-dismiss="modal">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 6L6 18" />
                                        <path d="M6 6L18 18" />
                                    </svg>
                                </button>
                                <div className="modal-body">
                                    {
                                        (isNewPassword) ?
                                            <>
                                                <h5 className="text-center">Восстановление пароля</h5>
                                                <div className="text-center mb-3 mb-md-5">На номер {phone} выслано СМС-сообщение с новыми данными для входа.</div>
                                                <div className="d-flex justify-content-center">
                                                    <button type="button" className="blue ms-1" data-bs-toggle="modal" data-bs-target="#entrance" data-bs-dismiss="modal">Войти в профиль</button>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <h5 className="text-center mb-4 mb-md-5">Восстановить пароль</h5>
                                                <form onSubmit={formNewPassword}>
                                                    <div className="mb-2 mb-md-3">Номер телефона</div>
                                                    <InputMask mask="+7 999 999 99 99" placeholder="+7 000 000 00 00" maskChar="" className="mb-3 mb-md-4" defaultValue={phone} onChange={e => setPhone(e.target.value)} />
                                                    <div className="d-flex flex-column flex-sm-row align-items-center my-2 my-md-2">
                                                        <button type="submit" className="btn btn-1 px-4 py-sm-3 me-sm-3 me-md-3 mb-3 mb-sm-0">Восстановить</button>
                                                        <button type="button" className="blue" data-bs-toggle="modal" data-bs-target="#entrance" data-bs-dismiss="modal">Вспомнили пароль?</button>
                                                    </div>
                                                </form>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
})

export default Footer
