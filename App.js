import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Image, Button, StyleSheet, Alert, TouchableHighlight, Modal } from 'react-native';

export default class IGFetchTest extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      // account_id: 'kendalljenner',
      // account_id: 'caradelevingne',  // You can change the Instagram account ID
      account_id: 'music',  // You can change the Instagram hashtag
      sort_id : 'like',
      modalVisible : false,
      modalImageUrl : "",
    }
  }

  componentDidMount(){
    this.fetchData();
  }

  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex:1, justifyContent:'center'}}>
          <View>
            <ActivityIndicator size="large" />
          </View>
          <View style={{justifyContent:'center', alignItems:'center', paddingTop:30}}>
            <Text>正在獲取數據......</Text>
          </View>
        </View>
      )
    }

    return(
        <View style={styles.container}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={()=>{
              //  Alert.alert("Modal has been closed.");
               { this.setState({modalVisible:false}); }
          }}
        >
          <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
            <View style={styles.modal}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                  <Image
                      style={styles.modalImage}
                      source={{uri: this.state.modalImageUrl}}
                  />
                </View>

                <View style={{position:'absolute', right:2, top:2}}>
                  <TouchableHighlight activeOpacity={0.7}  underlayColor='black' onPress={()=>{this.setState({modalVisible:false})}}>
                  <Image
                      style={styles.modalCloseButton}
                      source={require('./src/close.png')}
                  />
                  </TouchableHighlight>
                </View>
            </View>

          </View>
        </Modal>

        <View style={styles.buttonContainer}>
          <Button style={styles.button} title="Sort by Like"  onPress={this.changeSortLike.bind(this)}></Button>
          <Button style={styles.button} title="Sort by Comment" onPress={this.changeSortComment.bind(this)}></Button>
        </View>

        <View style={{flex: 10,paddingTop:2}}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) =>
              <View style={{flex:1, alignItems:'center', paddingBottom:5}}>
                <TouchableHighlight activeOpacity={0.7}  underlayColor='black' onPress={this.setModalVisible.bind(this, this.state.modalVisible, item.node.display_url)}>
                  <Image
                    style={styles.image}
                    source={{uri: item.node.thumbnail_src}}
                  />
                </TouchableHighlight>

                <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                  <Image
                    style={styles.imageIcon}
                    source={require('./src/like.png')}
                  />
                  <Text>{convertCount(item.node.edge_liked_by.count)}   </Text>
                  <Image
                    style={styles.imageIcon}
                    source={require('./src/comment.png')}
                  />
                  <Text>{convertCount(item.node.edge_media_to_comment.count)}</Text>
                </View>
              </View>
            }
            keyExtractor={(item, index) => index}
            numColumns={3}
          />
        </View>
      </View>
    );
  }

  // My methods

  setModalVisible(isVisible, url) {
    this.setState({modalVisible: !isVisible, modalImageUrl: url});
  }

  clickImage(msg) {
    Alert.alert(msg);
  }

  changeSortLike(){
      this.state.sort_id='like';
      this.fetchData();
      this.setState({isLoading: true});
  }
  changeSortComment(){
      this.state.sort_id='comment';
      this.fetchData();
      this.setState({isLoading: true});
  }

  fetchData(){
    // for https://www.instagram.com/<username>/?__a=1
    // var my_url = 'http://test.chungkan.com/react_test.php?id='+this.state.account_id+'&sort='+this.state.sort_id;
    
    // for https://www.instagram.com/explore/tags/<hashtag>/?__a=1
    var my_url = 'http://test.chungkan.com/react_test_tag.php?id='+this.state.account_id+'&sort='+this.state.sort_id;
    fetch(my_url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          // dataSource: responseJson.movies,
          dataSource: responseJson,
        }, function(){
          // In this block you can do something with new state.
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }
}

// get real size of device screen
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var imageWidth = Math.floor(screenWidth/3.3);
var imageIconWidth = Math.floor(screenWidth/25);
var modalWidth, modalImageWidth, modalCloseButtonSize, screenSizeStandard;
screenSizeStandard = (screenWidth<screenHeight) ? screenWidth : screenHeight ;
modalWidth = Math.floor(screenSizeStandard*0.95);
modalImageWidth = Math.floor(modalWidth*0.96);
modalCloseButtonSize = Math.floor(screenSizeStandard*0.1);

// convert number into K,M,B format (2300 => 2K)
function convertCount(x) {
  var b;
  if (x>=1000000000) {
    b = Math.floor(x/1000000000);
    return b+'B';
  }
  if (x>=1000000) {
    b = Math.floor(x/1000000);
    return b+'M';
  }
  if (x>=1000) {
    b = Math.floor(x/1000);
    return b+'K';
  }
  return x;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 6,
  },
  button: {
    flex:1,
    alignSelf: 'stretch',
  },
  image:{
    width: imageWidth,
    height: imageWidth,
  },
  imageIcon:{
    width: imageIconWidth,
    height: imageIconWidth,
  },
  modal:{
    width: modalWidth,
    height: modalWidth,
    backgroundColor:'white',
  },
  modalImage:{
    width: modalImageWidth,
    height: modalImageWidth,
    justifyContent:'center',
    alignItems:'center',
  },
  modalCloseButton:{
    width: modalCloseButtonSize,
    height: modalCloseButtonSize,
  },
})

