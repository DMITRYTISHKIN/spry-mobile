import React, { Component } from "react";
import { Formik } from "formik";
import { ScrollView } from 'react-native';
// constants
import { OTP_DETAILS } from "./OnboardingConstants";

// components
import { Container, Wrapper } from "src/components/Layout";
import { H1, Text } from "src/components/Typography";
import Button from "src/components/Button";
import { FormWrapper } from "src/components/Form";
import TextInput from "src/components/TextInput";
// schema
import { PhoneDetailsSchema } from "./OnboardingValidationSchemas";

export default class PhoneDetailsScreen extends Component<any, any> {
  handleSubmit = values => {
    this.props.navigation.navigate(OTP_DETAILS);
  };

  render() {
    return (
      <ScrollView>
        <Container>
          <Wrapper>
            <H1 style={{textAlign: 'center'}}>Enter your mobile phone number</H1>
            <Formik
              initialValues={{ phoneNumber: "" }}
              onSubmit={this.handleSubmit}
              // validationSchema={PhoneDetailsSchema}
            >
              {({ handleChange, handleSubmit, values, errors }) => (
                <FormWrapper>
                  <TextInput
                    style={{textAlign: 'center'}}
                    error={errors.phoneNumber}
                    onChangeText={handleChange("phoneNumber")}
                    value={values.phoneNumber}
                    placeholder="+44 7177 7773"
                    keyboardType="phone-pad"
                    autoFocus
                  />
                  <Button style={{backgroundColor: 'transparent'}} onPress={handleSubmit}>
                    <Text style={{color: '#007AFF'}}>Get password</Text>
                  </Button>
                </FormWrapper>
              )}
            </Formik>
          </Wrapper>
        </Container>
      </ScrollView>
    );
  }
}
