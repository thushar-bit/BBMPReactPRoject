import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      //Address
      "propertyEID": "Property EID",
      "city": "City",
      "district": "District",
      "wardNumber": "	Ward No. and Name",
      "propertyNumber": "Property Number",
      "ownerName": "Owner Name",
      "streetName": "Street Name",
      "doorPlotNo": "Door/Plot No",
      "buildingLandName": "Building/Land Name",
      "street": "Street",
      "nearestLandmark": "Nearest Landmark",
      "pincode": "Pincode",
      "areaLocality": "Area/Locality",
      "uploadPropertyPhoto": "Image of the Property (front view) ",
      "save": "Save & Next",
      "clear": "Clear",
      "SASBaseApplicationNo":"SAS Base Application No",
      //info
      "propertyEIDInfo": "This is the unique identifier for the property.",
      "cityInfo": "The city where the property is located.",
      "districtInfo": "The district where the property is located.",
      "wardNumberInfo": "The ward number assigned to the property.",
      "propertyNumberInfo": "The official property number.",
      "ownerNameInfo": "The name of the property owner.",
      "streetNameInfo": "The name of the street where the property is located.",
      "doorPlotNoInfo": "The door or plot number of the property.",
      "buildingLandNameInfo": "The name of the building or land.",
      "streetInfo": "The street address of the property.",
      "nearestLandmarkInfo": "A nearby landmark for easier identification.",
      "pincodeInfo": "The postal code of the property area.",
      "areaLocalityInfo": "The area or locality of the property.",
      "uploadPropertyPhotoInfo": "Image of the Property (front view) ",
      "DataAvailableInBBMPBooks":"Data Available In BBMP Books",
      "PostalAddressofProperty":"Postal Address of Property",
       "Uploadfile":"Upload file",
       //Area Dimension
       //BBDDraft
       //SiteDetails
       //Building Detail
       //Multistorey
       //Owner
       //Kaveri
       //Document
       //classification Document
    }
  },
  kn: {
    translation: {
      //address
      "propertyEID": "ಸ್ಥಿರ ID",
      "city": "ನಗರ",
      "district": "ಜಿಲ್ಲೆ",
      "wardNumber": "ವಾರ್ಡ್ ಸಂಖ್ಯೆ",
      "propertyNumber": "ಸ್ಥಿರ ಸಂಖ್ಯೆ",
      "ownerName": "ಮಾಲಿಕರ ಹೆಸರು",
      "streetName": "ರಸ್ತೆಯ ಹೆಸರು",
      "doorPlotNo": "ಬಾಗಿಲು / ಪ್ಲಾಟ್ ಸಂಖ್ಯೆ",
      "buildingLandName": "ಭವನ / ಜಮೀನು ಹೆಸರು",
      "street": "ರಸ್ತೆ",
      "nearestLandmark": "ಹತ್ತಿರದ ಗುರುತು",
      "pincode": "ಪಿನ್‌ಕೋಡ್",
      "areaLocality": "ಪ್ರದೇಶ / ಸ್ಥಳ",
      "uploadPropertyPhoto": "ಸ್ಥಿರದ ಫೋಟೋ ಅಪ್ಲೋಡ್ ಮಾಡಿ",
      "save": "ಉಳಿಸಿ",
      "clear": "ಅಳಿಸು",
      "propertyEIDInfo": "ಇದು ಸ್ಥಿರದ ಅನನ್ಯ ಗುರುತಿನ ಸಂಖ್ಯೆ.",
      "cityInfo": "ಸ್ಥಿರವು ಇರುವ ನಗರ.",
      "districtInfo": "ಸ್ಥಿರವು ಇರುವ ಜಿಲ್ಲೆ.",
      "wardNumberInfo": "ಸ್ಥಿರಕ್ಕೆ ನಿಯೋಜಿಸಲಾದ ವಾರ್ಡ್ ಸಂಖ್ಯೆ.",
      "propertyNumberInfo": "ಅಧಿಕೃತ ಸ್ಥಿರ ಸಂಖ್ಯೆ.",
      "ownerNameInfo": "ಸ್ಥಿರ ಮಾಲಿಕರ ಹೆಸರು.",
      "streetNameInfo": "ಸ್ಥಿರವು ಇರುವ ರಸ್ತೆಯ ಹೆಸರು.",
      "doorPlotNoInfo": "ಸ್ಥಿರದ ಬಾಗಿಲು ಅಥವಾ ಪ್ಲಾಟ್ ಸಂಖ್ಯೆ.",
      "buildingLandNameInfo": "ಭವನ ಅಥವಾ ಜಮೀನು ಹೆಸರು.",
      "streetInfo": "ಸ್ಥಿರದ ರಸ್ತೆ ವಿಳಾಸ.",
      "nearestLandmarkInfo": "ನಿಮಗೆ ಸುಲಭವಾಗಿ ಗುರುತಿಸಲು ಹತ್ತಿರದ ಗುರುತು.",
      "pincodeInfo": "ಸ್ಥಿರ ಪ್ರದೇಶದ ಅಂಚೆ ಕೋಡ್.",
      "areaLocalityInfo": "ಸ್ಥಿರದ ಪ್ರದೇಶ ಅಥವಾ ಸ್ಥಳ.",
      "uploadPropertyPhotoInfo": "ಸ್ಥಿರದ ಫೋಟೋ ಅಪ್ಲೋಡ್ ಮಾಡಿ.",
      "DataAvailableInBBMPBooks":"BBMP ಪುಸ್ತಕಗಳಲ್ಲಿ ಡೇಟಾ ಲಭ್ಯವಿದೆ",
      "PostalAddressofProperty":"ಆಸ್ತಿಯ ಅಂಚೆ ವಿಳಾಸ",
      "Uploadfile":"ಫೈಲ್ ಅನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ",
      //Area Dimension
       //BBDDraft
       //SiteDetails
       //Building Detail
       //Multistorey
       //Owner
       //Kaveri
       //Document
       //classification Document
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
