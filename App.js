import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Image,
  TextInput,
  Slider,
  ScrollView
} from 'react-native';

import Colors from './assets/colors';
import SelectCategory from './components/selectCategory';
import SubCategory from './components/subCategory';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Categories = ['Hairstylist', 'Makeup Artist', 'Nail Tech', 'Lashes & Eyebrows', 'Spa & Wellness', 'Other'];
const Subcategories = ['Show All', 'Air Brush', 'Body & Face Paint', 'Print & Photoshoots', 'Special Effects', 'Other'];

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      animatedPosition: new Animated.Value(0),
      selectCategoryOn: false,
      activeCategory: 'Makeup Artist',
      searchText: 'Toronto, ON',
      distance: 5
    };
    this.selectCategory = this.selectCategory.bind(this);
    this.closeSelectCategory = this.closeSelectCategory.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.selectCategoryOn && !this.state.selectCategoryOn) {
      Animated.timing(this.state.animatedPosition,
        {
          toValue: 1,
          duration: 300
        }
      ).start();
    }

    if (!nextState.selectCategoryOn && this.state.selectCategoryOn) {
      Animated.timing(this.state.animatedPosition,
        {
          toValue: 0,
          duration: 300
        }
      ).start();
    }    
  }

  closeSelectCategory() {
    this.setState({selectCategoryOn: false})
  }

  selectCategory(category) {
    this.setState({activeCategory: category})
  }

  renderSubcategory(item, idx) {
    return(
      <SubCategory key={idx} idx={idx} item={item}/>
    );
  }

  render() {
    const animatedHeight = this.state.animatedPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [screenHeight, 0]
      });

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' ?
          <View style={{height: 20, backgroundColor: Colors.white}}/>
          : null
        }
        <View style={styles.header}>
          <Image style={{height: 15, width: 15, tintColor: Colors.white}} source={require('./assets/img/cross.png')}/>
          <View style={styles.headerTitle}>
            <Text style={styles.headerText}>38 Results</Text>
            <Text style={styles.headerText}>Clear All</Text>
          </View>
        </View>
        <Image style={{height: 100, width: screenWidth, marginBottom: -5}} source={require('./assets/img/map.png')}/>
        <View style={styles.inputContainer}>
          <Image style={[styles.pin, {marginBottom: Platform.OS === 'ios' ? 3 : 0}]} source={require('./assets/img/pin.png')}/>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({searchText: text})}
            value={this.state.searchText}
            underlineColorAndroid="transparent"
          />
          <Image style={styles.target} source={require('./assets/img/target.png')}/>
        </View>
        <View style={styles.distance}>
          <Text style={{fontFamily: "Roboto Light", fontSize: 15}}>Maximum Distance</Text>
          <Text style={{fontFamily: "Roboto Medium", fontSize: 15}}>{this.state.distance + 'km'}</Text>
        </View>
        <Slider style={{marginBottom: 10, marginHorizontal: Platform.OS === 'ios' ? 10 : 0}}
          minimumValue={5}
          maximumValue={75}
          step={5}
          thumbTintColor={Colors.turquoise}
          maximumTrackTintColor={Colors.turquoise}
          minimumTrackTintColor={Colors.turquoise}
          onValueChange={value => this.setState({distance: value})}
          thumbImage={require('./assets/img/thumb.jpg')}
        />
        <TouchableWithoutFeedback onPress={() => this.setState({selectCategoryOn: true})}>
          <View style={styles.selectCategory}>
            <Text style={{fontFamily: "Roboto", fontSize: 18}}>{this.state.activeCategory} </Text>
            <Image style={{height: 20, width: 20}} source={require('./assets/img/arrow.png')}/>
          </View>
        </TouchableWithoutFeedback>
        <SelectCategory
          categories={Categories}
          activeCategory={this.state.activeCategory}
          selectCategory={this.selectCategory}
          closeSelectCategory={this.closeSelectCategory}
          animatedHeight={animatedHeight}
        />
        <View style={{flex: 1, paddingVertical: 15, paddingHorizontal: 10}}>
          <View style={{flex: 1}}>
            <Text style={{fontFamily: "Roboto Light", fontSize: 15, paddingBottom: 15}}>What do you need done?</Text>
            <ScrollView>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {Subcategories.map(this.renderSubcategory)}
              </View>
            </ScrollView>
          </View>
          <View style={styles.button}>
            <Text style={{fontFamily: "Roboto Medium", fontSize: 20, color: Colors.white}}>Apply Changes</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: Colors.turquoise
  },
  headerTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10
  },
  headerText: {
    fontFamily: "Roboto",
    fontSize: 17,
    color: Colors.white
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center', 
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: Colors.white
  },
  textInput: {
    width: screenWidth - 80,
    paddingVertical: 15,
    fontFamily: "Roboto",
    fontSize: 18
  },
  pin: {
    transform: [{rotate: '-45deg'}],
    height: 18,
    width: 18,
    marginLeft: 12,
    tintColor: Colors.darkGray
  },
  target: {
    height: 25,
    width: 25,
    marginRight: 10,
    tintColor: Colors.violet
  },
  distance: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderColor: Colors.lightGray, 
    borderTopWidth: 1
  },
  selectCategory: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderColor: Colors.lightGray, 
    borderBottomWidth: 2,
    borderTopWidth: 1
  },
  button: {
    width: screenWidth - 20,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.violet
  }
});
