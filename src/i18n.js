import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      //Address
      "propertyEID": "Property EID",
      "city": "City",
      "district": "District",
      "wardNumber": "	Ward No. and Ward Name",
      "propertyNumber": "Property Number",
      "ownerName": "Owner Name",
      "streetName": "Street Name",
      "doorPlotNo": "Door/Plot No",
      "buildingLandName": "Building/Land Name",
      "street": "Street",
      "lattitude":"Lattitude",
      "longitude":"Longitude",
      "nearestLandmark": "Nearest Landmark",
      "pincode": "Pincode",
      "areaLocality": "Area/Locality",
      "uploadPropertyPhoto": "Image of the Property (front view) ",
      "save": "Save & Next",
      "Save":"Save",
      "clear": "Clear",
      "SASBaseApplicationNo":"SAS Base Application No",
      "DeleteImage":"Delete Image",
      "VerifySASApplicationNumber":"Verify SAS Application Number ",
      "KHATHASURVEYNO":"KHATHA SURVEY NO",
      "PropertyAddress":"Property Address",
      "PropertyNature":"Property Nature",
      "SiteArea":"Site Area",
      "BuiltUpArea":"Built Up Area",
     
      "SelectthePropertyType":"Select the Property Type",


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
       "PropertyUseDetails":"Property Use Details",
       "ScheduleOfTheProperty":"Schedule Of The Property",
       "Modify":"Modify",
       "NoModifications":"No Modifications",
       "East":"East",
       "West":"West",
       "North":"North",
       "South":"South",
       "PropertyDimensions":"Property Dimensions",
       "OddSite":"Odd Site",
        "Yes":"Yes",
        "No":"No",
        "NoofSides":"No of Sides",
        "Additional Details":"Additional Details",
        "RoadFacedSideLength":"Road Faced Side Length (Ft)",
        "Length":"Length",
        "next":"NEXT",
        "Previous":"PREVIOUS",
        "Built-UpArea(ft)":"Built-Up Area (Sq.ft)",
        "Built-UpArea(mt)":"Built-Up Area (Sq.Mt)",
        "CarpetArea":"Carpet Area (in Sq.mts.)",
        "AdditionalArea":"Additional Area(in Sq.mts.)",
        "SuperBuiltArea":"Super Built Area (in Sq.mts.",
        "AsPerBBMPBooks":"As Per Books",

       //BBDDraft
        "PendingPropertyList":"List of Pending Property Details",
        "ZoneName":"Zone Name :",
        "WardName":"Ward Name :",
        "SearchType":"Search Type :",
        "Search": "Search",
       
        "AssessmentNo":"Assessment No",
        "SASApplicationNo":"SAS ApplicationNo",
        "OpenProperty": "Submit Information for Final EKhata",
        "ClickHere":"Click Here",
        "Reset":"Reset",


       //SiteDetails
       "UsageCategory":"Usage Category :",
      
         "Typeofuse"  :"Type of use(Sub Category) :",
         "YearUsage":"Year Usage",
         "DetailsOfUsageOfVacantPlot":"Details Of Usage Of Vacant Plot",
       //Building Detail
       "DetailsOfUsageOfBuilt-upArea":"Details Of Usage Of Built-up Area",
       "BuildingNumber":"Building Number:",
       "BuildingName":"Building Name :",
       "floornumber":"Floor Number :",
       "SelfUseAreafts":"Self Use Area (in Sq.fts.):",
       "SelfUseArea":"Self Use Area",
       "RentedArea":"Rented Area",
       "TotalArea":"Total Area",
       "RentedAreafts":"Rented Area (in Sq.fts.):",
       "TotalAreafts":"Total Area (in Sq.fts.)",
       "SelfUseAreamts":"Self Use Area(in Sq.mts.)",
       "RentedAreamts":"Rented Area(in Sq.mts.)",
       "TotalAreamts":"Total Area (in Sq.mts.)",
       "BESCOMCustomerID":"BESCOM Customer ID :",
       "BWSSBMeterNumber":"BWSSB Meter Number :",
       "Edit":"Edit",
       "Delete":"Delete",
       //Multistorey
       "DetailsOfUsageOfFlat":"Details Of Usage Of Multi-Storey Flat",
       "BlockName":"Block Name",
    
       "FlatNo":"Flat No",
        "ParkingFacility":"Parking Facility",
       "Totalnumberofparkingunits":"Total number of parking units :",
       "TotalParkingArea":"Total Parking Area(in Sq. mts.)",
       "Occupancy":"Occupancy :",
       "SelectOwnerShareType":"Select Owner Share Type :",
       //"OwnersShareAreaSqmts":"OwnersShareAreaSqmts",
       "BLOCKNO":"BLOCK NO",
        "FLOORNO":"FLOOR NO",
       "CARPETAREA":"CARPET AREA",
       "ADDITIONALAREA":"ADDITIONALAREA",
       "SUPERBUILTUPAREA":"SUPERBUILTUPAREA",
       "PARKINGAVAILABLE":"PARKINGAVAILABLE",
       "PARKINGUNITS":"PARKINGUNITS",
       "PARKINGAREA":"PARKINGAREA",
       "OWNERSHARETYPE":"OWNER SHARE TYPE",
       "SHARETYPEVALUE":"SHARE TYPE VALUE",
       //Owner
       "OwnerShipDetails":"OwnerShip Details",
       "ExistingDigitization":"Existing Owners As Per Digitization",
       "ADDNEWOWNER":"ADD NEW OWNER",
       "OwnersToBeAddedine-Khatha":"Owners To Be Added in e-Khatha",
       "OwnerNo.":"Owner No.",
       "MobileValidation":"If the mobile number is changed, then it needs to be verified with the OTP",
       "OwnerName":"Owner Name",
       "Father/Mother/Husband/SpouseName":"Father/ Mother/ Husband/ Spouse Name",
       "Address":"Address",
       "E-KYCStatus":"E-KYC Status",
       "OwnerStatus":"Owner Status",
       "VerifyE-KYC":"Verify E-KYC",
       "RETAINED":"RETAINED",
       "DELETED":"DELETED",
       "Re-AddDeletedOwner":"Re-Add Deleted Owner",
       "RelationshipType":"Relationship Type",
       "RelationName":"Relation Name",
       "Gender":"Gender",
       "Male":"Male",
       "Female":"Female",
       "Other":"Others",
       "DateOfBirth":"Date Of Birth",
       "OwnerMaskedAadhar":"Owner Masked Aadhar",
       "GenerateOTP":"Generate OTP",
       "VerifyOTP":"Verify OTP",
       "DELETEOWNER":"DELETE OWNER",
       "NAMEMATCHSTATUS":"NAME MATCH STATUS",
       "MobileVerification":"Mobile Verification",
       "MobileNumber":"Mobile Number",
       "OwnerPhoto":"Owner Photo",
       "Nodataavailable":"No data available",
       //Kaveri
       "KAVERISERVICESDATA":"KAVERI REGISTRATION DATA",
       
       "RegistrationNumber":"Registration Number (If Registration Happened After 2003)",
       "oldRegistrationNumber":"For Document Upload (Only when registration happened prior to 2004)",
       "KaveriDocumentData":"Get Kaveri Document Data",
       "Please Enter any One Registration Number":"Please Enter any One Registration Number",
       "EKYC Owner Name":"EKYC Owner Name",
       "Name Match Status":"Name Match Status",
        "DocumentInformation":"Kaveri Document Data",
        "ApplicationNumber":"Application Number",
        "ExecutionDate":"Execution Date",

       "PendingDocumentNumber":"Pending Document Number",
       "FinalRegistrationNumber":"Final Registration Number",
       "PropertyInformation":"Property Details",
       "PropertyID":"Property ID",
       "DocumentID":"Document ID",
       "VillageName":"Village Name",
       "PropertyType":"Property Type",
       

       "Nopropertyinformationavailable":"No property information available",
       "PartyInformation":"Document Owner Data",
       "PartyID":"Party ID",
       "PartyName":"Party Name",
       "Age":"Age",
       "KaveriMessage1":"20-years EC of property from Sub-Register with effect from 01.04.2004 until now",
       "KaveriMessage2":"Enter EC Number of EC from 01.04.2004 until now",
       "ECDocumentNumber":"EC Document Number",
       "FetchECData":"Fetch EC Data",
       "Description":"Description",
       "DocumentSummary":"Document Summary",
       "DocumentValuation":"Document Valuation",

      
       "Executants":"Executants",
           //Document
       "EligibilityDocuments":"Eligibility Documents",
       "Oneoftheaccompany":"(* One of the accompanying documents must be uploaded)",
       "DocumentType":"Document Type :",
       "DocumentRegisteredDate":"Document Registered Date (dd-mm-yyyy)",

       "DocumentDetails":"Document Details:",
       "DocumentNumber :":"Document Number :",
       "MaximumFileSizeMB":"Maximum File Size should not exceed 5 MB",
       "Save+":"Save +",
       "DocumentsUploaded":"Documents Uploaded",
 //classification Document
       "Document":"Document",
    
      
       "DocumentRegistered Date":"Document Registered Date",
       "UploadedDocument":"Uploaded Document",
       "PropertyClassificationDocuments":"Property Classification Documents",
       "PropertyClassificationAsPerBooks":"Property Classification As Per Books",
       "PropertyClassification":"Property Classification",
       "AKhathaclaimbasedon":"A-Khatha claim based on :",

       "PrivateLayout":"Private Layout Or Apartment-duly approved",
       "House/Site":"House/Site granted/alloted by Govt or Govt-Agency",
       "OwnLayoutOfBDA/DevelopmentAuthority":"Own Layout Of BDA/Development Authority",
       "GP/MunicipalityKhatabeforemergerwithBBMP":"GP/Municipality A-Khata before merger with BBMP",
       "Others":"Others - (Specify)",
       "SaveClassificationDetails":"Save Classification Details",

       "EditClassificationDetails":"Edit Classification Details",
      
      
       "DocumentNumber":"Document Number :",
       "AddDocument+":"Add Document +",
       
       "Finish":"Finish",
   //toast validations
        "No SAS Applications Found":"No SAS Applications Found",
          "Please Select Only '.jpg','.jpeg','.png' File":"Please Select Only '.jpg','.jpeg','.png' File",
          "File size exceeds 500 KB limit":"File size exceeds 500 KB limit",
          "There is a issue while copying the data from Book Module.No Data Found":"There is a issue while copying the data from Book Module.No Data Found",
          "Please Upload the New Property Photo":"Please Upload the New Property Photo",
          "Please Select the Property Type":"Please Select the Property Type",
          "Please ensure all Checkbandhi values are Entered":"Please ensure all Checkbandhi values are Entered",
          "Please ensure all Apartment values are Entered and More than 0":"Please ensure all Apartment values are Entered and More than 0",
         "copySuccess": "Copy From BBMP Books Data Was Successful.",
"copyFailed": "Something Went wrong. Copy of Book Data was Not Successful.",
"enterDoorNo": "Please Enter the Door No",
"detailsSavedSuccess": "Details Saved Successfully",
"saveAddressFirst": "Please Save the Address Details Before Going to Next Step",
"errorSavingData": "Error saving data",
"provideSasAppNumber": "Please Provide SAS Application Number",
"errorFetchingSasDetails": "An error occurred while fetching the SAS details.",
"saveDetailsBeforeNextSection": "Please Save the Details Before Going to Next Section",
"propertyTypeNotFound": "Property Type Not Found",
"selectZone": "Please Select A Zone",
"selectWard": "Please Select A Ward",
"enterSearchType": "Please Enter Search Type",
"enterSearchText": "Please Enter Search Text",
"fileSizeExceeded": "File size exceeds 5 MB limit",
"selectPdfFileOnly": "Please Select Only '.pdf' File",
"selectKathaClaim": "Please Select A Katha Claim",
"enterDocumentDetails": "Please Enter Document Details",
"classificationSavedSuccess": "Classification Details Saved Successfully",
"saveClassificationBeforeUpload": "Please Save Classification Details Before Uploading the Document",
"uploadRequiredDocument": "Please Upload the Required Document",
"provideRegisteredDate": "Please Provide Document Registered Date",
"Document Registered Date cannot be greater than today": "Document Registered Date cannot be greater than today",
"Document Uploaded Successfully": "Document Uploaded Successfully",
"Details Deleted Successfully": "Details Deleted Successfully",
"errorDeletingData": "Error Deleting data!",
"Please Enter the Registration Number": "Please Enter the Registration Number",
"detailsFetchedSuccess": "Details Fetched Successfully",
"detailsDeletedSuccess":"Details Deleted Successfully",
"enterRegistrationNumberFirst": "Please Enter Registration Number First",
"enterEcDocumentNumber": "Please Enter the EC Document Number",
"registrationNumberNotExist": "The Given Document Registration Number Does Not Exist With EC Details.\nPlease Provide Correct Document Registration Number.",
"errorFetchingEcData": "Error Getting EC Property data!",
"otpSentSuccess": "OTP Sent Successfully",
"otpVerifiedSuccess": "OTP Verified Successfully",
"ownerDeletedSuccess": "Owner Deleted Successfully",
"ECError":"The Given Registration Number Does Not Match With EC Details.\nPlease Provide Correct Registration Number",
"retainingOwnersNameMismatch": "All Retaining Owners Should Have their Name Matching with the existing Owners.",
"ownersMobileNotVerified": "All Owners Should Have their mobile Number Verified.",
"ownersRelationNameMissing": "All Owners Should Have their Relation Name.",
"ownersRelationTypeMissing": "All Owners Should Have their Relation Type.",
"atleastOneOwnerRequired": "At least One Owner should be Added for E-Katha Verification",
"verifyOtp": "Verify the OTP!",
"selectRelationshipType": "Please Select Relationship Type",
"enterRelationName": "Please enter the Relation Name",
"enterValidMobileNumber": "Please enter a valid Mobile Number",
"ownerEditedSuccess": "Owner Edited Successfully",
"eKycCompleted": "E-KYC completed successfully with txnno:",

//Yup Validations
"doorPlotNumber": "Door/Plot Number is required",
"doorName": "Door Name cannot be 0",
"buildingLandNameRequired": "Building/Land Name is required",
"areaLocalityRequired": "Area/Locality is required",
"nearestLandmarkRequired": "Nearest Landmark is required",
"pincodeRequired": "Pincode is required",
"pincodeInvalid": "Pincode must be a 6-digit number",
"PropertyTypeInvalid":"PropertyType is Required",
"PropertyTypeCannotBeZero":"PropertyType Cannot Be Select",
"sasApplicationNumber": "SAS Application Number is required",
"sasNumberInvalid": "SAS Number cannot be '0'",
"streetNameRequired": "Street Name is required",
"streetNameInvalid": "Street Name cannot be '0'",
"latitudeRequired": "Latitude is required",
"longitudeRequired": "Longitude is required",
"latitudeInvalid": "Latitude cannot be '0'",
"longitudeInvalid": "Longitude cannot be '0'",
"buildingNumberRequired": "Building Number is required",
"buildingNameRequired": "Building Name is required",
"floorNumberRequired": "Floor Number is required",
"usageCategoryRequired": "Usage Category is required",
"yearUsageRequired": "Year Usage is required",
"typeOfUseRequired": "Type of Use (subcategory) is required",
"UsageCategoryInvalid":"Usage Category Cannot be Select",
"typeOfUseRequiredInvalid":"Type of Use (subcategory) cannot be Select",
"yearUsageRequiredInvalid": "Year Usage Mush be 4 Digit number",
"selfUseAreaRequired": "Self Use Area is required",
"rentedAreaRequired": "Rented Area is required",
"documentTypeRequired": "Document Type is required",
"documentNumberRequired": "Document Number is required",
"blockNumberRequired": "Block Number is required",
"flatNumberRequired": "Flat No is required",
"occupancyRequired": "Occupancy is required",
"ownerShareAreaRequired": "Owner Share Area is required",
"ownerShareTypeRequired": "Owner Share Type is required",
 "usageCategorydefault":"Usage Category Cannot be Select",
 "typeOfUseDefault":"Usage Category Cannot be Select",



      //error messages
      //disclamer
"disclamerMessage1":"Do you confirm that the provided details are correct and that you wish to submit the application?",
"disclamerMessage2":"In case of core wards [south, east + west zones], the existing A-katha properties will be issued A-katha upon submission of UpToDate information of existing owners along with their Aadhaar etc. Registered deed and other supporting documents are optional.",
"disclamerMessage3":"In case of any additional owner or change in name etc., registered deed or other supporting documents are mandatory.",
"disclamerMessage4":"In case of MAR 19 properties for old ULBs merged with BBMP, the relevant MAR 19 register scan must be cited for approval of A-katha.",
"disclamerMessage5":"In case old GP properties either eswathu registration of Form 9 or original Form 9 scan of register of GP is mandatory for A-katha.",
"disclamerMessage6":"In every other case, registered deed or allotment by govt Authority Agency with conversion of other approvals by KTCP Act 1961 is mandatory for A-katha.",
"disclamerMessage7":"Properties on Govt lands / rajakaluve / lakes / etc. will not get final ekatha in general.",
"disclamerMessage8":"I understand",
"disclamerMessage9":"Submit",
"disclamerMessage10":"Cancel",
"disclamer":"Disclamer"

    }
  },
  kn: {
    translation: {
      //address
      "propertyEID": "ಸ್ಥಿರ ID",
      "city": "ನಗರ",
      "district": "ಜಿಲ್ಲೆ",
      "wardNumber": "ವಾರ್ಡ್ ಸಂಖ್ಯೆ ಮತ್ತು ವಾರ್ಡ್ ಹೆಸರು",
      "propertyNumber": "ಸ್ಥಿರ ಸಂಖ್ಯೆ",
      "ownerName": "ಮಾಲಿಕರ ಹೆಸರು",
      "streetName": "ರಸ್ತೆಯ ಹೆಸರು",
      "doorPlotNo": "ಬಾಗಿಲು / ಪ್ಲಾಟ್ ಸಂಖ್ಯೆ",
      "buildingLandName": "ಭವನ / ಜಮೀನು ಹೆಸರು",
      "street": "ರಸ್ತೆ",
      "lattitude":"ಅಕ್ಷಾಂಶ",
      "longitude":"ರೇಖಾಂಶ",
      "nearestLandmark": "ಹತ್ತಿರದ ಗುರುತು",
      "pincode": "ಪಿನ್‌ಕೋಡ್",
      "areaLocality": "ಪ್ರದೇಶ / ಸ್ಥಳ",
      "uploadPropertyPhoto": "ಸ್ಥಿರದ ಫೋಟೋ ಅಪ್ಲೋಡ್ ಮಾಡಿ",
      "save": "ಉಳಿಸಿ ಮತ್ತು ಮುಂದೆ ಹೋಗಿ",
      "Save":"ಉಳಿಸಿ",
      "clear": "ಅಳಿಸು",
      "SASBaseApplicationNo":"sas ಮೂಲ ಅಪ್ಲಿಕೇಶನ್ ಸಂಖ್ಯೆ",
      "DeleteImage":"ಚಿತ್ರವನ್ನು ಅಳಿಸಿ",
      "VerifySASApplicationNumber":"SAS ಅಪ್ಲಿಕೇಶನ್ ಸಂಖ್ಯೆಯನ್ನು ಪರಿಶೀಲಿಸಿ ",
      "KHATHASURVEYNO":"ಖಾತಾ ಸರ್ವೆ ನಂ",
      "PropertyAddress":"ಆಸ್ತಿ ವಿಳಾಸ",
      "PropertyNature":"ಆಸ್ತಿಯ ಸ್ವರೂಪ",
      "SiteArea":"ಸೈಟ್ ಪ್ರದೇಶ",
      "BuiltUpArea":"ನಿರ್ಮಿಸಿದ ಪ್ರದೇಶ",
      "Latitude":"ಅಕ್ಷಾಂಶ",
      "Longitude":"ರೇಖಾಂಶ",
      "SelectthePropertyType":"ಆಸ್ತಿ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      //info
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
      "PropertyUseDetails":"ಆಸ್ತಿ ಬಳಕೆಯ ವಿವರಗಳು",
      "ScheduleOfTheProperty":"ಚಕ್ಕುಬಂದಿ",
      "Modify":"ಬದಲಾವಣೆ",
      "NoModifications":"ಯಾವುದೇ ಬದಲಾವಣೆಗಳಿಲ್ಲ",
      "East":"ಪೂರ್ವ",
      "West":"ಪಶ್ಚಿಮ",
      "North":"ಉತ್ತರ",
      "South":"ದಕ್ಷಿಣ",
      "PropertyDimensions":"ನಿವೇಶನ ಅಳತೆ",
      "OddSite":"ಅಸಮ ನಿವೇಶನ",
       "Yes":"ಹೌದು",
       "No":"ಇಲ್ಲ",
       "NoofSides":"ಪಕ್ಷಗಳ ಸಂಖ್ಯೆ",
       "Additional Details":"ಹೆಚ್ಚಿನ ವಿವರಗಳು",
       "RoadFacedSideLength":"ರಸ್ತೆ ಎದುರಿನ ಬದಿಯ ಉದ್ದ (ft)",
       "Length":"ಉದ್ದ",
       "next":"ಮುಂದೆ",
       "Previous":"ಹಿಂದೆ",
       "Built-UpArea(ft)":"ಕಟ್ಟಡ ವಿಸ್ತೀರ್ಣ (Sq.ft)",
       "Built-UpArea(mt)":"ಕಟ್ಟಡ ವಿಸ್ತೀರ್ಣ (ಚ.ಮೀ.ನಲ್ಲಿ)",
       "CarpetArea":"ಕಾರ್ಪೆಟ್ ವಿಸ್ತೀರ್ಣ(ಚ. ಮೀಟರ್ ನಲ್ಲಿ)",
       "AdditionalArea":"ಹೆಚ್ಚಿನ ವಿವರಗಳು(ಚ. ಮೀಟರ್ ನಲ್ಲಿ)",
       "SuperBuiltArea":"ಘಟಕದ ವಿಸ್ತೀರ್ಣ (ಚ.ಮೀ. ಗಳಲ್ಲಿ)",
       "AsPerBBMPBooks":"ಪುಸ್ತಕಗಳ ಪ್ರಕಾರ",

      //BBDDraft
      "PendingPropertyList":"ಅಪೂರ್ಣ ಆಸ್ತಿ ವಿವರಗಳ ಪಟ್ಟಿ",
      "ZoneName":"ಜೋನ್ ಹೆಸರು :",
      "WardName":"ವಾರ್ಡ್ ಹೆಸರು :",
      "SearchType":"ಹುಡುಕಾಟ ಪ್ರಕಾರ :",
      "Search": "ಹುಡುಕು",
     
      "AssessmentNo":"ಮೌಲ್ಯಮಾಪನ ಸಂಖ್ಯೆ",
      "SASApplicationNo":"SAS ಅಪ್ಲಿಕೇಶನ್ ಸಂಖ್ಯೆ",
      "OpenProperty": "ಆಸ್ತಿಯನ್ನು ತೆರೆಯಿರಿ",
      "ClickHere":"ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ",
      "Reset":"ಮರುಹೊಂದಿಸಿ",
      //SiteDetails
      "UsageCategory":"ಬಳಕೆ ವರ್ಗ :",
        "Typeofuse"  :"ಬಳಕೆ :",
        "YearUsage":"ವರ್ಷ ಬಳಕೆ",
        "DetailsOfUsageOfVacantPlot":"ಖಾಲಿ ನಿವೇಶನದ ಬಳಕೆಯ ವಿವರಗಳು",
      //Building Detail
      "DetailsOfUsageOfBuilt-upArea":"ನಿರ್ಮಿತ ಪ್ರದೇಶದ ಬಳಸಿಕೆಯ ವಿವರಗಳು",
      "BuildingNumber":"ಕಟ್ಟಡ ಸಂಖ್ಯೆ:",
      "BuildingName":"ಕಟ್ಟಡದ ಹೆಸರು :",
      "floornumber":"ಮಹಡಿ ಸಂಖ್ಯೆ :",
      "SelfUseAreafts":"ಸ್ವಯಂ ಬಳಕೆಯ ಪ್ರದೇಶ (ಚ.ಅಡಿಗಳಲ್ಲಿ):",
      "RentedAreafts":"ಬಾಡಿಗೆ ಪ್ರದೇಶ (ಚ.ಅಡಿಗಳಲ್ಲಿ):",
      "TotalAreafts":"ಒಟ್ಟು ಪ್ರದೇಶ (ಚ.ಅಡಿಗಳಲ್ಲಿ)",
      "SelfUseArea":"ಸ್ವಯಂ ಬಳಕೆಯ ಪ್ರದೇಶ",
      "RentedArea":"ಬಾಡಿಗೆ ಪ್ರದೇಶ",
      "TotalArea":"ಒಟ್ಟು ಪ್ರದೇಶ",
      "SelfUseAreamts":"ಸ್ವಯಂ ಬಳಕೆಯ ಪ್ರದೇಶ (ಚ.ಮೀ.ಗಳಲ್ಲಿ)",
      "RentedAreamts":"ಬಾಡಿಗೆ ಪ್ರದೇಶ(ಚ.ಮೀ.ಗಳಲ್ಲಿ)",
      "TotalAreamts":"ಒಟ್ಟು ಪ್ರದೇಶ (ಚ.ಮೀ.ಗಳಲ್ಲಿ)",
      "BESCOMCustomerID":"BESCOM Customer ID :",
      "BWSSBMeterNumber":"BWSSB Meter Number :",
      "Edit":"ತಿದ್ದು",
      "Delete":"ಅಳಿಸಿ",
      //Multistorey
      "DetailsOfUsageOfFlat":"ಬಹು ಅಂತಸ್ತಿನ ಫ್ಲಾಟ್‌ನ ಬಳಕೆಯ ವಿವರಗಳು",
      "BlockName":"ಬ್ಲಾಕ್ ಹೆಸರು ",
      "FlatNo":"ಫ್ಲಾಟ್ ಸಂಖ್ಯೆ",
       "ParkingFacility":"ಪಾರ್ಕಿಂಗ್ ಸೌಲಭ್ಯ",
      "Totalnumberofparkingunits":"ಪಾರ್ಕಿಂಗ್ ಘಟಕಗಳ ಒಟ್ಟು ಸಂಖ್ಯೆ :",
      "TotalParkingArea":"ಒಟ್ಟು ಪಾರ್ಕಿಂಗ್ ಪ್ರದೇಶ(ಚ.ಮೀ.ಗಳಲ್ಲಿ)",
      "Occupancy":"ಉಪಯೋಗ :",
      "SelectOwnerShareType":"ಮಾಲೀಕರ ಹಕ್ಕಿನ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ :",
      "Dataavai":"BBMP ಪುಸ್ತಕಗಳಲ್ಲಿ ಡೇಟಾ ಲಭ್ಯವಿದೆ",
      //"OwnersShareAreaSqmts":"OwnersShareAreaSqmts",
      "BLOCKNO":"ಬ್ಲಾಕ್ ಸಂಖ್ಯೆ",
       "FLOORNO":"ಮಹಡಿ ಸಂಖ್ಯೆ",
      "CARPETAREA":"ಕಾರ್ಪೆಟ್ ಪ್ರದೇಶದ",
      "ADDITIONALAREA":"ಹೆಚ್ಚುವರಿ ಪ್ರದೇಶ",
      "SUPERBUILTUPAREA":"ಘಟಕದ ವಿಸ್ತೀರ್ಣ",
      "PARKINGAVAILABLE":"ಪಾರ್ಕಿಂಗ್ ಸೌಲಭ್ಯ",
      "PARKINGUNITS":"ಪಾರ್ಕಿಂಗ್ ಘಟಕಗಳ",
      "PARKINGAREA":"ಪಾರ್ಕಿಂಗ್ ಪ್ರದೇಶದ",
      "OWNERSHARETYPE":"ಮಾಲೀಕರ ಹಕ್ಕಿನ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ  ",
      "SHARETYPEVALUE":"ಹಂಚಿಕೆ ಪ್ರಕಾರದ ಮೌಲ್ಯ",
      //Owner
      "OwnerShipDetails":"ಮಾಲೀಕತ್ವದ ವಿವರಗಳು",
      "ExistingDigitization":"ಡಿಜಿಟಲೈಸೇಶನ್ ಪ್ರಕಾರ ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಮಾಲೀಕರು",
      "ADDNEWOWNER":"ಹೊಸ ಮಾಲೀಕರನ್ನು ಸೇರಿಸಿ",
      "OwnersToBeAddedine-Khatha":"ಇ-ಖಾತಾದಲ್ಲಿ ಮಾಲೀಕರನ್ನು ಸೇರಿಸಬೇಕು",
      "OwnerNo.":"ಮಾಲೀಕರ ಸಂಖ್ಯೆ.",
      "MobileValidation":"ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ಬದಲಾಯಿಸಿದರೆ, ಅದನ್ನು OTP ಯೊಂದಿಗೆ ಪರಿಶೀಲಿಸಬೇಕಾಗುತ್ತದೆ",
      "OwnerName":"ಮಾಲೀಕರ ಹೆಸರು",
      "Father/Mother/Husband/SpouseName":"ತಂದೆ/ತಾಯಿ/ಗಂಡ/ಹೆಂಡತಿ ಹೆಸರು",
      "Address":"ವಿಳಾಸ",
      "E-KYCStatus":"E-KYC ಸ್ಥಿತಿ",
      "OwnerStatus":"ಮಾಲೀಕರ ಸ್ಥಿತಿ",
      "VerifyE-KYC":"E-KYC ಪರಿಶೀಲಿಸಿ ",
      "RETAINED":"ಉಳಿಸಿಕೊಂಡಿದೆ",
      "DELETED":"ಅಳಿಸಲಾಗಿದೆ",
      "Re-AddDeletedOwner":"ಅಳಿಸಿದ ಮಾಲೀಕರನ್ನು ಪುನಃ ಸೇರಿಸಿ",
      "RelationshipType":"ಸಂಬಂಧದ ಪ್ರಕಾರ",
      "RelationName":"ಸಂಬಂಧದ ಹೆಸರು",
      "Gender":"ಲಿಂಗ",
      "Male":"ಪುರುಷ",
      "Female":"ಹೆಣ್ಣು",
      "Other":"ಇತರರು",
      "GenerateOTP":"OTP ರಚಿಸಿ",
      "DateOfBirth":"ಹುಟ್ಟಿದ ದಿನಾಂಕ",
      "OwnerMaskedAadhar":"ಮಾಲೀಕರು ಆಧಾರ್ ಮುಖವಾಡ ಧರಿಸಿದ್ದರು",
      "VerifyOTP":"OTP ಪರಿಶೀಲಿಸಿ",
      "DELETEOWNER":"ಮಾಲೀಕರನ್ನು ಅಳಿಸಿ",
      "NAMEMATCHSTATUS":"ಹೆಸರು ಹೊಂದಾಣಿಕೆಯ ಸ್ಥಿತಿ",
      "MobileVerification":"ಮೊಬೈಲ್ ಪರಿಶೀಲನೆ",
      "MobileNumber":"ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
      "OwnerPhoto":"ಮಾಲೀಕರ ಚಿತ್ರ",
      "Nodataavailable":"ಯಾವುದೇ ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ",
      //Kaveri
      "KAVERISERVICESDATA":"ಕಾವೇರಿ ಸರ್ವೀಸ್ ಡೇಟಾ",
      "RegistrationNumber":"ನೋಂದಣಿ ಸಂಖ್ಯೆ (2003 ರ ನಂತರ ನೋಂದಣಿ ಸಂಭವಿಸಿದಾಗ)",
      "oldRegistrationNumber":"ಡಾಕ್ಯುಮೆಂಟ್ ಅಪ್‌ಲೋಡ್‌ಗಾಗಿ (2004 ರ ಮೊದಲು ನೋಂದಣಿ ಸಂಭವಿಸಿದಾಗ ಮಾತ್ರ)",
      "KaveriDocumentData":"ಕಾವೇರಿ ಡಾಕ್ಯುಮೆಂಟ್ ಡೇಟಾವನ್ನು ಪಡೆಯಿರಿ",
      "Please Enter any One Registration Number":"ದಯವಿಟ್ಟು ಯಾವುದೇ ಒಂದು ನೋಂದಣಿ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
      "EKYC Owner Name":"EKYC ಮಾಲೀಕರ ಹೆಸರು",
      "Name Match Status":"ಹೆಸರು ಹೊಂದಾಣಿಕೆಯ ಸ್ಥಿತಿ",
       "DocumentInformation":"ಡಾಕ್ಯುಮೆಂಟ್ ಮಾಹಿತಿ",
       "ApplicationNumber":"ಅಪ್ಲಿಕೇಶನ್ ಸಂಖ್ಯೆ",
       "ExecutionDate":"Execution ದಿನಾಂಕ",

      "PendingDocumentNumber":"ಬಾಕಿ ಉಳಿದಿರುವ ಡಾಕ್ಯುಮೆಂಟ್ ಸಂಖ್ಯೆ",
      "FinalRegistrationNumber":"ಅಂತಿಮ ನೋಂದಣಿ ಸಂಖ್ಯೆ",
      "PropertyInformation":"ಆಸ್ತಿ ಮಾಹಿತಿ",
      "PropertyID":"ಆಸ್ತಿ ಐಡಿ",
      "DocumentID":"ಡಾಕ್ಯುಮೆಂಟ್ ಐಡಿ",
      "VillageName":"ಗ್ರಾಮದ ಹೆಸರು",
      "PropertyType":"ಆಸ್ತಿ ಪ್ರಕಾರ",
     

      "Nopropertyinformationavailable":"ಯಾವುದೇ ಆಸ್ತಿ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ",
      "PartyInformation":"ಪಕ್ಷದ ಮಾಹಿತಿ",
      "PartyID":"ಪಕ್ಷದ ಐಡಿ",
      "PartyName":"ಪಕ್ಷದ ಹೆಸರು",
      "Age":"ವಯಸ್ಸು",
      "KaveriMessage1":"01.04.2004 ರಿಂದ ಇಲ್ಲಿಯವರೆಗೆ ಅನ್ವಯವಾಗುವಂತೆ ಉಪ-ನೋಂದಣಿಯಿಂದ ಆಸ್ತಿಯ 20 ವರ್ಷಗಳ EC",
      "KaveriMessage2":"01.04.2004 ರಿಂದ ಇಲ್ಲಿಯವರೆಗೆ EC ಯ EC ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
      "ECDocumentNumber":"EC ಡಾಕ್ಯುಮೆಂಟ್ ಸಂಖ್ಯೆ",
      "ECError":"ನೀಡಿರುವ ನೋಂದಣಿ ಸಂಖ್ಯೆಯು EC ವಿವರಗಳೊಂದಿಗೆ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ.\nದಯವಿಟ್ಟು ಸರಿಯಾದ ನೋಂದಣಿ ಸಂಖ್ಯೆಯನ್ನು ಒದಗಿಸಿ",
      "FetchECData":"EC ಡೇಟಾವನ್ನು ಪಡೆದುಕೊಳ್ಳಿ",
      "Description":"ವಿವರಣೆ",
      "DocumentSummary":"ಡಾಕ್ಯುಮೆಂಟ್ ಸಾರಾಂಶ",
      "DocumentValuation":"ಡಾಕ್ಯುಮೆಂಟ್ ಮೌಲ್ಯಮಾಪನ",

     
      "Executants":"Executants",
      "UploadedDocument":"ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ದಾಖಲೆ",
          //Document
      "EligibilityDocuments":"ಅರ್ಹತಾ ದಾಖಲೆಗಳು",
      "Oneoftheaccompany":"(* ಜೊತೆಯಲ್ಲಿರುವ ದಾಖಲೆಗಳಲ್ಲಿ ಒಂದನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಬೇಕು)",
      "DocumentType":"ಡಾಕ್ಯುಮೆಂಟ್ ಪ್ರಕಾರ :",
      "DocumentRegisteredDate":"ಡಾಕ್ಯುಮೆಂಟ್ ನೋಂದಾಯಿತ ದಿನಾಂಕ (dd-mm-yyyy)",

      "DocumentDetails":"ಡಾಕ್ಯುಮೆಂಟ್ ವಿವರಗಳು:",
      "DocumentNumber :":"ಡಾಕ್ಯುಮೆಂಟ್ ಸಂಖ್ಯೆ :",
      "MaximumFileSizeMB":"ಗರಿಷ್ಠ ಫೈಲ್ ಗಾತ್ರವು 5 MB ಮೀರಬಾರದು",
      "DocumentRegistered Date":"ದಾಖಲೆ ನೋಂದಣಿ ದಿನಾಂಕ",
      "Save+":"ಉಳಿಸಿ +",
      "DocumentsUploaded":"ಡಾಕ್ಯುಮೆಂಟ್‌ಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ",
//classification Document
      "Document":"ಡಾಕ್ಯುಮೆಂಟ್",
      "PropertyClassificationDocuments":"ಆಸ್ತಿ ವರ್ಗೀಕರಣ ದಾಖಲೆಗಳು",
      "PropertyClassification As Per Books":"ಪುಸ್ತಕಗಳ ಪ್ರಕಾರ ಆಸ್ತಿ ವರ್ಗೀಕರಣ",
      "PropertyClassification":"ಆಸ್ತಿ ವರ್ಗೀಕರಣ",
      "AKhathaclaimbasedon":"ಎ-ಖಾತಾ ಹಕ್ಕು ಇದರ ಆಧಾರದ ಮೇಲೆ:",

      "PrivateLayout":"ಖಾಸಗಿ ಲೇಔಟ್ ಅಥವಾ ಅಪಾರ್ಟ್ಮೆಂಟ್ - ಸರಿಯಾಗಿ ಅನುಮೋದಿಸಲಾಗಿದೆ",
      "House/Site":"ಸರ್ಕಾರ ಅಥವಾ ಸರ್ಕಾರಿ-ಏಜೆನ್ಸಿಯಿಂದ ಮಂಜೂರು ಮಾಡಿದ/ಹಂಚಿಕೊಂಡಿರುವ ಮನೆ/ನಿವೇಶನ",
      "OwnLayoutOfBDA/DevelopmentAuthority":"ಬಿಡಿಎ/ಅಭಿವೃದ್ಧಿ ಪ್ರಾಧಿಕಾರದ ಸ್ವಂತ ಲೇಔಟ್",
      "GP/MunicipalityKhatabeforemergerwithBBMP":"ಬಿಬಿಎಂಪಿಯೊಂದಿಗೆ ವಿಲೀನಗೊಳ್ಳುವ ಮೊದಲು ಜಿಪಿ/ಮುನ್ಸಿಪಾಲಿಟಿ ಎ-ಖಾತಾ",
      "Others":"ಇತರೆ - (ನಿರ್ದಿಷ್ಟಪಡಿಸಿ)",
      "SaveClassificationDetails":"ವರ್ಗೀಕರಣ ವಿವರಗಳನ್ನು ಉಳಿಸಿ",

      "EditClassificationDetails":"ವರ್ಗೀಕರಣದ ವಿವರಗಳನ್ನು ಸಂಪಾದಿಸಿ",
      
     
     
      "AddDocument+":"ಡಾಕ್ಯುಮೆಂಟ್ ಸೇರಿಸಿ +",
  
      "Finish":"ಮುಗಿಸು",
      //toast validations
 //toast validations
 "No SAS Applications Found":"ಯಾವುದೇ SAS ಅಪ್ಲಿಕೇಶನ್‌ಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
 "Please Select Only '.jpg','.jpeg','.png' File": "ದಯವಿಟ್ಟು '.jpg','.jpeg','.png' ಫೈಲ್ ಮಾತ್ರ ಆಯ್ಕೆಮಾಡಿ",
"File size exceeds 500 KB limit": "ಫೈಲ್ ಗಾತ್ರವು 500 ಕೆಬಿ ಮಿತಿಯು ಮೀರುತ್ತದೆ",
"There is an issue while copying the data from Book Module. No Data Found": "ಪುಸ್ತಕ ಮಾಯೂಲ್‌ನಿಂದ ಡೇಟಾವನ್ನು ನಕಲು ಮಾಡುವಾಗ ಸಮಸ್ಯೆ ಉಂಟಾಗಿದೆ. ಯಾವುದೇ ಡೇಟಾ ಕಂಡುಬಂದಿಲ್ಲ",
"Please Upload the New Property Photo": "ದಯವಿಟ್ಟು ಹೊಸ ಆಸ್ತಿ ಫೋಟೋವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ",
"Please Select the Property Type": "ದಯವಿಟ್ಟು ಆಸ್ತಿ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
"Please ensure all Checkbandhi values are Entered":"ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಚೆಕ್‌ಬಂಧಿ ಮೌಲ್ಯಗಳನ್ನು ನಮೂದಿಸಲಾಗಿದೆಯೇ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ",
"Please ensure all Apartment values are Entered and More than 0":"ಎಲ್ಲಾ ಅಪಾರ್ಟ್ಮೆಂಟ್ ಮೌಲ್ಯಗಳನ್ನು ನಮೂದಿಸಲಾಗಿದೆ ಮತ್ತು 0 ಕ್ಕಿಂತ ಹೆಚ್ಚು ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ",
"copySuccess": "ಬಿಬಿಎಂಪಿ ಪುಸ್ತಕದ ಡೇಟಾ ನಕಲು ಯಶಸ್ವಿಯಾಗಿದೆ.",
"copyFailed": "ಏನೋ ತಪ್ಪಾಗಿದೆ. ಪುಸ್ತಕದ ಡೇಟಾ ನಕಲು ಯಶಸ್ವಿಯಾಗಲಿಲ್ಲ.",
"enterDoorNo": "ದ್ವಾರ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ",
"detailsSavedSuccess": "ವಿವರಗಳು ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ",
"saveAddressFirst": "ಮುಂದಿನ ಹಂತಕ್ಕೆ ಹೋಗುವುದಕ್ಕೆ ಮುಂಚೆ ವಿಳಾಸದ ವಿವರಗಳನ್ನು ಉಳಿಸಿ",
"errorSavingData": "ಡೇಟಾ ಉಳಿಸುವಲ್ಲಿ ದೋಷ",
"provideSasAppNumber": "ದಯವಿಟ್ಟು ಎಸ್‌ಎಎಸ್ ಅಪ್ಲಿಕೇಶನ್ ಸಂಖ್ಯೆಯನ್ನು ಒದಗಿಸಿ",
"errorFetchingSasDetails": "ಎಸ್‌ಎಎಸ್ ವಿವರಗಳನ್ನು ಪ್ರಾಪ್ತಿಪಡಿಸುವಲ್ಲಿ ದೋಷ ಉಂಟಾಗಿದೆ.",
"saveDetailsBeforeNextSection": "ಮುಂದಿನ ವಿಭಾಗಕ್ಕೆ ಹೋಗುವುದಕ್ಕೆ ಮುಂಚೆ ವಿವರಗಳನ್ನು ಉಳಿಸಿ",
"propertyTypeNotFound": "ಆಸ್ತಿಯ ಪ್ರಕಾರ ಕಂಡುಬಂದಿಲ್ಲ",
"selectZone": "ದಯವಿಟ್ಟು ವಲಯ ಆಯ್ಕೆಮಾಡಿ",
"selectWard": "ದಯವಿಟ್ಟು ವಾರ್ಡ್ ಆಯ್ಕೆಮಾಡಿ",
"enterSearchType": "ಸೇರ್ಚ್ ಪ್ರಕಾರ ನಮೂದಿಸಿ",
"enterSearchText": "ಸೇರ್ಚ್ ಪಠ್ಯ ನಮೂದಿಸಿ",
"fileSizeExceeded": "ಫೈಲ್ ಗಾತ್ರವು 5 ಎಂಬಿ ಮಿತಿಯು ಮೀರುತ್ತದೆ",
"selectPdfFileOnly": "ದಯವಿಟ್ಟು '.pdf' ಫೈಲ್ ಮಾತ್ರ ಆಯ್ಕೆಮಾಡಿ",
"selectKathaClaim": "ದಯವಿಟ್ಟು ಕಠಾ ಹಕ್ಕು ಆಯ್ಕೆಮಾಡಿ",
"enterDocumentDetails": "ದಯವಿಟ್ಟು ದಾಖಲೆ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ",
"classificationSavedSuccess": "ವರ್ಗೀಕರಣ ವಿವರಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ",
"saveClassificationBeforeUpload": "ದಾಖಲೆ ಅಪ್ಲೋಡ್ ಮಾಡಲು ಮುಂಚೆ ವರ್ಗೀಕರಣದ ವಿವರಗಳನ್ನು ಉಳಿಸಿ",
"uploadRequiredDocument": "ಆವಶ್ಯಕ ದಾಖಲೆವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ",
"provideRegisteredDate": "ದಯವಿಟ್ಟು ದಾಖಲೆ ನೋಂದಾಯಿತ ದಿನಾಂಕವನ್ನು ಒದಗಿಸಿ",
"registeredDateInvalid": "ದಾಖಲೆ ನೋಂದಾಯಿತ ದಿನಾಂಕವು ಇಂದಿನ ದಿನಾಂಕಕ್ಕಿಂತ ಹೆಚ್ಚು ಇರಬಾರದು",
"documentUploadSuccess": "ದಾಖಲೆ ಯಶಸ್ವಿಯಾಗಿ ಅಪ್ಲೋಡ್ ಮಾಡಲಾಗಿದೆ",
"detailsDeletedSuccess": "ವಿವರಗಳು ಯಶಸ್ವಿಯಾಗಿ ಅಳಿಸಲಾಗಿದೆ",
"errorDeletingData": "ಡೇಟಾ ಅಳಿಸುವಲ್ಲಿ ದೋಷ!",
"enterRegistrationNumber": "ದಯವಿಟ್ಟು ನೋಂದಣಿಯ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
"detailsFetchedSuccess": "ವಿವರಗಳು ಯಶಸ್ವಿಯಾಗಿ ತಂದುಹಾಕಲಾಗಿದೆ",
"enterRegistrationNumberFirst": "ಮೊದಲು ನೋಂದಣಿಯ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
"enterEcDocumentNumber": "ಇಸಿ ದಾಖಲೆಯ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
"registrationNumberNotExist": "ಕೊಟ್ಟಿರುವ ನೋಂದಣಿ ಸಂಖ್ಯೆ ಇಸಿ ವಿವರಗಳೊಂದಿಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ.\nದಯವಿಟ್ಟು ಸರಿಯಾದ ನೋಂದಣಿ ಸಂಖ್ಯೆಯನ್ನು ಒದಗಿಸಿ",
"errorFetchingEcData": "ಇಸಿ ಆಸ್ತಿ ಡೇಟಾವನ್ನು ತಂದುಹಾಕುವಲ್ಲಿ ದೋಷ!",
"otpSentSuccess": "OTP ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ",
"otpVerifiedSuccess": "OTP ಯಶಸ್ವಿಯಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
"ownerDeletedSuccess": "ಮಾಲಿಕನು ಯಶಸ್ವಿಯಾಗಿ ಅಳಿಸಲಾಗಿದೆ",
"retainingOwnersNameMismatch": "ಎಲ್ಲಾ ಉಳಿಸುವ ಮಾಲೀಕರು ಇರುವ ಮಾಲೀಕರ ಹೆಸರಿನೊಂದಿಗೆ ಹೊಂದಿಕೆಯಾಗಬೇಕು.",
"ownersMobileNotVerified": "ಎಲ್ಲಾ ಮಾಲೀಕರು ತಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ಪರಿಶೀಲಿಸಬೇಕು.",
"ownersRelationNameMissing": "ಎಲ್ಲಾ ಮಾಲೀಕರಿಗೆ ಸಂಬಂಧದ ಹೆಸರು ಇರಬೇಕು.",
"ownersRelationTypeMissing": "ಎಲ್ಲಾ ಮಾಲೀಕರಿಗೆ ಸಂಬಂಧದ ಪ್ರಕಾರ ಇರಬೇಕು.",
"atleastOneOwnerRequired": "ಇ-ಕಠಾ ಪರಿಶೀಲನೆಗಾಗಿ ಕನಿಷ್ಠ ಒಬ್ಬ ಮಾಲಿಕರನ್ನು ಸೇರಿಸಬೇಕು",
"verifyOtp": "OTP ಪರಿಶೀಲಿಸಿ!",
"selectRelationshipType": "ದಯವಿಟ್ಟು ಸಂಬಂಧದ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ",
"enterRelationName": "ಸಂಬಂಧದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
"enterValidMobileNumber": "ಮಾನ್ಯವಾದ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
"ownerEditedSuccess": "ಮಾಲಿಕನು ಯಶಸ್ವಿಯಾಗಿ ತಿದ್ದಲಾಗಿದೆ",
"eKycCompleted": "ಇ-ಕೆವೈಸಿ txnno. ಯೊಂದಿಗೆ ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳ್ಳಲಾಗಿದೆ:",
      //yup validations
      
      "doorPlotNumber": "ಬಾಗಿಲು / ಪ್ಲಾಟ್ ಸಂಖ್ಯ ಅಗತ್ಯವಿದೆ",
"doorName": "ಬಾಗಿಲು ಹೆಸರಿನ ಮೌಲ್ಯವು '0' ಇರಬಾರದು",
"buildingLandNameRequired": "ಕಟ್ಟಡ/ಜಮೀನು ಹೆಸರು ಅಗತ್ಯವಿದೆ",
"areaLocalityRequired": "ಪ್ರದೇಶ/ಪಡೆ ಹೆಸರು ಅಗತ್ಯವಿದೆ",
"nearestLandmarkRequired": "ಹತ್ತಿರದ ಸಂಕೆತಸ್ಥಳ ಅಗತ್ಯವಿದೆ",
"pincodeRequired": "ಪಿನ್ ಕೋಡ್ ಅಗತ್ಯವಿದೆ",
"pincodeInvalid": "ಪಿನ್ ಕೋಡ್ 6 ಅಂಕೆಗಳ ಸಂಖ್ಯೆಯಾಗಿರಬೇಕು",
"PropertyTypeInvalid":"ಆಸ್ತಿ ಪ್ರಕಾರದ ಅಗತ್ಯವಿದೆ",
"PropertyTypeCannotBeZero":"ಆಸ್ತಿ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆ ಮಾಡಲಾಗುವುದಿಲ್ಲ",
"sasApplicationNumber": "ಎಸ್‌ಎಎಸ್ ಅಪ್ಲಿಕೇಶನ್ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ",
"sasNumberInvalid": "ಎಸ್‌ಎಎಸ್ ಸಂಖ್ಯೆ '0' ಇರಬಾರದು",
"streetNameRequired": "ರಸ್ತೆಯ ಹೆಸರು ಅಗತ್ಯವಿದೆ",
"streetNameInvalid": "ರಸ್ತೆಯ ಹೆಸರಿನ ಮೌಲ್ಯವು '0' ಇರಬಾರದು",
"latitudeRequired": "ಅಕ್ಷಾಂಶ ಅಗತ್ಯವಿದೆ",
"longitudeRequired": "ರೇಖಾಂಶ ಅಗತ್ಯವಿದೆ",
"latitudeInvalid": "ಅಕ್ಷಾಂಶದ ಮೌಲ್ಯವು '0' ಇರಬಾರದು",
"longitudeInvalid": "ರೇಖಾಂಶದ ಮೌಲ್ಯವು '0' ಇರಬಾರದು",
"buildingNumberRequired": "ಕಟ್ಟಡ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ",
"buildingNameRequired": "ಕಟ್ಟಡದ ಹೆಸರು ಅಗತ್ಯವಿದೆ",
"floorNumberRequired": "ಮಹಡಿ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ",
"usageCategoryRequired": "ಬಳಕೆ ವಿಭಾಗ ಅಗತ್ಯವಿದೆ",
"UsageCategoryInvalid":"ಬಳಕೆಯ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆ ಮಾಡಲಾಗುವುದಿಲ್ಲ",
"typeOfUseRequiredInvalid":"ಬಳಕೆ ಪ್ರಕಾರ (ಉಪವಿಭಾಗ) ಆಯ್ಕೆ ಮಾಡಲಾಗುವುದಿಲ್ಲ",
"yearUsageRequiredInvalid": "ವರ್ಷದ ಬಳಕೆಯು 4-ಅಂಕಿಯ ಸಂಖ್ಯೆಯಾಗಿರಬೇಕು",
"yearUsageRequired": "ಬಳಕೆ ವರ್ಷದ ಅಗತ್ಯವಿದೆ",
"typeOfUseRequired": "ಬಳಕೆ ಪ್ರಕಾರ (ಉಪವಿಭಾಗ) ಅಗತ್ಯವಿದೆ",
"selfUseAreaRequired": "ಸ್ವಯಂ ಬಳಕೆ ಪ್ರದೇಶ ಅಗತ್ಯವಿದೆ",
"rentedAreaRequired": "ಭಾಡೆಗೆ ನೀಡಿದ ಪ್ರದೇಶ ಅಗತ್ಯವಿದೆ",
"documentTypeRequired": "ದಾಖಲೆ ಪ್ರಕಾರ ಅಗತ್ಯವಿದೆ",
"documentNumberRequired": "ದಾಖಲೆ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ",
"blockNumberRequired": "ಬ್ಲಾಕ್ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ",
"flatNumberRequired": "ಫ್ಲ್ಯಾಟ್ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ",
"occupancyRequired": "ಆಕ್ಯುಪೆನ್ಸಿ ಅಗತ್ಯವಿದೆ",
"ownerShareAreaRequired": "ಮಾಲಿಕರ ಹಂಚಿಕೆ ಪ್ರದೇಶ ಅಗತ್ಯವಿದೆ",
"ownerShareTypeRequired": "ಮಾಲಿಕರ ಹಂಚಿಕೆ ಪ್ರಕಾರ ಅಗತ್ಯವಿದೆ",
//disclamer
"disclamerMessage1":"ಒದಗಿಸಿದ ವಿವರಗಳು ಸರಿಯಾಗಿವೆ ಮತ್ತು ನೀವು ಅರ್ಜಿಯನ್ನು ಸಲ್ಲಿಸಲು ಬಯಸುವಿರಾ?",
"disclamerMessage2":"ಕೋರ್ ವಾರ್ಡ್‌ಗಳ ಸಂದರ್ಭದಲ್ಲಿ [ದಕ್ಷಿಣ, ಪೂರ್ವ + ಪಶ್ಚಿಮ ವಲಯಗಳು], ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಮಾಲೀಕರ ಅಪ್‌ಟುಡೇಟ್ ಮಾಹಿತಿಯನ್ನು ಅವರ ಆಧಾರ್ ಇತ್ಯಾದಿಗಳೊಂದಿಗೆ ಸಲ್ಲಿಸಿದ ನಂತರ ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಎ-ಕಥಾ ಆಸ್ತಿಗಳನ್ನು ಎ-ಕಥಾ ನೀಡಲಾಗುತ್ತದೆ.",
"disclamerMessage3":"ಯಾವುದೇ ಹೆಚ್ಚುವರಿ ಮಾಲೀಕರು ಅಥವಾ ಹೆಸರು ಇತ್ಯಾದಿ ಬದಲಾವಣೆಯ ಸಂದರ್ಭದಲ್ಲಿ, ನೋಂದಾಯಿತ ಪತ್ರ ಅಥವಾ ಇತರ ಪೋಷಕ ದಾಖಲೆಗಳು ಕಡ್ಡಾಯವಾಗಿರುತ್ತವೆ.",
"disclamerMessage4":"BBMP ಯೊಂದಿಗೆ ವಿಲೀನಗೊಂಡ ಹಳೆಯ ULB ಗಳಿಗೆ MAR 19 ಆಸ್ತಿಗಳ ಸಂದರ್ಭದಲ್ಲಿ, A-ಕಥಾ ಅನುಮೋದನೆಗಾಗಿ ಸಂಬಂಧಿತ MAR 19 ರಿಜಿಸ್ಟರ್ ಸ್ಕ್ಯಾನ್ ಅನ್ನು ಉಲ್ಲೇಖಿಸಬೇಕು.",
"disclamerMessage5":"ಹಳೆಯ GP ಆಸ್ತಿಗಳಿದ್ದಲ್ಲಿ ಫಾರ್ಮ್ 9 ರ ಎಸ್ವಾತು ನೋಂದಣಿ ಅಥವಾ ಜಿಪಿಯ ರಿಜಿಸ್ಟರ್‌ನ ಮೂಲ ಫಾರ್ಮ್ 9 ಸ್ಕ್ಯಾನ್ ಎ-ಕಥಾಗೆ ಕಡ್ಡಾಯವಾಗಿದೆ.",
"disclamerMessage6":"ಇತರ ಪ್ರತಿಯೊಂದು ಪ್ರಕರಣದಲ್ಲಿ, KTCP ಕಾಯಿದೆ 1961 ರ ಮೂಲಕ ಇತರ ಅನುಮೋದನೆಗಳ ಪರಿವರ್ತನೆಯೊಂದಿಗೆ ಸರ್ಕಾರಿ ಪ್ರಾಧಿಕಾರದ ಏಜೆನ್ಸಿಯಿಂದ ನೋಂದಾಯಿತ ಪತ್ರ ಅಥವಾ ಹಂಚಿಕೆ ಎ-ಕಥಾಗೆ ಕಡ್ಡಾಯವಾಗಿದೆ.",
"disclamerMessage7":"ಸರ್ಕಾರಿ ಜಮೀನು/ರಾಜಕಾಲುವೆ/ಕೆರೆ/ಇತ್ಯಾದಿಗಳ ಮೇಲಿನ ಆಸ್ತಿಗಳು ಸಾಮಾನ್ಯವಾಗಿ ಅಂತಿಮ ಏಕತಾ ಪಡೆಯುವುದಿಲ್ಲ.",
"disclamerMessage8":"ನಾನು ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ",
"disclamerMessage9":"ಸಲ್ಲಿಸಿ",
"disclamerMessage10":"ರದ್ದುಮಾಡು",
"disclamer":"ಹಕ್ಕು ನಿರಾಕರಣೆ",



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
