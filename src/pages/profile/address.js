import React, { useContext, useState, createRef, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import { PROFILE_ROUTE, HOME_ROUTE } from "../../utils/consts"
import { Context } from "../../index"
import { addAddress, editAddress, deleteAddress } from "../../http/userAPI"
import { getStreets } from "../../http/orderAPI"
import SideBar from "./components/menu"
import { NotificationManager } from 'react-notifications'

const Address = () => {
    const { action, actionId } = useParams()
    const { user } = useContext(Context)
    const [update, setUpdate] = useState(1)
    const [streets, setStreets] = useState(false)
    const [address, setAddress] = useState(
        (user.user.address && user.user.address.find(ids => ids.id == actionId)) ? user.user.address.find(ids => ids.id == actionId)
            :
            {
                name: '', full: '', street: '', home: '', entrance: '', code: '', floor: '', apartment: '',
            })
            
    useEffect(() => {
        document.title = "Мои адреса"
        getStreets().then(data => setStreets(data))
    }, [])
    
    const deleteSubmit = async (id) => {
        try {
            let data;
            data = await deleteAddress(id);
            if (data) {
                NotificationManager.success('Адрес успешно удален');
                user.setUser(data)
                setUpdate(update + 1)
            }
        } catch (e) {
            if (e.response && e.response.data) {
                NotificationManager.error(e.response.data.message);
            } else {
                NotificationManager.error(e);
            }
        }
    }
    const change = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value })
    }
    const changeAddress = (data) => {
        if (data) {
            setAddress({
                ...address,
                full: (data.value) ? data.value : '',
                street: (data.data.street_with_type) ? data.data.street_with_type : '', //Улица
                home: (data.data.house) ? data.data.house : '', //Дом
                entrance: (data.data.entrance) ? data.data.entrance : '', //Подъезд
                apartment: (data.data.flat) ? data.data.flat : '' //Квартира
            })
        }
    }
    if (action == 'add') {
        const submit = async (e) => {
            try {
                e.preventDefault()
                if (!address) {
                    NotificationManager.error('Заполните обязательные поля')
                    return
                }
                if (address.street.length < 1) {
                    NotificationManager.error('Заполните поле Улица')
                    return
                }
                if (address.home.length < 1) {
                    NotificationManager.error('Заполните поле Дом')
                    return
                }
                if (address.apartment.length < 1) {
                    NotificationManager.error('Заполните поле Квартира')
                    return
                }
                let data;
                data = await addAddress(address);
                if (data) {
                    NotificationManager.success('Адрес успешно добавлен')
                    setAddress({})
                    user.setUser(data)
                }
            } catch (e) {
                if (e.response && e.response.data) {
                    NotificationManager.error(e.response.data.message)
                } else {
                    NotificationManager.error(e)
                }
            }
        }

        return (
            <main>
                <section id="sec-13" className="mb-8">
                    <div className="container">
                        <div className="row">
                            <SideBar />
                            <div className="col-md-8 col-xl-7 col-xxl-6 offset-xl-1">
                                <form onSubmit={submit} className="mb-4 mb-sm-5">
                                    <h5 className="gray-1">Добавить адрес</h5>
                                    <div className="gray-1 mb-2">Название адреса</div>
                                    <input type="text" name="name" placeholder="Например, Работа" className="mb-3" onChange={change} />

                                    <div className="row">
                                        <div className="col-10 mb-4">
                                            <div className="gray-1 mb-2">Улица <span className="text-danger">*</span></div>
                                            <input type="text" list="streets" name="street" autoComplete="off" placeholder="Улица" onChange={change} value={address.street}/>
                                            <datalist id="streets">
                                                {
                                                (streets) ? 
                                                    streets.rows.map((item, key) =>
                                                      <option key={key} value={item.title} />
                                                    )
                                                    : <option key={0} value="Введите улицу" />
                                                }
                                            </datalist>
                                        </div>
                                        <div className="col-2 mb-4">
                                            <div className="gray-1 mb-2">Дом <span className="text-danger">*</span></div>
                                            <input type="text" name="home" placeholder="Дом" onChange={change} value={address.home} />
                                        </div>
                                        <div className="col-3 mb-4">
                                            <div className="gray-1 mb-2">Квартира <span className="text-danger">*</span></div>
                                            <input type="text" name="apartment" placeholder="Квартира" onChange={change} value={address.apartment} />
                                        </div>
                                        <div className="col-3 mb-4">
                                            <div className="gray-1 mb-2">Подъезд</div>
                                            <input type="text" name="entrance" placeholder="Подъезд" onChange={change} value={address.entrance} />
                                        </div>
                                        <div className="col-3 mb-4">
                                            <div className="gray-1 mb-2">Этаж</div>
                                            <input type="text" name="floor" placeholder="Этаж" onChange={change} value={address.floor} />
                                        </div>
                                        <div className="col-3 mb-4">
                                            <div className="gray-1 mb-2">Код двери</div>
                                            <input type="text" name="code" placeholder="Код двери" onChange={change} value={address.code} />
                                        </div>
                                        <div className="mb-3"><span className="text-danger">*</span> - поля обязательные для заполнения</div>
                                    </div>

                                    <button type="submit" className="btn btn-2">Сохранить</button>
                                </form>
                                <Link to={PROFILE_ROUTE + '/address'} className="gray-3 d-flex align-items-center">
                                    <img src="/images/icons/chevron-left.svg" alt="Вернуться назад" className="me-1" />
                                    Вернуться назад
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    } else if (action == 'edit' && actionId) {
        const submit = async (e) => {
            try {
                e.preventDefault()
                if (!address) {
                    NotificationManager.error('Заполните обязательные поля')
                    return
                }
                if (address.street.length < 1) {
                    NotificationManager.error('Заполните поле Улица')
                    return
                }
                if (address.home.length < 1) {
                    NotificationManager.error('Заполните поле Дом')
                    return
                }
                if (address.apartment.length < 1) {
                    NotificationManager.error('Заполните поле Квартира')
                    return
                }
                let data;
                data = await editAddress(address);
                if (data) {
                    NotificationManager.success('Адрес успешно обновлен')
                    user.setUser(data)
                }
            } catch (e) {
                if (e.response && e.response.data) {
                    NotificationManager.error(e.response.data.message)
                } else {
                    NotificationManager.error(e)
                }
            }
        }

        return (
            <main>
                <section id="sec-13" className="mb-8">
                    <div className="container">
                        <div className="row">
                            <SideBar />
                            <div className="col-md-8 col-xl-7 col-xxl-6 offset-xl-1">
                                {(address) ?
                                    <form onSubmit={submit} className="mb-4 mb-sm-5">
                                        <h5 className="gray-1">Редактировать адрес</h5>
                                        <div className="gray-1 mb-2">Название адреса</div>
                                        <input type="text" name="name" placeholder="Например, Работа" className="mb-3" onChange={change} value={address.name} />

                                        <div className="row">
                                            <div className="col-sm-10 mb-4">
                                                <div className="gray-1 mb-2">Адрес</div>
                                                <input type="text" list="streets" name="street" autoComplete="off" placeholder="Улица" onChange={change} value={address.street}/>
                                                <datalist id="streets">
                                                    {
                                                    (streets) ? 
                                                        streets.rows.map((item, key) =>
                                                          <option key={key} value={item.title} />
                                                        )
                                                        : <option key={0} value="Введите улицу" />
                                                    }
                                                </datalist>
                                            </div>
                                            <div className="col-2 mb-4">
                                                <div className="gray-1 mb-2">Дом</div>
                                                <input type="text" name="home" placeholder="Дом" onChange={change} value={address.home} />
                                            </div>
                                            <div className="col-3 mb-4">
                                                <div className="gray-1 mb-2">Квартира</div>
                                                <input type="text" name="apartment" placeholder="Квартира" onChange={change} value={address.apartment} />
                                            </div>
                                            <div className="col-3 mb-4">
                                                <div className="gray-1 mb-2">Подъезд</div>
                                                <input type="text" name="entrance" placeholder="Подъезд" onChange={change} value={address.entrance} />
                                            </div>
                                            <div className="col-3 mb-4">
                                                <div className="gray-1 mb-2">Этаж</div>
                                                <input type="text" name="floor" placeholder="Этаж" onChange={change} value={address.floor} />
                                            </div>
                                            <div className="col-3 mb-4">
                                                <div className="gray-1 mb-2">Код двери</div>
                                                <input type="text" name="code" placeholder="Код двери" onChange={change} value={address.code} />
                                            </div>
                                        </div>

                                        <button type="submit" className="btn btn-2">Сохранить</button>
                                    </form>
                                    : <div>Такого адреса нет</div>
                                }
                                <Link to={PROFILE_ROUTE + '/address'} className="gray-3 d-flex align-items-center">
                                    <img src="/images/icons/chevron-left.svg" alt="Вернуться назад" className="me-1" />
                                    Вернуться назад
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    } else {
        return (
            <main>
                <section id="sec-13" className="mb-8">
                    <div className="container">
                        <div className="row">
                            <SideBar />
                            <div className="col-md-8 col-xl-7 col-xxl-6 offset-xl-1">
                                <form action="" className="mb-4 mb-sm-5">
                                    <h5 className="gray-1">Адрес доставки</h5>
                                    {
                                        (user.user.address && user.user.address.length > 0) ?
                                            <>
                                                <div className="fs-09 gray-1 mb-4">Выберите адрес для доставки по умолчанию.</div>
                                                {
                                                    user.user.address.map((item, i) =>
                                                        <div key={i} className="d-flex align-items-start mb-4">
                                                            <input type="radio" name="address" value="Адрес Работа" id={"address-" + i} defaultChecked={(i === 0) ?? true} />
                                                            <div className="ms-2">
                                                                <label for={"address-" + i} className="gray-1 fw-5">{(item.name) ? item.name : item.street}</label>
                                                                <div className="d-flex mt-2">
                                                                    <Link to={PROFILE_ROUTE + '/address/edit/' + item.id} className="fs-09 gray-1 me-3">Редактировать</Link>
                                                                    <button type="button" onClick={() => deleteSubmit(item.id)} className="fs-09 gray-4">Удалить</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </>
                                            : <div className="fs-09 gray-1 mb-4">Добавьте адрес для доставки по умолчанию.</div>
                                    }
                                    <Link to={PROFILE_ROUTE + '/address/add'} className="d-flex align-items-center fw-6">
                                        <img src="/images/icons/plus3.svg" alt="Добавить" className="me-2" />
                                        <span className="primary">Добавить адрес</span>
                                    </Link>
                                </form>
                                <Link to={PROFILE_ROUTE} className="gray-3 d-flex align-items-center">
                                    <img src="/images/icons/chevron-left.svg" alt="Вернуться назад" className="me-1" />
                                    Вернуться назад
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

export default Address
