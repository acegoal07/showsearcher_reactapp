import React from 'react';
import {
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  useWindowDimensions,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';

import DateFormatter from '~/constants/dateFormatter';
import { stylesS, stylesM, stylesL, stylesXL, universalStyles } from '~/constants/stylesheet';
import { buttonColor } from '~/constants/colours';

const fetchSettings = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Yzk4MTAxNjk0OTQ2MmE4NmJlNTA2NTc2Yjg1ZjZlNCIsInN1YiI6IjY2MjFkMDY1Y2NkZTA0MDE4ODA2NDA4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xUExDZr1UbIizmXNPNqotICIYYKTQfRltq2uIgq9qjI',
  },
};

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
  const [resultModalVisible, setResultModalVisible] = React.useState(false);
  const [selectedResult, setSelectedResult] = React.useState({});
  const [genreData, setGenreData] = React.useState('');
  const [loadedResultData, setLoadedResultData] = React.useState(false);

  /**
   * Updates the search results based on the search query
   * @param {React.SetStateAction<string>} query The search query
   */
  const searchForShow = (query: React.SetStateAction<string>) => {
    setSearchTerm(query);
    if (query.length < 1) {
      setSearchResults([]);
      return;
    }
    fetch(
      showType === 'movie'
        ? `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=true&page=1`
        : `https://api.themoviedb.org/3/search/tv?query=${searchTerm}&include_adult=true&page=1`,
      fetchSettings
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setSearchResults(data.results || []);
      })
      .catch((error) => console.error(error));
  };

  /**
   * Handles the genre data for the selected item
   * @param {any} item The selected item
   */
  const handleLoadResultData = async (item: any) => {
    fetch(
      showType === 'movie'
        ? `https://api.themoviedb.org/3/genre/movie/list?language=en`
        : `https://api.themoviedb.org/3/genre/tv/list?language=en`,
      fetchSettings
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        } else {
          return res.json();
        }
      })
      .then((genreData) => {
        const genres: any[] = [];
        item.genre_ids.forEach((genreId: any) => {
          const returnGenre = genreData.genres.find((e: { id: any }) => e.id === genreId);
          if (returnGenre) {
            genres.push(returnGenre.name);
          }
        });
        setGenreData(genres.join(', '));
      })
      .catch((error) => console.error(error));
    setLoadedResultData(true);
  };

  /**
   * Renders the search results
   * @param {any} item The item to render
   * @returns {JSX.Element} The search result
   */
  const renderSearchResults = ({ item }: any): JSX.Element => {
    if (!item.poster_path) {
      return (
        <View style={styles.search_result_item_container_padded}>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center' }}
            onPress={() => {
              setSelectedResult(item);
              handleLoadResultData(item);
            }}>
            <Text
              style={{
                ...styles.search_result_item_text,
                fontWeight: 'bold',
                fontSize: 25,
                color: '#fff',
              }}>
              {item.title || item.name || item.original_title || item.original_name}
            </Text>
            <Text style={styles.search_result_item_text}>
              {DateFormatter(item.release_date || item.first_air_date)}
            </Text>
            <Text style={styles.search_result_item_text}>
              {item.overview ? `${item.overview.substring(0, 150)} ...` : 'No overview available'}
            </Text>
            <Text style={{ ...styles.search_result_item_text, fontWeight: 'bold', color: '#fff' }}>
              Click to show more
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.search_result_item_container}>
          <TouchableOpacity
            onPress={() => {
              setSelectedResult(item);
              handleLoadResultData(item);
            }}>
            <Image
              style={styles.search_result_item_image}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              alt={item.title || item.name || item.original_title || item.original_name}
              referrerPolicy="no-referrer"
            />
          </TouchableOpacity>
        </View>
      );
    }
  };

  // Watches for a change in the show type and searches if it does
  React.useEffect(() => {
    searchForShow(searchTerm);
  }, [showType]);

  // Watches for a change in the search term and searches if it does after a delay
  React.useEffect(() => {
    const query = searchTerm;
    const timeoutId = setTimeout(() => searchForShow(query), 150);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Watches for a change in the window width and adjusts the styles accordingly
  React.useEffect(() => {
    if (window.innerWidth < 600) {
      setNumColumns(1);
      setStyles(stylesS);
    } else if (window.innerWidth < 992) {
      setNumColumns(2);
      setStyles(stylesM);
    } else if (window.innerWidth < 1200) {
      setNumColumns(3);
      setStyles(stylesL);
    } else {
      setNumColumns(4);
      setStyles(stylesXL);
    }
  }, [useWindowDimensions().width]);

  //
  React.useEffect(() => {
    if (loadedResultData) {
      setResultModalVisible(true);
      setLoadedResultData(false);
      setGenreData('');
    }
  }, [loadedResultData]);

  return (
    <View style={styles.body_container}>
      <View style={styles.show_type_switch_container}>
        <Modal
          animationType="fade"
          visible={resultModalVisible}
          transparent
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setSelectedResult({});
            setResultModalVisible(!resultModalVisible);
            setGenreData('');
          }}>
          <View style={styles.modalBackground}>
            <View style={styles.modalBody}>
              <Pressable
                style={styles.modalCloseText}
                onPress={() => {
                  setSelectedResult({});
                  setResultModalVisible(!resultModalVisible);
                  setGenreData('');
                }}>
                &times;
              </Pressable>
              <Text style={{ ...styles.modalHeader, marginRight: 22 }}>
                {selectedResult.title ||
                  selectedResult.name ||
                  selectedResult.original_title ||
                  selectedResult.original_name}
              </Text>
              <View style={universalStyles.divider} />
              <Text style={styles.modalHeader}>Release Date:</Text>
              <Text style={styles.modalText}>
                {DateFormatter(selectedResult.release_date || selectedResult.first_air_date)}
              </Text>
              <View style={universalStyles.divider} />
              <Text style={styles.modalHeader}>Rating:</Text>
              <Text style={styles.modalText}>
                {parseFloat(selectedResult.vote_average).toFixed(1) || 'No rating available'}
              </Text>
              <View style={universalStyles.divider} />
              <Text style={styles.modalHeader}>Genres:</Text>
              <Text style={styles.modalText}>{genreData || 'No genres available'}</Text>
              <View style={universalStyles.divider} />
              <Text style={styles.modalHeader}>Overview:</Text>
              <Text style={styles.modalText}>
                {selectedResult.overview || 'No overview available'}
              </Text>
            </View>
          </View>
        </Modal>
        <Pressable
          style={
            movieTypeButtonHover || movieTypeButtonPressed
              ? { ...styles.show_type_switch_button, backgroundColor: buttonColor }
              : styles.show_type_switch_button
          }
          onHoverIn={() => setMovieTypeButtonHover(true)}
          onHoverOut={() => setMovieTypeButtonHover(false)}
          onPress={() => {
            if (tvShowTypeButtonPressed) {
              setTvShowTypeButtonPressed(false);
            }
            setMovieTypeButtonPressed(true);
            setShowType('movie');
          }}>
          <Text
            style={
              movieTypeButtonHover || movieTypeButtonPressed
                ? { ...styles.show_type_switch_button_text, color: '#fff' }
                : styles.show_type_switch_button_text
            }>
            Movies
          </Text>
        </Pressable>
        <Pressable
          style={
            tvShowTypeButtonHover || tvShowTypeButtonPressed
              ? { ...styles.show_type_switch_button, backgroundColor: buttonColor }
              : styles.show_type_switch_button
          }
          onHoverIn={() => setTvShowTypeButtonHover(true)}
          onHoverOut={() => setTvShowTypeButtonHover(false)}
          onPress={() => {
            if (movieTypeButtonPressed) {
              setMovieTypeButtonPressed(false);
            }
            setTvShowTypeButtonPressed(true);
            setShowType('tv');
          }}>
          <Text
            style={
              tvShowTypeButtonHover || tvShowTypeButtonPressed
                ? { ...styles.show_type_switch_button_text, color: '#fff' }
                : styles.show_type_switch_button_text
            }>
            TV-Shows
          </Text>
        </Pressable>
      </View>
      <TextInput
        style={
          searchTerm.length !== 0 ? { ...styles.search_input, color: '#fff' } : styles.search_input
        }
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search for a movie or TV show..."
      />
      <FlatList
        key={numColumns}
        style={{ ...styles.search_results_output_container, overflow: 'visible' }}
        numColumns={numColumns}
        data={searchResults}
        contentContainerStyle={{ display: 'flex', gap: 10, justifyContent: 'center' }}
        ListEmptyComponent={
          <Text style={{ color: '#fff', textAlign: 'center' }}>
            {searchTerm.length === 0 ? 'No search term provided' : 'No results found'}
          </Text>
        }
        renderItem={renderSearchResults}
      />
    </View>
  );
}
