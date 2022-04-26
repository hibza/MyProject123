import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView, TouchableOpacity } from "react-native-web";
import { useDebugValue } from "react/cjs/react.production.min";

const data = [
  {
    albumId: 1,
    id: 1,
    title: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952",
  },
  {
    albumId: 1,
    id: 2,
    title: "reprehenderit est deserunt velit ipsam",
    url: "https://via.placeholder.com/600/771796",
    thumbnailUrl: "https://via.placeholder.com/150/771796",
  },
  {
    albumId: 1,
    id: 3,
    title: "officia porro iure quia iusto qui ipsa ut modi",
    url: "https://via.placeholder.com/600/24f355",
    thumbnailUrl: "https://via.placeholder.com/150/24f355",
  },
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 2;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count1: " ", count2: " ", count3: " " };
  }

  press = (title, id, url) => {
    this.setState({
      count1: title,
      count2: id,
      count3: url,
    });
  };

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item}>
        <Image
          style={{ width: 150, height: 150, margin: 15 }}
          source={{ uri: item.url }}
        ></Image>
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={styles.itemText}>{item.id}</Text>
        <Text style={styles.itemText}>{item.url}</Text>
        <TouchableOpacity
          style={{
            height: 40,
            width: 150,
            alignItems: "center",
            margin: 15,
            backgroundColor: "yellow",
            justifyContent: "center",
          }}
          onPress={() => {
            this.press(item.title, item.id, item.url);
          }}
        >
          <Text>COMPARE</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { count1, count2, count3 } = this.state;
    return (
      <SafeAreaView>
        <FlatList
          data={formatData(data, numColumns)}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
        />
        <TouchableOpacity>
          <table>
            <tr>
              <td>
                <Text>Count: {count1}</Text>
              </td>
              <td>
                <Text>Count: {count2}</Text>
              </td>
              <td>
                <Text>Count: {count3}</Text>
              </td>
              <td>
                <Image
                  style={{ width: 150, height: 150, margin: 15 }}
                  source={{ uri: count3 }}
                ></Image>
              </td>
            </tr>
          </table>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    backgroundColor: "#4D243D",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  itemText: {
    color: "#fff",
  },
});
