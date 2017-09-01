import React, {Component} from 'react';
import {
    View,
    Image,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';

class CalendarButton extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor={'white'}
        activeOpacity={0.7}
        onPress={() => { this.props.onPress() }}>
        <View style={styles.button}>
          <Image style={styles.buttonImage} source={this.props.buttonImage}/>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  buttonImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
  },
});

export default CalendarButton;
