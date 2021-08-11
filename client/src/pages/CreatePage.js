import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const { request } = useHttp()
    const [link, setLink] = useState(null)

    useEffect( () => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async (e) => {
        if (e.charCode === 13) {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input placeholder="Вставьте ссылку"
                           id="link"
                           type="text"
                           value={link}
                           onChange={e => setLink(e.target.value)}
                           onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    )
}