import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Animated,
    Easing,
    TouchableOpacity,
    ViewPropTypes
} from 'react-native';
import moment from 'moment';
import styles from './Calendar.style.js';

export default class CalendarDay extends Component {

    static propTypes = {
        date: React.PropTypes.object.isRequired,
        onDateSelected: React.PropTypes.func.isRequired,
        selected: React.PropTypes.bool.isRequired,

        calendarColor: React.PropTypes.string,
        highlightColor: React.PropTypes.string,
        borderHighlightColor: React.PropTypes.string,

        dateNameStyle: React.PropTypes.any,
        dateNumberStyle: React.PropTypes.any,
        weekendDateNameColor: React.PropTypes.any,
        weekendDateNumberColor: React.PropTypes.any,
        highlightDateNameStyle: React.PropTypes.any,
        highlightDateNumberStyle: React.PropTypes.any,
        styleWeekend: React.PropTypes.bool,

        selection: React.PropTypes.string,
        selectionAnimation: React.PropTypes.object,
        disableWeekends: React.PropTypes.bool
    };

    static defaultProps = {
        selection: 'border',
        selectionAnimation: {
            duration: 0,
            borderWidth: 1
        },
        borderHighlightColor: '#000',
        styleWeekend: true,
        disableWeekends: false
    };

    constructor(props) {
        super(props);
        this.animValue = new Animated.Value(0);

        this.isToday = this.isToday.bind(this);
        this.isAfter = this.isAfter.bind(this);
        this.isWeekend = this.isWeekend.bind(this);
        this.distance = -1;
    }

    isWeekend(){
      let dateDay = moment(this.props.date).day();
      if (dateDay === 0 || dateDay === 6) {
        return true;
      } else {
        return false;
      }
    }

    isToday(){
      let date = this.props.date.format('YYYY-MM-DD');
      let now = moment().format('YYYY-MM-DD');
      return moment(now).isSame(date, 'day');
    }

    isAfter(){
      let date = this.props.date.format('YYYY-MM-DD');
      let now = moment().format('YYYY-MM-DD');
      return moment(date).isAfter(now);
    }

    isDayInActiveWeek(){
      let date = moment(this.props.date);
      for(let i = 1; i < 7; i++){
        if(this.isToday()){
          return true;
        } else {
          if(date.day() !== 0){
            date.add(1, 'day');
            if(moment().isSame(date, 'day')){
              return true;
            }
          } else {
            return false;
          }
        }
      }
    }

    isCurrentMonth(){
      let date = moment(this.props.date);
      let now = moment();
      return date.month() === now.month();
    }

    getDistance() {
      return this.distance;
    }

    //When component mounts, if it is seleced run animation for animation show
    componentDidMount() {
      if (this.props.selected) {
          this.animate(1);
      }
      setTimeout(() => {
        if (this.refs.mainButton !== undefined) {
          this.refs.mainButton.measure((fx, fy, width, height, px, py) => {
            this.distance = px;
          });
        }
      }, 0);
    }

    //When component receives the props, if it is selected use showing animation
    //If it is deselected, use hiding animation
    componentWillReceiveProps(nextProps) {
        if (this.props.selected !== nextProps.selected) {
            nextProps.selected ? this.animate(1) : this.animate(0);
        }
    }

    //Animation function for showin/hiding the element.
    //Based on the value passed (either 1 or 0) the animate function is animatin towards that value, hence showin or hiding animation
    animate(toValue) {
        Animated.timing(
            this.animValue,
            {
                toValue: toValue,
                duration: this.props.selectionAnimation.duration,
                easing: Easing.linear
            }
        ).start();
    }

    render() {
        let animValue;
        let animObject;
        //The user can disable animation, so that is why I use selection type
        //If it is background, the user have to input colors for animation
        //If it is border, the user has to input color for border animation
        if (this.props.selection === 'background') {
            animValue = this.animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [this.props.calendarColor, this.props.highlightColor]
            });
            animObject = {backgroundColor: animValue};
        } else {
            if (this.props.selection === 'border') {
                animValue = this.animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, this.props.selectionAnimation.borderWidth]
                });
                animObject = {borderColor: this.props.borderHighlightColor, borderWidth: animValue};
            } else {
                throw new Error('CalendarDay Error! Type of animation is incorrect!');
            }
        }

        let dateNameStyle = [styles.dateName, this.props.dateNameStyle];
        let dateNumberStyle = [styles.dateNumber, this.props.dateNumberStyle];
        if (this.props.date.isoWeekday() === 6 || this.props.date.isoWeekday() === 7) {
          if (this.props.weekendDateNameColor) {
            dateNameStyle.push({
              color: this.props.weekendDateNameColor
            })
          }
          if (this.props.weekendDateNumberColor) {
            dateNumberStyle.push({
              color: this.props.weekendDateNameColor
            })
          }
        }
        if (this.props.selected) {
          dateNameStyle = [styles.dateName, this.props.highlightDateNameStyle];
          dateNumberStyle = [styles.dateNumber, this.props.highlightDateNumberStyle];
        }

        let disabledStyle;
        if (this.props.disableWeekends && this.isWeekend()) {
          disabledStyle = [styles.disabledStyle]
        }

        return (
          <TouchableOpacity ref='mainButton' onPress={this.props.onDateSelected.bind(this, this.props.date)}
            disabled={this.props.disableWeekends && this.isWeekend()}>
            <Animated.View style={[styles.dateContainer, animObject]}>
              <Text style={[dateNameStyle, disabledStyle]}>{this.props.date.format('ddd').toUpperCase()}</Text>
              <Text style={[dateNumberStyle, disabledStyle]}>{this.props.date.date()}</Text>
            </Animated.View>
          </TouchableOpacity>
        );
    }
}
