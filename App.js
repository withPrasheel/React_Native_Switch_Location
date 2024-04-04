import React, { Component } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView
} from "react-native";
import Notification from './Notification';

export default class App extends Component {
  state = {
    location: {
      coords: {
        latitude: 0,
        longitude: 0,
      },
    },
    poi1: {
      coords: {
        latitude: 33.307146,
        longitude: -111.681177,
      },
    },
    poi2: {
      coords: {
        latitude: 33.423204,
        longitude: -111.939612,
      },
    },
    notify: false,
    message: 'This is a notification!'
  };

  toggleNotification = (msg) => {
    this.setState({
      notify: !this.state.notify,
      message: msg,
    });
  }
  toggleNotificationCpy = () => {
    this.setState({
      notify: !this.state.notify
    });
  }


  async componentDidMount() {
    const permission = await Location.requestForegroundPermissionsAsync();
    if (permission.granted) {
      this.getLocation();
    }
  }

  async getLocation() {
    let loc = await Location.getCurrentPositionAsync();
    this.setState({ location: loc, currentLocation: loc });
  }

  render() {
    const notify = this.state.notify
      ? <Notification
        autoHide
        message={this.state.message}
        onClose={this.toggleNotificationCpy}
      />
      : null;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.10,
              longitudeDelta: 0.04,
            }}
          >
            <Marker
              coordinate={this.state.location.coords}
              title={"User Location"}
              description={"You are here!"}
              image={require("./assets/you-are-here.png")}
            />
          </MapView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                this.getLocation();
                this.toggleNotification('Changed to You');
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>You</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ location: this.state.poi1})
                this.toggleNotification('Changed to POI1');
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>POI 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ location: this.state.poi2})
                this.toggleNotification('Changed to POI2');
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>POI 2</Text>
            </TouchableOpacity>
          </View>
          {notify}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  toolbar: {
    backgroundColor: '#8e44ad',
    padding: 20,
  },
  toolbarText: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
  },
  content: {
    padding: 10,
    overflow: 'hidden',
  },
  btn: {
    backgroundColor: '#9b59b6',
    borderRadius: 3,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  button: {
    backgroundColor: '#f39c12',
    padding: 10,
    borderRadius: 3,
  },
  buttonText: {
    color: '#fff',
  },
});
