import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

const RepoCell = ({repo}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{repo.name}</Text>
            <Text>{repo.description}</Text>
            <View style={styles.footer}>
                <View style={styles.ownerContainer}>
                    <Image source={{ uri: repo.owner.avatar_url }} style={{ height: 25, width: 30 }} />
                    <Text style={styles.ownerName}>{repo.owner.login}</Text>
                </View>
                <Text style={styles.starsCount}>{`★ ${repo.stargazers_count}`}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 8
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    ownerContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    },
    ownerName: {
        marginLeft: 8,
    },
    starsCount: {
        fontWeight: 'bold',
        fontSize: 15,
    },
})


export default RepoCell
