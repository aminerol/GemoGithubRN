import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Card from '../components/Card'
import Title from '../components/Title';
import SubTitle from '../components/SubTitle';

const RepoCell = ({repo, theme}) => {

    return (
        <Card>
            <Image source={{ uri: repo.owner.avatar_url }} style={styles.ownerAvatar} />
            <View style={styles.repoDetails}>
                <Title>{repo.full_name}</Title>
                <SubTitle numberOfLines={4}>{repo.description}</SubTitle>
                <View style={styles.stats}>
                    <Icon name="star" size={16} color={theme.primaryText}> {repo.stargazers_count}</Icon>
                    <Icon name="code-fork" size={16} color={theme.primaryText}> {repo.forks_count}</Icon>
                    <Icon name="info-circle" size={16} color={theme.primaryText}> {repo.open_issues_count}</Icon>
                </View>
            </View>
            <Icon name="heart-o" size={26} style={styles.favorite} color={theme.primaryText}/>
        </Card>
    )
}

const styles = StyleSheet.create({
    ownerAvatar: {
        height: 52, 
        width: 52,
        borderRadius: 26
    },
    repoDetails: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 8
    },
    stats: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    starsCount: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    favorite : {
        padding: 8,
        alignSelf: 'center'
    }
})


export default RepoCell
