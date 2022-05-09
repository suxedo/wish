import React, { useEffect, useState } from "react";
import DropdownOptions from "./DropdownOptions";
import "./NewAddress.css";
import { motion } from "framer-motion";
import { Country, State, City } from "country-state-city";
import { useForm } from "react-hook-form";
import CustomInput from "./components/CustomInput";
import { Auth, DataStore, Hub } from "aws-amplify";
import { Order } from "./models";
import CustomButton from "./components/CustomButton";
import { generatePath, useNavigate } from "react-router-dom";
function NewAddress({ cancelAddressDropdown, editAddressId, oldAddress , setOpenOldAdd}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(["NIGERIA", "USA"]);
  const [selectedOption, setSelectedOption] = useState("");
  const [firstname, setFirstname] = useState("");
  const [existAddress, setExistAddress] = useState(null);

  const [lastname, setLastname] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      firstname: selectedOption[0]?.firstname,
      lastname: selectedOption[0]?.lastname,
      addressline1: selectedOption[0]?.addressline1,
      addressline2: selectedOption[0]?.addressline2,
      country: selectedOption[0]?.country,
      state: selectedOption[0]?.state,
      city: selectedOption[0]?.city,
      zip: selectedOption[0]?.zip,
      phonenumber: selectedOption[0]?.phonenumber,
    },
  });

  const navigate = useNavigate();
 

  useEffect(() => {
    const getCurrentAddress = async () => {
      try {
        const dbCurrentAddress = await DataStore.query(Order, (u) =>
          u.id("eq", editAddressId)
        );
        if (!dbCurrentAddress || !editAddressId) {
          return;
          
        }

        setSelectedOption(dbCurrentAddress);
      } catch (error) {
        console.log(error);
      }
    };

   
      getCurrentAddress();
      
 

   
  }, [editAddressId]);
  useEffect(() => {
    if (selectedOption) {
      reset({
        firstname: selectedOption[0].firstname,
        lastname: selectedOption[0].lastname,
        addressline1: selectedOption[0].addressline1,
        addressline2: selectedOption[0].addressline2,
        country: selectedOption[0].country,
        state: selectedOption[0].state,
        city: selectedOption[0].city,
        zip: selectedOption[0].zip,
        phonenumber: selectedOption[0].phonenumber,
      });
    }
  }, [selectedOption]);

  useEffect(() => {
    const listener = Hub.listen('datastore', async hubData=>{
      const {event,data} = hubData.payload;
      if (event === 'modelSynced' && data?.model?.name === 'Order') {
        console.log('Order Model has finishwd syncing');
        
      } 
    })
    return() => listener()
   
  }, [])
  useEffect(() => {
  const subscription = DataStore.observe(Order).subscribe(msg =>{
    if (msg.model === 'Order' && msg.opType === 'Update') {
      const newData = msg.element
      console.log(newData);
      
    }
    console.log('ffffffffff');
    console.log(msg.model, msg.opType, msg.element);
  })
    return() => subscription.unsubscribe()
   
  }, [])

  const fetchExist= async () => {
    const userData = await Auth.currentAuthenticatedUser();
    console.log(userData);
    // if address exists already
    DataStore.query(Order, (cp) =>
      cp.userSub("eq", userData.attributes.sub)
    ).then(setExistAddress);
  };
  
  useEffect(() => {
    fetchExist();
  }, []);
  

  const onSavePressed = async (data) => {
    const {
      firstname,
      lastname,
      phonenumber,
      addressline1,
      addressline2,
      city,
      zip,
      state,
    } = data;
    try {
     if (editAddressId) {
       const original = await DataStore.query(Order, editAddressId);
       const updatedOrder = Order.copyOf(original, updated=>{
         updated.firstname= firstname;
         updated.lastname= lastname;
         updated.addressline1= addressline1;
         updated.addressline2= addressline2;
         updated.city=city;
         updated.phonenumber=phonenumber;
         updated.zip=zip;
         updated.state=state;
         updated.check=true
       });
       await DataStore.save(updatedOrder)
     } else {
       if (existAddress.length === 0) {
        const userData = await Auth.currentAuthenticatedUser();
        // create a new order
        DataStore.save(
          new Order({
            userSub: userData.attributes.sub,
            firstname: firstname,
            lastname: lastname,
            phonenumber: phonenumber,
            country: country,
            city: city,
            state: state,
            addressline1: addressline1,
            addressline2: addressline2,
            zip: zip,
            check:true
          })
        );
       

         
       }
       else{
         if (existAddress.length >= 1) {
          const userData = await Auth.currentAuthenticatedUser();
          // create a new order
          DataStore.save(
            new Order({
              userSub: userData.attributes.sub,
              firstname: firstname,
              lastname: lastname,
              phonenumber: phonenumber,
              country: country,
              city: city,
              state: state,
              addressline1: addressline1,
              addressline2: addressline2,
              zip: zip,
              check:false
            })
          );
           
         }
       
        
       }

    
     
      console.log("saved");
      reset({ ...data });
       
     }
     
    } catch (error) {
      console.log(error);
    }
   
   cancelAddressDropdown()
  };

  const openDropdown = (e) => {
    if (open === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  const cancelPaymentDropdown = (e) => {
    setOpen(false);
  };
  const onOptionClicked = (value) => () => {
    setCountry(value);
    setOpen(false);
  };
  return (
    <>
      <motion.div
        key="content"
        initial="collapsed"
        animate="open"
        exit="collapsed"
        variants={{
          open: { opacity: 1, height: "auto" },
          collapsed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
        className="newaddress"
      >
        <div className="newaddress__WrapperForm">
          <div className="newaddress__WrapperFormText">New Address</div>
          <div className="newaddress__WrapperFormElement">
            <div className="newaddress__WrapperFormElementRowEntry">
              <div className="newaddress__WrapperFormTextInputWrapper">
                <div className="newaddress__WrapperFormTextInputText">
                  First Name*
                </div>
                <CustomInput
                  name="firstname"
                 
                  control={control}
                  rules={{
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name should be at least 3 characters long",
                    },
                    maxLength: {
                      value: 24,
                      message: "Name should be max 24 characters long",
                    },
                  }}
                />
              </div>
              <div className="newaddress__WrapperFormTextInputWrapper">
                <div className="newaddress__WrapperFormTextInputText">
                  Last Name*
                </div>
                <CustomInput
                  name="lastname"
                  control={control}
                  rules={{
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name should be at least 3 characters long",
                    },
                    maxLength: {
                      value: 24,
                      message: "Name should be max 24 characters long",
                    },
                  }}
                />
              </div>
            </div>

            <div className="newaddress__WrapperFormElementRowEntry">
              <div className="newaddress__WrapperFormTextInputWrapper">
                <div className="newaddress__WrapperFormTextInputText">
                  Address Line 1*
                </div>
                <CustomInput
                  name="addressline1"
                  control={control}
                  rules={{
                    required: "Address is required",
                    minLength: {
                      value: 5,
                      message: "Address should be at least 3 characters long",
                    },
                    maxLength: {
                      value: 50,
                      message: "Address should be max 24 characters long",
                    },
                  }}
                />
              </div>
            </div>
            <div className="newaddress__WrapperFormElementRowEntry">
              <div className="newaddress__WrapperFormTextInputWrapper">
                <div className="newaddress__WrapperFormTextInputText">
                  Address Line 2*
                </div>
                <CustomInput name="addressline2" control={control} />
              </div>
            </div>
            <div className="newaddress__WrapperFormElementRowEntry">
              <div className="newaddress__WrapperFormTextInputWrapper">
                <div className="newaddress__WrapperFormTextInputText">
                  Country / Region*
                </div>
                <DropdownOptions
                  options={options}
                  open={open}
                  selectedOption={country}
                  onOptionClicked={onOptionClicked}
                  openDropdown={openDropdown}
                />
              </div>
              <div className="newaddress__WrapperFormTextInputWrapper">
                <div className="newaddress__WrapperFormTextInputText">
                  State/Province/Region
                </div>
                <div className="newaddress__WrapperFormInputWrapper">
                  <CustomInput
                    name="state"
                    control={control}
                    rules={{
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "Name should be at least 3 characters long",
                      },
                      maxLength: {
                        value: 24,
                        message: "Name should be max 24 characters long",
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="newaddress__WrapperFormElementRowEntry">
              <div className="newaddress__WrapperFormTextInputWrapper">
                <div className="newaddress__WrapperFormTextInputText">
                  City*
                </div>
                <CustomInput
                  name="city"
                  control={control}
                  rules={{
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name should be at least 3 characters long",
                    },
                    maxLength: {
                      value: 24,
                      message: "Name should be max 24 characters long",
                    },
                  }}
                />
              </div>
              <div className="newaddress__WrapperFormTextInputWrapper">
                <div className="newaddress__WrapperFormTextInputText">
                  Zip/Postal Code*
                </div>
                <CustomInput
                  name="zip"
                  control={control}
                  rules={{
                    required: "Name is required",
                    minLength: {
                      value: 3,

                      message: "Name should be at least 3 characters long",
                    },
                    maxLength: {
                      value: 24,
                      message: "Name should be max 24 characters long",
                    },
                  }}
                />
              </div>
            </div>
            <div className="newaddress__WrapperFormElementRowEntry">
              <div className="newaddress__WrapperFormTextInputWrapper">
                <div className="newaddress__WrapperFormTextInputText">
                  Phone Number*
                </div>
                <CustomInput
                  name="phonenumber"
                  control={control}
                  rules={{
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name should be at least 3 characters long",
                    },
                    maxLength: {
                      value: 24,
                      message: "Name should be max 24 characters long",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="newaddress__WrapperBtn">
          <div className="newaddress__Wrapper">
            <div onClick={cancelAddressDropdown} className="newaddress__Btn1">
              Cancel
            </div>
           
            <CustomButton
              text="Save Address"
              onPress={handleSubmit(onSavePressed)}
            />
           
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default NewAddress;
