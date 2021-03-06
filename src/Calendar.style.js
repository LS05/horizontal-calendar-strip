import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    calendarContainer: {
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    datesStrip: {
        flexDirection: 'row'
    },
    calendarDates: {
        flex: 1,
        flexDirection: 'row',
    },
    calendarHeader: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    dateContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: 50,
        height: 50,
        borderRadius: 50 / 2
    },
    dateName: {
        fontSize: 10,
        textAlign: 'center'
    },
    dateNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    weekendDateNumber: {
        fontSize: 18,
        color: '#A9A9A9',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    disabledStyle: {
        color: '#d3d3d3'
    },
});
