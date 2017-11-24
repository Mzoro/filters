import React, {Component} from 'react';
import {Image, View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Colors from '../assets/colors';

export default class SubCategory extends Component {
  constructor() {
    super();

    this.state = {
      isActive: false
    };
  }

  componentDidMount() {
    if (this.props.idx === 3 || this.props.idx === 5) {
      this.setState({isActive: true})
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback key={this.props.idx} onPress={() => this.setState({isActive: !this.state.isActive})}>
        <View style={[styles.container, {backgroundColor: this.state.isActive ? Colors.turquoise : Colors.lightGray}]}>
          <Text style={[styles.text, {color: this.state.isActive ? Colors.white : Colors.darkGray}]}>
            {this.props.item}
          </Text>
          {this.state.isActive ?
            <Image style={styles.cross} source={require('../assets/img/cross.png')}/>
            : null
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10, 
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'row', 
    alignItems: 'center',
    borderRadius: 15
  },
  text: {
    fontFamily: "Roboto Light",
    fontSize: 15
  },
  cross: {
    marginLeft: 15,
    height: 15,
    width: 15,
    tintColor: Colors.white
  }
});