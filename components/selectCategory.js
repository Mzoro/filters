import React, {Component} from 'react';
import {Platform, Image, Animated, View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Colors from '../assets/colors';

export default class SelectCategory extends Component {
  constructor() {
    super();

    this.renderCategory = this.renderCategory.bind(this);
  }

  renderCategory(item, idx) {
    return (
      <TouchableWithoutFeedback key={idx} onPress={() => this.props.selectCategory(item)}>
        <View style={[styles.textWrapper, {backgroundColor: item === this.props.activeCategory ? Colors.turquoise : 'transparent'}]}>
          <Text style={{fontFamily: "Roboto", fontSize: 20, color: item === this.props.activeCategory ? Colors.white: Colors.darkGray}}>
            {item}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return (
      <Animated.View style={[styles.container, {top: this.props.animatedHeight}]}>
        {Platform.OS === 'ios' ?
          <View style={{height: 20, backgroundColor: Colors.white}}/>
          : null
        }
        <View style={styles.header}>
          <Text style={{fontFamily: "Roboto", fontSize: 18}}>Select Category</Text>
          <TouchableWithoutFeedback onPress={() => this.props.closeSelectCategory()}>
            <Image style={styles.cross} source={require('../assets/img/cross.png')}/>
          </TouchableWithoutFeedback>
        </View>
        <View style={{alignItems: 'flex-start'}}>
          {this.props.categories.map(this.renderCategory)}
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  textWrapper: {
    marginLeft: 10,
    padding: 10,
    paddingRight: 20,
    borderRadius: 25
  },
  cross: {
    height: 15,
    width: 15,
    tintColor: Colors.darkGray
  }
});