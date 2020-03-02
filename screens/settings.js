import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Button, View } from 'react-native';
import { changeTheme, changeColorTheme } from "../themes/actions";
import { themes } from '../themes/constants'
import Container from '../components/Container';

const Settings = (props) => {

    return (
        <Container style={{flex: 1, alignContent: 'center', justifyContent: 'center', padding: 16}}>
            <Button title="Change to Dark Mode" onPress={() => props.changeTheme(themes.dark)}></Button>
            <View style={{height: 4}}></View>
            <Button title="Change to Light Mode" onPress={() => props.changeTheme(themes.light)}></Button>
        </Container>
    )
}

const mapStateToProps = state => ({theme: state.themeReducer.theme})
const mapDispatchToProps = dispatch => ({
    changeTheme: bindActionCreators(changeTheme, dispatch),
    changeColorTheme: bindActionCreators(changeColorTheme, dispatch)
  });
export default connect(mapStateToProps, mapDispatchToProps)(Settings);

