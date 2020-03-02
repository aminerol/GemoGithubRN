import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, ViewPropTypes} from 'react-native'
import propTypes from 'prop-types';

export const RefreshState = {
    Idle: 0,
    HeaderRefreshing: 1,
    FooterRefreshing: 2,
    NoMoreData: 3,
    Failure: 4,
    EmptyData: 5,
    LoadingData: 6
}

export default class InfiniteFlatList extends PureComponent {

    onHeaderRefresh = () => {

        if (this.shouldStartHeaderRefreshing()) {
            this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
        }
    }

    onFooterRefresh = () => {

        if (!this.onEndReachedCalledDuringMomentum) {
            this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing);
            this.onEndReachedCalledDuringMomentum = true;
        }
    }

    onScroll = ({nativeEvent}) => {
        let previousOffsetY = 0;
        if (this.nativeEvent) {
            previousOffsetY = this.nativeEvent.contentOffset.y;
        }
        const offsetY = nativeEvent.contentOffset.y;

        if ((offsetY - previousOffsetY) > 0 && offsetY >= (nativeEvent.contentSize.height + nativeEvent.contentInset.bottom - nativeEvent.layoutMeasurement
            .height)) {
            if (this.shouldStartFooterRefreshing()) {
                this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing);
            }
        }
        this.nativeEvent = nativeEvent;
    }

    shouldStartHeaderRefreshing = () => {

        if (this.props.refreshState === RefreshState.HeaderRefreshing ||
            this.props.refreshState === RefreshState.FooterRefreshing) {
            return false
        }

        return true
    }

    shouldStartFooterRefreshing = () => {

        let {refreshState, data} = this.props
        if (data.length === 0) {
            return false
        }

        return (refreshState === RefreshState.Idle)
    }

    render() {
        this.nativeEvent = null;
        this.isResponder = false;
        let {renderItem, loadingDataText, loadingDataComponent, footerEmptyDataText, footerEmptyDataComponent, ...rest} = this.props
        let footerContainerStyle = [styles.footerContainer, this.props.footerContainerStyle]
        let footerTextStyle = [styles.footerText, this.props.footerTextStyle]

        return this.props.refreshState === RefreshState.EmptyData ?
        (
            <TouchableOpacity onPress={() => {
                this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
            }}
            >
                {footerEmptyDataComponent ? footerEmptyDataComponent : (
                <View style={footerContainerStyle}>
                    <Text style={footerTextStyle}>{footerEmptyDataText}</Text>
                </View>
                )}
            </TouchableOpacity>
        ) :
        (
            <FlatList
                ref={this.props.listRef}
                onRefresh={this.onHeaderRefresh}
                refreshing={this.props.refreshState === RefreshState.HeaderRefreshing}
                ListFooterComponent={this.renderFooter}
                renderItem={renderItem}

                onScrollBeginDrag={() => {
                    this.onEndReachedCalledDuringMomentum = false;
                }}
                onMomentumScrollBegin={() => {
                    this.onEndReachedCalledDuringMomentum = false;
                }}
                
                onEndReached={this.onFooterRefresh}

                {...rest}
            />
        )
    }

    renderFooter = () => {
        let footer = null

        let footerContainerStyle = [styles.footerContainer, this.props.footerContainerStyle]
        let footerTextStyle = [styles.footerText, this.props.footerTextStyle]

        let {
            footerRefreshingText,
            footerFailureText,
            footerNoMoreDataText,
            footerEmptyDataText,

            footerRefreshingComponent,
            footerFailureComponent,
            footerNoMoreDataComponent,
            footerEmptyDataComponent,
        } = this.props

        switch (this.props.refreshState) {
            case RefreshState.Idle:
                footer = (<View style={footerContainerStyle} />)
                break
            case RefreshState.Failure: {
                footer = (
                    <TouchableOpacity onPress={() => {
                        if (this.props.data.length == 0) {
                        this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
                        } else {
                        this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
                        }
                    }}
                    >
                        {footerFailureComponent ? footerFailureComponent : (
                        <View style={footerContainerStyle}>
                            <Text style={footerTextStyle}>{footerFailureText}</Text>
                        </View>
                        )}
                    </TouchableOpacity>
                )
                break
            }
            case RefreshState.FooterRefreshing: {
                footer = footerRefreshingComponent ? footerRefreshingComponent : (
                    <View style={footerContainerStyle} >
                        <ActivityIndicator size="small" color="#888888" />
                        <Text style={[footerTextStyle, {marginLeft: 7}]}>{footerRefreshingText}</Text>
                    </View>
                )
                break
            }
            case RefreshState.NoMoreData: {
                footer = footerNoMoreDataComponent ? footerNoMoreDataComponent : (
                    <View style={footerContainerStyle} >
                        <Text style={footerTextStyle}>{footerNoMoreDataText}</Text>
                    </View>
                )
                break
            }
        }

        return footer
    }
}

InfiniteFlatList.propTypes = {

    refreshState: propTypes.number,
    onHeaderRefresh: propTypes.func,
    onFooterRefresh: propTypes.func,
    data: propTypes.array,

    footerContainerStyle: ViewPropTypes.style,
    footerTextStyle: ViewPropTypes.style,

    listRef: propTypes.any,

    footerRefreshingText: propTypes.string,
    footerFailureText: propTypes.string,
    footerNoMoreDataText: propTypes.string,
    footerEmptyDataText: propTypes.string,

    footerRefreshingComponent: propTypes.any,
    footerFailureComponent: propTypes.any,
    footerNoMoreDataComponent: propTypes.any,
    footerEmptyDataComponent: propTypes.any,

    renderItem: propTypes.func,

}

const styles = StyleSheet.create({
    footerText: {
        fontSize: 14,
        color: '#555555'
    }
})