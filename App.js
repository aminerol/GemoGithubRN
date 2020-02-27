import React, { useState, useEffect }from 'react'
import { SafeAreaView, Text, View} from 'react-native'

import InfiniteFlatList, { RefreshState } from './components/InfiniteFlatList'
import RepoCell from './components/RepoCell'
import * as API from './services/GithubApi'
var pageNumber = 1;

const App = () => {

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
      console.log(pageNumber)
      setRepos([...repos, ...results])
      inProgressNetworkReq = false
    })
  }
  const handleHeaderScroll = () => setListState(RefreshState.HeaderRefreshing)
  const handleFooterScroll = () => setListState(RefreshState.FooterRefreshing)

  const renderRepoCellItem = ({item}) => <RepoCell repo={item}/>
  const renderFooterOnScroll = () => <Text>Loading Next Repos</Text>
  const renderOnNoMoreData = () => <Text>No More Results</Text>
  const renderonEmptyData = () => <Text>No Repos Found</Text>
  const renderSpereator = () => <View style={{height: 1, backgroundColor: "#CED0CE", marginLeft: 16}}/>

  return (
    <>
      <SafeAreaView>
        <InfiniteFlatList
          data={repos}
          keyExtractor={(item, key) => key + item.id.toString()}
          renderItem={renderRepoCellItem}

          refreshState={listState}
          onHeaderRefresh={handleHeaderScroll}
          onFooterRefresh={handleFooterScroll}

          ItemSeparatorComponent={renderSpereator}
          
        />
      </SafeAreaView>
    </>
  );
};

export default App;
