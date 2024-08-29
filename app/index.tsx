import React from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import Favicon from 'react-favicon';

const fetchSettings = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Yzk4MTAxNjk0OTQ2MmE4NmJlNTA2NTc2Yjg1ZjZlNCIsInN1YiI6IjY2MjFkMDY1Y2NkZTA0MDE4ODA2NDA4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xUExDZr1UbIizmXNPNqotICIYYKTQfRltq2uIgq9qjI'
   }
}

export default function App() {
   const [searchTerm, setSearchTerm] = React.useState('');
   const [searchResults, setSearchResults] = React.useState([]);
   const [movieTypeButtonHover, setMovieTypeButtonHover] = React.useState(false);
   const [movieTypeButtonPressed, setMovieTypeButtonPressed] = React.useState(true);
   const [tvShowTypeButtonHover, setTvShowTypeButtonHover] = React.useState(false);
   const [tvShowTypeButtonPressed, setTvShowTypeButtonPressed] = React.useState(false);
   const [showType, setShowType] = React.useState('movie');

   const searchForShow = async (query: React.SetStateAction<string>) => {
      setSearchTerm(query);
      if (query.length < 1) return;

      fetch(showType == 'movie' ? `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=true&page=1` : `https://api.themoviedb.org/3/search/tv?query=${searchTerm}&include_adult=true&page=1`, fetchSettings)
         .then(response => {
            if (!response.ok) throw new Error('Failed to fetch data');
            return response.json()
         })
         .then(data => setSearchResults(data.results || []))
         .catch(error => console.error(error));
   }

   const renderResults = () => {
      return (
         <Text>Results</Text>
      );
   };

   return (
      <View style={styles.body_container}>
         <Favicon url='https://raw.githubusercontent.com/acegoal07/acegoal07.github.io/master/assets/images/favicon.ico?token=GHSAT0AAAAAACTBOBAODJTZQ5QRFSQ7P22KZWQXILA' />
         <View style={styles.show_type_switch_container}>
            <Pressable
               style={(movieTypeButtonHover || movieTypeButtonPressed ? { ...styles.show_type_switch_button, backgroundColor: '#0d6efd' } : styles.show_type_switch_button)}
               onHoverIn={() => setMovieTypeButtonHover(true)}
               onHoverOut={() => setMovieTypeButtonHover(false)}
               onPress={() => {
                  if (tvShowTypeButtonPressed) setTvShowTypeButtonPressed(false);
                  setMovieTypeButtonPressed(true);
                  setShowType('movie');
               }}>
               <Text style={(movieTypeButtonHover || movieTypeButtonPressed ? { ...styles.show_type_switch_button_text, color: '#fff' } : styles.show_type_switch_button_text)}>Movies</Text>
            </Pressable>
            <Pressable
               style={(tvShowTypeButtonHover || tvShowTypeButtonPressed ? { ...styles.show_type_switch_button, backgroundColor: '#0d6efd' } : styles.show_type_switch_button)}
               onHoverIn={() => setTvShowTypeButtonHover(true)}
               onHoverOut={() => setTvShowTypeButtonHover(false)}
               onPress={() => {
                  if (movieTypeButtonPressed) setMovieTypeButtonPressed(false);
                  setTvShowTypeButtonPressed(true);
                  setShowType('tv');
               }}>
               <Text style={(tvShowTypeButtonHover || tvShowTypeButtonPressed ? { ...styles.show_type_switch_button_text, color: '#fff' } : styles.show_type_switch_button_text)}>TV-Shows</Text>
            </Pressable>
         </View>
         <TextInput
            style={(searchTerm.length != 0 ? { ...styles.search_input, color: '#fff' } : styles.search_input)}
            value={searchTerm}
            onChangeText={searchForShow}
            placeholder="Search for a movie or TV show..."
            keyboardType="default"
         />
         <FlatList
            style={{ width: '100%' }}
            data={searchResults}
            renderItem={renderResults}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()} />
      </View>
   );
};

const styles = StyleSheet.create({
   body_container: {
      height: '100%',
      backgroundColor: '#1a1d20',
      alignItems: 'center'
   },
   show_type_switch_container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      maxWidth: 1200,
      width: '80%',
      padding: 30,
      paddingTop: 20,
      paddingBottom: 20,
      margin: 20,
      gap: 20,
      backgroundColor: '#2b3035',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
   },
   show_type_switch_button: {
      padding: 8,
      backgroundColor: 'transparent',
      borderRadius: 5,
      width: '50%',
      borderColor: '#0d6efd',
      borderWidth: 2
   },
   show_type_switch_button_text: {
      fontSize: 18,
      color: '#0d6efd',
      textAlign: 'center'
   },
   search_input: {
      maxWidth: 1200,
      backgroundColor: '#2b3035',
      width: '80%',
      fontSize: 18,
      height: 50,
      borderWidth: 0,
      padding: 10,
      borderRadius: 10,
      color: '#b0b5b9',
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
   },
});