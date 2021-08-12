import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import {LinksList} from "../components/LinksList";

export const LinksPage = () => {
    const { token } = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [links, setLinks] = useState([])

    const fetchLinks = useCallback( async () => {
        const fetchedLinks = await request('/api/link', 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        setLinks(fetchedLinks)
    }, [request, token])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && <LinksList links={links} />}
        </>
    )
}