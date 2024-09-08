import { StyleSheet } from 'react-native';

import { backgroundColor, secondaryColor, mutedText, buttonColor } from './colours';

const normalShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 3 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

export const universalStyles = StyleSheet.create({
  body_container: {
    height: '100%',
    backgroundColor,
    alignItems: 'center',
    overflow: 'scroll',
  },
  divider: {
    width: '100%',
    borderColor: '#4a4e52',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
  },
  show_type_switch_container: {
    ...normalShadow,
    display: 'flex',
    justifyContent: 'center',
    maxWidth: 1200,
    backgroundColor: secondaryColor,
    borderRadius: 10,
  },
  show_type_switch_button: {
    padding: 8,
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderColor: buttonColor,
    borderWidth: 2,
  },
  show_type_switch_button_text: {
    color: buttonColor,
    textAlign: 'center',
  },
  search_input: {
    ...normalShadow,
    maxWidth: 1200,
    backgroundColor: secondaryColor,
    borderRadius: 10,
    color: mutedText,
  },
  search_results_output_container: {
    display: 'flex',
    maxWidth: 1200,
    marginTop: 20,
    marginBottom: 20,
  },
  search_result_item_container: {
    ...normalShadow,
    margin: 'auto',
    backgroundColor: secondaryColor,
    marginBottom: 4,
    borderRadius: 10,
  },
  search_result_item_container_padded: {
    ...normalShadow,
    padding: 10,
    margin: 'auto',
    marginBottom: 4,
    aspectRatio: 0.7,
    backgroundColor: secondaryColor,
    borderRadius: 10,
    justifyContent: 'center',
  },
  search_result_item_text: {
    color: mutedText,
    textAlign: 'center',
    padding: 5,
  },
  search_result_item_image: {
    aspectRatio: 0.7,
    borderRadius: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalBody: {
    display: 'flex',
    maxWidth: 1000,
    margin: 20,
    backgroundColor: secondaryColor,
    borderRadius: 20,
    padding: 15,
    overflow: 'scroll',
  },
  modalHeader: {
    fontSize: 22,
    marginBottom: 5,
    marginLeft: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#fff',
  },
  modalCloseText: {
    position: 'absolute',
    color: mutedText,
    fontSize: 40,
    lineHeight: 25,
    alignSelf: 'flex-end',
  },
});

export const stylesS = StyleSheet.create({
  body_container: {
    ...universalStyles.body_container,
  },
  show_type_switch_container: {
    ...universalStyles.show_type_switch_container,
    width: '95%',
    padding: 15,
    paddingTop: 15,
    paddingBottom: 15,
    margin: 15,
    gap: 15,
  },
  show_type_switch_button: {
    ...universalStyles.show_type_switch_button,
    width: '100%',
  },
  show_type_switch_button_text: {
    ...universalStyles.show_type_switch_button_text,
    fontSize: 14,
  },
  search_input: {
    ...universalStyles.search_input,
    width: '95%',
    fontSize: 14,
    padding: 14,
  },
  search_results_output_container: {
    ...universalStyles.search_results_output_container,
    width: '80%',
  },
  search_result_item_container: {
    ...universalStyles.search_result_item_container,
    width: '100%',
  },
  search_result_item_container_padded: {
    ...universalStyles.search_result_item_container_padded,
    width: '100%',
  },
  search_result_item_text: {
    ...universalStyles.search_result_item_text,
  },
  search_result_item_image: {
    ...universalStyles.search_result_item_image,
  },
  modalBackground: {
    ...universalStyles.modalBackground,
  },
  modalBody: {
    ...universalStyles.modalBody,
    width: '95%',
    height: '95%',
  },
  modalHeader: {
    ...universalStyles.modalHeader,
  },
  modalText: {
    ...universalStyles.modalText,
  },
  modalCloseText: {
    ...universalStyles.modalCloseText,
  },
});

export const stylesM = StyleSheet.create({
  body_container: {
    ...universalStyles.body_container,
  },
  show_type_switch_container: {
    ...universalStyles.show_type_switch_container,
    flexDirection: 'row',
    width: '80%',
    padding: 30,
    paddingTop: 20,
    paddingBottom: 20,
    margin: 20,
    gap: 20,
  },
  show_type_switch_button: {
    ...universalStyles.show_type_switch_button,
    width: '50%',
  },
  show_type_switch_button_text: {
    ...universalStyles.show_type_switch_button_text,
    fontSize: 18,
  },
  search_input: {
    ...universalStyles.search_input,
    width: '80%',
    fontSize: 18,
    padding: 18,
  },
  search_results_output_container: {
    ...universalStyles.search_results_output_container,
    width: '80%',
  },
  search_result_item_container: {
    ...universalStyles.search_result_item_container,
    width: '49%',
  },
  search_result_item_container_padded: {
    ...universalStyles.search_result_item_container_padded,
    width: '49%',
  },
  search_result_item_text: {
    ...universalStyles.search_result_item_text,
  },
  search_result_item_image: {
    ...universalStyles.search_result_item_image,
  },
  modalBackground: {
    ...universalStyles.modalBackground,
  },
  modalBody: {
    ...universalStyles.modalBody,
    width: '75%',
    height: '85%',
  },
  modalHeader: {
    ...universalStyles.modalHeader,
  },
  modalText: {
    ...universalStyles.modalText,
  },
  modalCloseText: {
    ...universalStyles.modalCloseText,
  },
});

export const stylesL = StyleSheet.create({
  body_container: {
    ...universalStyles.body_container,
  },
  show_type_switch_container: {
    ...universalStyles.show_type_switch_container,
    flexDirection: 'row',
    width: '80%',
    padding: 30,
    paddingTop: 20,
    paddingBottom: 20,
    margin: 20,
    gap: 20,
  },
  show_type_switch_button: {
    ...universalStyles.show_type_switch_button,
    width: '50%',
  },
  show_type_switch_button_text: {
    ...universalStyles.show_type_switch_button_text,
    fontSize: 18,
  },
  search_input: {
    ...universalStyles.search_input,
    width: '80%',
    fontSize: 18,
    padding: 18,
  },
  search_results_output_container: {
    ...universalStyles.search_results_output_container,
    width: '80%',
  },
  search_result_item_container: {
    ...universalStyles.search_result_item_container,
    width: '32%',
  },
  search_result_item_container_padded: {
    ...universalStyles.search_result_item_container_padded,
    width: '32%',
  },
  search_result_item_text: {
    ...universalStyles.search_result_item_text,
  },
  search_result_item_image: {
    ...universalStyles.search_result_item_image,
  },
  modalBackground: {
    ...universalStyles.modalBackground,
  },
  modalBody: {
    ...universalStyles.modalBody,
    width: '60%',
    height: '60%',
  },
  modalHeader: {
    ...universalStyles.modalHeader,
  },
  modalText: {
    ...universalStyles.modalText,
  },
  modalCloseText: {
    ...universalStyles.modalCloseText,
  },
});

export const stylesXL = StyleSheet.create({
  body_container: {
    ...universalStyles.body_container,
  },
  show_type_switch_container: {
    ...universalStyles.show_type_switch_container,
    flexDirection: 'row',
    width: '80%',
    padding: 30,
    paddingTop: 20,
    paddingBottom: 20,
    margin: 20,
    gap: 20,
  },
  show_type_switch_button: {
    ...universalStyles.show_type_switch_button,
    width: '50%',
  },
  show_type_switch_button_text: {
    ...universalStyles.show_type_switch_button_text,
    fontSize: 18,
  },
  search_input: {
    ...universalStyles.search_input,
    width: '80%',
    fontSize: 18,
    padding: 18,
  },
  search_results_output_container: {
    ...universalStyles.search_results_output_container,
    width: '80%',
  },
  search_result_item_container: {
    ...universalStyles.search_result_item_container,
    width: '24%',
  },
  search_result_item_container_padded: {
    ...universalStyles.search_result_item_container_padded,
    width: '24%',
  },
  search_result_item_text: {
    ...universalStyles.search_result_item_text,
  },
  search_result_item_image: {
    ...universalStyles.search_result_item_image,
  },
  modalBackground: {
    ...universalStyles.modalBackground,
  },
  modalBody: {
    ...universalStyles.modalBody,
    width: '60%',
    height: '60%',
  },
  modalHeader: {
    ...universalStyles.modalHeader,
  },
  modalText: {
    ...universalStyles.modalText,
  },
  modalCloseText: {
    ...universalStyles.modalCloseText,
  },
});
