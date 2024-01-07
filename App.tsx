/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator, Dimensions, Animated } from 'react-native';
import MyHeader from './Screens/HeaderComp';
import MyBottom from './Screens/BottonView';
import { normalGet } from './network';

export default function App() {

  const [total, settotal] = useState(0);
  const [itemcount, setitemcount] = useState(0);
  const [listitems, setlistitems] = useState([]);
  const [ids, setids] = useState([]);
  const [newlist, setnewList] = useState([]);
  const [loading, setload] = useState(false);

  useEffect(() => {
    axioscall();
  }, []);


  async function axioscall() {
    // await normalGet().then((response) => {
    //   console.log("response :", response);
    //   setlistitems(response);
    // }).catch((error) => {
    //   console.log(error);
    // });
    try {
      let response = await fetch(
        `https://fakestoreapi.com/products/`
      );
      let json = await response.json();
      setlistitems(json);
    } catch (error) {
      console.error(error);
    }
  }

  const submitpress = (price, id) => {

    setload(true);

    var to = total + price;
    settotal(Math.round(to));

    if (!ids.includes(id)) {
      var a = ids.concat([id]);
      setids(a);
      setitemcount(itemcount + 1);
    }

    var c = newlist.filter((item) => { return item.nid == id; });
    if (c.length < 1) {
      var b = newlist.concat([{ nid: id, quant: 1 }]);
      setnewList(b);
    } else {
      newlist.forEach(obj => {
        if (obj.nid == id) {
          obj.quant = obj.quant + 1;
        }
        setnewList(newlist);
      });
    }

    setTimeout(() => {
      setload(false);
    }, 1000);
  }

  const submitMinus = (price, id) => {

    setload(true);
    var to = total - price;
    settotal(Math.round(to));

    var c = newlist.filter((item) => { return item.nid == id; });
    if (ids.includes(id) && c.length < 1) {

    } else {
      if ((c[0].quant - 1) == 0) {
        var d = newlist.filter((item) => { return item.nid != id; });
        var a = ids.filter((item) => { return item != id; });
        setnewList(d);
        setids(a);
        setitemcount(itemcount - 1);
      } else {
        newlist.forEach(obj => {
          if (obj.nid == id) {
            obj.quant = obj.quant - 1;
          }
          setnewList(newlist);
        });
      }
    }

    setTimeout(() => {
      setload(false);
    }, 1000);
  }

  function cal(id) {
    if (newlist.length < 1) {
      return 0;
    } else {
      var c = newlist.filter((item) => { return item.nid == id; });
      if (c.length > 0) {
        return c[0]?.quant;
      } else {
        return 0;
      }
    }

  }

  function show(id) {
    if (newlist.length < 1) {
      return false
    } else {
      var c = newlist.filter((item) => { return item.nid == id; });
      if (c.length < 1) {
        return false;
      } else {
        return true;
      }
    }
  }

  const Item = (item) => (
    <View style={styles.item}>
      <Image style={styles.imageList} source={{ uri: item.image }} />
      <View style={[styles.item2]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          {
            !show(item.id) && <TouchableOpacity style={styles.submitButton} onPress={() => submitpress(item.price, item.id)}>
              <Text style={styles.addButton}>Add</Text>
            </TouchableOpacity>
          }
          {
            show(item.id) &&
            <View style={{ flexDirection: 'row', backgroundColor: "#1dde70", height: 20, width: 80, borderRadius: 10, justifyContent: 'space-between' }}>
              <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => submitMinus(item.price, item.id)}>
                <Image style={styles.imageSrc2} source={require('./Assets/minus.png')}></Image>
              </TouchableOpacity>
              <TouchableOpacity style={{ justifyContent: 'center', backgroundColor: 'white', width: 30 }}>
                <Text style={styles.addButton}>{cal(item.id)}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => submitpress(item.price, item.id)}>
                <Image style={styles.imageSrc3} source={require('./Assets/plus.png')}></Image>
              </TouchableOpacity>
              <></>
            </View>
          }
        </View>
        <View style={styles.subItems}>
          <Text style={styles.subtitleName}>Per Unit</Text>
          <Text style={[styles.subtitleName, { marginLeft: 60, }]}>Total</Text>
        </View>
        <View style={styles.subItems}>
          <Text style={styles.titlePrice}>${item.price}</Text>
          <Text style={[styles.titlePrice, { marginLeft: 60, }]}>${item.price * cal(item.id)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeView}>
        <MyHeader />
      </SafeAreaView>
      <View style={styles.listContainer}>
        <FlatList
          data={listitems}
          renderItem={({ item }) => <Item title={item.title} image={item.image} price={item.price} id={item.id} />}
          keyExtractor={item => item.id}
        />
        {
          loading &&
          <View style={styles.overview}>
            <Text style={styles.subtitleNameI}>Updating Cart ....</Text>
            <ActivityIndicator size={'large'} style={styles.indicatorV} color={'black'}></ActivityIndicator>
          </View>
        }
      </View>
      <MyBottom title={total} itemcount={itemcount} />
    </View >
  );
}

const styles = StyleSheet.create(
  {
    mainContainer: {
      flex: 1,
      backgroundColor: 'white',
    },
    safeView: {
      backgroundColor: '#1dde70',
    },
    item: {
      backgroundColor: '#ebf5ee',
      height: 120,
      marginVertical: 5,
      marginHorizontal: 10,
      borderRadius: 10,
      flexDirection: 'row',
    },
    item2: {
      height: 100,
      marginHorizontal: 5,
      borderRadius: 10,
      flex: 1,
      flexDirection: 'column',
      marginVertical: 0,
      justifyContent: 'space-evenly',
      marginTop: 10,
    },
    title: {
      fontSize: 13,
      fontWeight: '600',
      justifyContent: 'center',
      maxHeight: 40,
      width: '60%',
    },
    imageList: {
      height: 100,
      width: 80,
      margin: 10,
      borderRadius: 10,
    },
    listImageSrc: {
      height: 15,
      width: 15,
      margin: 8,
      alignSelf: 'center',
    },
    titlePrice: {
      fontSize: 12,
      fontWeight: '700',
      justifyContent: 'center',
      width: 60,
      color: "grey",
    },
    subtitleName: {
      fontSize: 12,
      fontWeight: '700',
      justifyContent: 'center',
      width: 60,
    },
    listContainer: {
      flex: 1,
      marginBottom: 80,
    },
    subItems: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    addButton: {
      fontSize: 12,
      fontWeight: '700',
      alignSelf: 'center',
    },
    submitButton: {
      backgroundColor: "#1dde70",
      height: 24,
      width: 70,
      borderRadius: 15,
      justifyContent: 'center',
      marginRight: 10,
    },
    imageSrc2: {
      height: 14,
      width: 14,
      alignSelf: 'center',
      marginLeft: 5,
    },
    imageSrc3: {
      height: 14,
      width: 14,
      alignSelf: 'center',
      marginRight: 5,
    },
    indicatorWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    indicatorText: {
      fontSize: 18,
      marginTop: 12,
    },
    overview: {
      position: 'absolute',
      backgroundColor: 'white',
      overflow: 'visible',
      opacity: 0.9,
      flex: 1,
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
    },
    indicatorV: {
      position: 'absolute',
      left: Dimensions.get('screen').width / 2 - 20,
      top: Dimensions.get('screen').height / 2 - 100,
      opacity: 1.0,
    },
    subtitleNameI: {
      position: 'absolute',
      alignSelf: 'center',
      top: Dimensions.get('screen').height / 2 - 130,
      fontSize: 16,
      fontWeight: '700',
      justifyContent: 'center',
      opacity: 1.0,
    }
  }
);