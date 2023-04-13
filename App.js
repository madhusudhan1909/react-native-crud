import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button,Alert } from 'react-native';

export default function App() {
  const [bookName, setbookName] = useState('');
  const [bookAuthor, setbookAuthor] = useState('');
  const [bookCost, setbookCost] = useState(0);  

  const saveData = () => {
    console.warn(bookName);
    console.warn(bookAuthor);
    console.warn(bookCost);
  //   const url ="http://localhost:8090/getBooks";
  //   let result = await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },  
  //   });
  //  result = await result.json();
  //   if(result){
  //   console.warn("data added")
  //   }
  // }
  
  const handleCreate = async () => {
    try {
      const response = await fetch("http://localhost:8090/saveBook", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookName:bookName,
          bookAuthor:bookAuthor,
          bookCost: bookCost,
        }),
      });
      const data = await response.json();
      Alert.alert('Book created successfully');
      setbookName('');
      setbookAuthor('');
      setbookCost('');
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred while creating the book');
    }
  };
}

  return (
    <View style={styles.container}>
    
      <Text style={{ fontSize: 25}}>BOOK MANAGE APP</Text>
      <TextInput style={styles.input}
        value={bookName}
        onChangeText={(text) => setbookName(text)}
        placeholder='Enter Name' />
      <TextInput style={styles.input}
        value={bookAuthor}
        onChangeText={(text) => setbookAuthor(text)}
        placeholder='Enter Author' />
      <TextInput style={styles.input}
        value={bookCost}
        onChangeText={(text) => setbookCost(text)}
        placeholder='Enter Cost' />
      
      <Button title='Save Data' onPress={saveData} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'skyblue',
    borderWidth: 2,
    margin: 20,
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})