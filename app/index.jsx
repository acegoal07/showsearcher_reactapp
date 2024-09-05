import React from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, FlatList, useWindowDimensions, Image } from 'react-native';
import Favicon from 'react-favicon';

const fetchSettings = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Yzk4MTAxNjk0OTQ2MmE4NmJlNTA2NTc2Yjg1ZjZlNCIsInN1YiI6IjY2MjFkMDY1Y2NkZTA0MDE4ODA2NDA4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xUExDZr1UbIizmXNPNqotICIYYKTQfRltq2uIgq9qjI'
   }
}

export default function App() {
   const [styles, setStyles] = React.useState(stylesL);
   const [numColumns, setNumColumns] = React.useState(3);
   const [searchTerm, setSearchTerm] = React.useState('');
   const [searchResults, setSearchResults] = React.useState([]);
   const [movieTypeButtonHover, setMovieTypeButtonHover] = React.useState(false);
   const [movieTypeButtonPressed, setMovieTypeButtonPressed] = React.useState(true);
   const [tvShowTypeButtonHover, setTvShowTypeButtonHover] = React.useState(false);
   const [tvShowTypeButtonPressed, setTvShowTypeButtonPressed] = React.useState(false);
   const [showType, setShowType] = React.useState('movie');

   /**
    * Updates the search results based on the search query
    * @param {React.SetStateAction<String>} query The search query
    */
   const searchForShow = async (query) => {
      setSearchTerm(query);
      console.log(query);
      if (query.length < 1) {
         setSearchResults([]);
         return;
      }
      await fetch(showType == 'movie' ? `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=true&page=1` : `https://api.themoviedb.org/3/search/tv?query=${searchTerm}&include_adult=true&page=1`, fetchSettings)
         .then(response => {
            if (!response.ok) {
               throw new Error('Failed to fetch data');
            }
            return response.json();
         })
         .then(data => {
            setSearchResults(data.results || []);
         })
         .catch(error => console.error(error));
   }

   const renderSearchResults = ({ item }) => {
      if (!item.poster_path) {
         return (
            <View style={styles.search_result_item_container_padded}>
               <Text style={{ ...styles.search_result_item_text, fontWeight: 'bold', fontSize: 25, color: '#fff' }}>{item.title || item.name || item.original_title || item.original_name}</Text>
               <Text style={styles.search_result_item_text}>{convertDate(item.release_date || item.first_air_date)}</Text>
               <Text style={styles.search_result_item_text}>{item.overview ? `${item.overview.substring(0, 150)} ...` : 'No overview available'}</Text>
               <Text style={{ ...styles.search_result_item_text, fontWeight: 'bold', color: '#fff' }}>{'Click to show more'}</Text>
            </View>
         )
      } else {
         return (
            <View style={styles.search_result_item_container}>
               <Image
                  style={styles.search_result_item_image}
                  source={{
                     uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`
                  }}
                  alt={item.title || item.name || item.original_title || item.original_name}
                  referrerPolicy='no-referrer'
               />
            </View>
         )
      }
   };

   React.useEffect(() => {
      searchForShow(searchTerm);
   }, [showType]);

   React.useEffect(() => {
      const query = searchTerm;
      const timeoutId = setTimeout(() => searchForShow(query), 150);
      return () => clearTimeout(timeoutId);
   }, [searchTerm]);

   React.useEffect(() => {
      if (window.innerWidth < 600) {
         setNumColumns(1);
         setStyles(stylesS);
      }
      else if (window.innerWidth < 992) {
         setNumColumns(2);
         setStyles(stylesM);
      }
      else {
         setNumColumns(3);
         setStyles(stylesL);
      }
   }, [useWindowDimensions().width]);

   return (
      <View style={styles.body_container}>
         <Favicon url='https://raw.githubusercontent.com/acegoal07/acegoal07.github.io/master/assets/images/favicon.ico?token=GHSAT0AAAAAACTBOBAODJTZQ5QRFSQ7P22KZWQXILA' />
         <View style={styles.show_type_switch_container}>
            <Pressable
               style={(movieTypeButtonHover || movieTypeButtonPressed ? { ...styles.show_type_switch_button, backgroundColor: '#0d6efd' } : styles.show_type_switch_button)}
               onHoverIn={() => setMovieTypeButtonHover(true)}
               onHoverOut={() => setMovieTypeButtonHover(false)}
               onPress={() => {
                  if (tvShowTypeButtonPressed) { setTvShowTypeButtonPressed(false); }
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
                  if (movieTypeButtonPressed) { setMovieTypeButtonPressed(false); }
                  setTvShowTypeButtonPressed(true);
                  setShowType('tv');
               }}>
               <Text style={(tvShowTypeButtonHover || tvShowTypeButtonPressed ? { ...styles.show_type_switch_button_text, color: '#fff' } : styles.show_type_switch_button_text)}>TV-Shows</Text>
            </Pressable>
         </View>
         <TextInput
            style={(searchTerm.length != 0 ? { ...styles.search_input, color: '#fff' } : styles.search_input)}
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Search for a movie or TV show..."
            keyboardType="default"
         />
         <FlatList
            key={numColumns}
            style={styles.search_results_output_container}
            numColumns={numColumns}
            data={searchResults}
            contentContainerStyle={{ display: 'flex', gap: 10, justifyContent: 'center' }}
            ListEmptyComponent={<Text style={{ color: '#fff', textAlign: 'center' }}>{(searchTerm.length === 0 ? "No search term provided" : "No results found")}</Text>}
            renderItem={renderSearchResults} />
      </View>
   );
}

/**
 * Converts the date to a readable format
 * @param {String} date The date to convert
 * @returns {String} The date in a readable format
 */
function convertDate(date) {
   const dateObj = new Date(date);
   if (dateObj.toString() === 'Invalid Date') { return 'No release date available'; }
   return dateObj.toLocaleDateString(new Intl.DateTimeFormat(navigator.language).resolvedOptions().locale);
}

const backgroundColor = '#1a1d20';
const secondaryColor = '#2b3035';
const mutedText = '#b0b5b9';
const buttonColor = '#0d6efd';

const stylesS = StyleSheet.create({
   body_container: {
      height: '100%',
      backgroundColor,
      alignItems: 'center'
   },
   show_type_switch_container: {
      display: 'flex',
      justifyContent: 'center',
      maxWidth: 1200,
      width: '95%',
      padding: 15,
      paddingTop: 15,
      paddingBottom: 15,
      margin: 15,
      gap: 15,
      backgroundColor: secondaryColor,
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
      width: '100%',
      borderColor: buttonColor,
      borderWidth: 2
   },
   show_type_switch_button_text: {
      fontSize: 14,
      color: buttonColor,
      textAlign: 'center'
   },
   search_input: {
      maxWidth: 1200,
      backgroundColor: secondaryColor,
      width: '95%',
      fontSize: 14,
      padding: 14,
      borderRadius: 10,
      color: mutedText,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
   },
   search_results_output_container: {
      display: 'flex',
      maxWidth: 1200,
      width: '80%',
      marginTop: 20,
      marginBottom: 20
   },
   search_result_item_container: {
      width: '100%',
      margin: 'auto',
      backgroundColor: secondaryColor,
      marginBottom: 4,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
   },
   search_result_item_container_padded: {
      width: '100%',
      padding: 10,
      margin: 'auto',
      marginBottom: 4,
      aspectRatio: 0.7,
      backgroundColor: secondaryColor,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      justifyContent: 'center'
   },
   search_result_item_text: {
      color: mutedText,
      textAlign: 'center',
      padding: 5
   },
   search_result_item_image: {
      aspectRatio: 0.7,
      borderRadius: 10
   }
});

const stylesM = StyleSheet.create({
   body_container: {
      height: '100%',
      backgroundColor,
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
      backgroundColor: secondaryColor,
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
      borderColor: buttonColor,
      borderWidth: 2
   },
   show_type_switch_button_text: {
      fontSize: 18,
      color: buttonColor,
      textAlign: 'center'
   },
   search_input: {
      maxWidth: 1200,
      backgroundColor: secondaryColor,
      width: '80%',
      fontSize: 18,
      padding: 18,
      borderRadius: 10,
      color: mutedText,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
   },
   search_results_output_container: {
      display: 'flex',
      maxWidth: 1200,
      width: '80%',
      marginTop: 20,
      marginBottom: 20
   },
   search_result_item_container: {
      width: '49%',
      margin: 'auto',
      backgroundColor: secondaryColor,
      marginBottom: 4,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
   },
   search_result_item_container_padded: {
      width: '49%',
      padding: 10,
      margin: 'auto',
      marginBottom: 4,
      aspectRatio: 0.7,
      backgroundColor: secondaryColor,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      justifyContent: 'center'
   },
   search_result_item_text: {
      color: mutedText,
      textAlign: 'center',
      padding: 5
   },
   search_result_item_image: {
      aspectRatio: 0.7,
      borderRadius: 10
   }
});

const stylesL = StyleSheet.create({
   body_container: {
      height: '100%',
      backgroundColor,
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
      backgroundColor: secondaryColor,
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
      borderColor: buttonColor,
      borderWidth: 2
   },
   show_type_switch_button_text: {
      fontSize: 18,
      color: buttonColor,
      textAlign: 'center'
   },
   search_input: {
      maxWidth: 1200,
      backgroundColor: secondaryColor,
      width: '80%',
      fontSize: 18,
      padding: 18,
      borderRadius: 10,
      color: mutedText,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
   },
   search_results_output_container: {
      display: 'flex',
      maxWidth: 1200,
      width: '80%',
      marginTop: 20,
      marginBottom: 20
   },
   search_result_item_container: {
      width: '32%',
      margin: 'auto',
      backgroundColor: secondaryColor,
      marginBottom: 4,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
   },
   search_result_item_container_padded: {
      width: '32%',
      padding: 10,
      margin: 'auto',
      marginBottom: 4,
      aspectRatio: 0.7,
      backgroundColor: secondaryColor,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      justifyContent: 'center'
   },
   search_result_item_text: {
      color: mutedText,
      textAlign: 'center',
      padding: 5
   },
   search_result_item_image: {
      aspectRatio: 0.7,
      borderRadius: 10
   }
});