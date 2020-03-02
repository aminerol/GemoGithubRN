import React, { useState, useEffect } from 'react'

import { connect } from "react-redux";

import InfiniteFlatList, { RefreshState } from '../components/InfiniteFlatList'
import RepoCell from '../components/RepoCell'
import Container from '../components/Container'
import * as API from '../services/GithubApi'

const Home = (props) => {

    var pageNumber = 1;
    var inProgressNetworkReq = false
    const [loading, setLoading] = useState(false)
    const [repos, setRepos] = useState([])
    const [listState, setListState] = useState(RefreshState.Idle)

    useEffect(() => {
        fetchData(pageNumber)
    }, [listState])

    const fetchData = (page) => {
            inProgressNetworkReq = true;
            API.searchReposAPI('2020-01-25', 'stars', 'desc', 100, page).then(results => {
            pageNumber = page + 1
            setRepos([...repos, ...results])
            inProgressNetworkReq = false
        })
    }

    const handleHeaderScroll = () => setListState(RefreshState.HeaderRefreshing)
    const handleFooterScroll = () => setListState(RefreshState.FooterRefreshing)
    const renderRepoCellItem = ({item}) => <RepoCell repo={item} theme={props.theme}/>

    return (
        <Container>
            <InfiniteFlatList
                data={repos}
                keyExtractor={(item, key) => key + item.id.toString()}
                renderItem={renderRepoCellItem}

                refreshState={listState}
                onHeaderRefresh={handleHeaderScroll}
                onFooterRefresh={handleFooterScroll}
            />
        </Container>
        
    )
}

const mapStateToProps = state => ({theme: state.themeReducer.theme})
export default connect(mapStateToProps)(Home);

