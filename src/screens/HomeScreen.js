import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {debounce} from 'lodash'
import { fetchLocations, fetchWeatherForecast } from '../api/weather';

const HomeScreen = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather,setWeather] = useState({})

  const [searchQuery, setSearchQuery] = useState('');
  const handleLocation = loc => {
    // console.log('Selected location:', loc.city, loc.state);
    toggleSearch(false);
    setLocations([])
    fetchWeatherForecast({
        cityName: loc.name,
        days:'7'
    }).then(data=>setWeather(data))
  };

  const handleSearch = (value) => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then(data => {
        console.log('got locations', data);
        setLocations(data);  
      });
    }
  };
  
  const handleTextDebounce = useCallback(debounce(handleSearch, 1200),[])
  
const {current, location} = weather

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} />
      <ImageBackground
        blurRadius={70}
        source={require('../assests/images/bg.png')}
        style={{width: '100%', height: '100%'}}
        resizeMode="cover">
        <SafeAreaView style={{flex: 1}}>
          {/* Search Section */}
          <View
            style={{
              flexDirection: 'row',
              height: 56,
              margin: 12,
              borderRadius: 20,
              backgroundColor: showSearch ? '#99AAAB' : 'transparent',
              opacity: 0.7,
              paddingHorizontal: 12,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '85%'}}>
              {showSearch && (
                <TextInput
                //   value={searchQuery}
                  onChangeText={handleTextDebounce}
                  placeholder="Search City"
                  placeholderTextColor="white"
                  style={{color: 'white', paddingHorizontal: 8}}
                />
              )}
            </View>

            <TouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
              style={{
                backgroundColor: '#A4B0BD',
                padding: 6,
                borderRadius: 20,
                alignItems: 'center',
              }}>
              <MaterialIcons name="search" size={25} color="white" />
            </TouchableOpacity>
          </View>

          {/* Search Results - Now Positioned Properly */}
          {showSearch && locations.length > 0 && (
            <View
              style={{
                position: 'absolute',
                top: 80,
                left: 16,
                right: 16,
                zIndex: 10,
                borderRadius: 12,
                backgroundColor: 'white',
                paddingVertical: 12,
                elevation: 5, // Adds shadow on Android
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowRadius: 4,
              }}>
              {locations.map((loc, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleLocation(loc)}
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 12,
                    paddingHorizontal: 12,
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="google-maps"
                    size={20}
                    color="#EA7773"
                    style={{marginRight: 8}}
                  />
                  <Text>{`${loc.name}, ${loc.country}`}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Selected Location - Moved Below Search */}
          <View style={{marginTop: 120}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
                {location?.name},{' '}
                <Text style={{fontSize: 16, color: '#7B8788'}}>
                  {location?.country}
                </Text>
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../assests/images/partlycloudy.png')}
                style={{width: 200, height: 200, marginTop: 24}}
                resizeMode="contain"
              />

              <Text
                style={{
                  fontSize: 34,
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: 24,
                }}>
                23&#176;
              </Text>
              <Text style={{fontSize: 20, color: 'white', marginTop: 12}}>
                {' '}
                Partly Cloud{' '}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 24,
              }}>
              <View
                style={{
                  flex: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assests/icons/wind.png')}
                  style={{width: 20, height: 20}}
                  resizeMode="contain"
                />
                <Text style={{color: '#fff', marginLeft: 6}}>22KM</Text>
              </View>
              <View
                style={{
                  flex: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assests/icons/drop.png')}
                  style={{width: 20, height: 20}}
                  resizeMode="contain"
                />
                <Text style={{color: '#fff', marginLeft: 6}}>23%</Text>
              </View>
              <View
                style={{
                  flex: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assests/icons/sun.png')}
                  style={{width: 20, height: 20}}
                  resizeMode="contain"
                />
                <Text style={{color: '#fff', marginLeft: 6}}>6.05 AM</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', margin: 12}}>
              <MaterialIcons name="calendar-month" size={20} color="white" />
              <Text style={{color: 'white', marginLeft: 4}}>
                Daily Forecast
              </Text>
            </View>
          </View>



<ScrollView horizontal  contentContainerStyle={{ justifyContent:'space-around' }} >
    <View style={{ margin:12,padding:12, backgroundColor:'#DAE0E2', justifyContent:'center', alignItems:'center', opacity:0.6, height:100, borderRadius:12 }} >
<Image  source={require('../assests/images/heavyrain.png')}  style={{ width:24, height:24 }} resizeMode='contain' />
<Text style={{ color:'#fff',marginTop:4 }} >Monday</Text>
<Text style={{ color:'#fff',marginTop:4, fontWeight:'bold' }}>13&#176;</Text>
    </View>


    <View style={{ margin:12,padding:12, backgroundColor:'#DAE0E2', justifyContent:'center', alignItems:'center', opacity:0.6, height:100, borderRadius:12 }} >
<Image  source={require('../assests/images/heavyrain.png')}  style={{ width:24, height:24 }} resizeMode='contain' />
<Text style={{ color:'#fff',marginTop:4 }} >Monday</Text>
<Text style={{ color:'#fff',marginTop:4, fontWeight:'bold' }}>13&#176;</Text>
    </View>



    <View style={{margin:12, padding:12, backgroundColor:'#DAE0E2', justifyContent:'center', alignItems:'center', opacity:0.6, height:100, borderRadius:12 }} >
<Image  source={require('../assests/images/heavyrain.png')}  style={{ width:24, height:24 }} resizeMode='contain' />
<Text style={{ color:'#fff',marginTop:4 }} >Monday</Text>
<Text style={{ color:'#fff',marginTop:4, fontWeight:'bold' }}>13&#176;</Text>
    </View>




    <View style={{margin:12, padding:12, backgroundColor:'#DAE0E2', justifyContent:'center', alignItems:'center', opacity:0.6, height:100, borderRadius:12 }} >
<Image  source={require('../assests/images/heavyrain.png')}  style={{ width:24, height:24 }} resizeMode='contain' />
<Text style={{ color:'#fff',marginTop:4 }} >Monday</Text>
<Text style={{ color:'#fff',marginTop:4, fontWeight:'bold' }}>13&#176;</Text>
    </View>




    <View style={{margin:12, padding:12, backgroundColor:'#DAE0E2', justifyContent:'center', alignItems:'center', opacity:0.6, height:100, borderRadius:12 }} >
<Image  source={require('../assests/images/heavyrain.png')}  style={{ width:24, height:24 }} resizeMode='contain' />
<Text style={{ color:'#fff',marginTop:4 }} >Monday</Text>
<Text style={{ color:'#fff',marginTop:4, fontWeight:'bold' }}>13&#176;</Text>
    </View>




    <View style={{ margin:12,padding:12, backgroundColor:'#DAE0E2', justifyContent:'center', alignItems:'center', opacity:0.6, height:100, borderRadius:12 }} >
<Image  source={require('../assests/images/heavyrain.png')}  style={{ width:24, height:24 }} resizeMode='contain' />
<Text style={{ color:'#fff',marginTop:4 }} >Monday</Text>
<Text style={{ color:'#fff',marginTop:4, fontWeight:'bold' }}>13&#176;</Text>
    </View>

</ScrollView>

        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
