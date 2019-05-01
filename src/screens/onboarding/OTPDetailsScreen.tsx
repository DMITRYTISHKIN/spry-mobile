import React, { Component } from "react";
import { Formik } from "formik";
import { ScrollView } from 'react-native';
// constants
import { CARD_DETAILS } from "./OnboardingConstants";
// components
import { Container, Wrapper } from "src/components/Layout";
import { H1, Text } from "src/components/Typography";
import Button from "src/components/Button";
import { FormWrapper } from "src/components/Form";
import TextInput from "src/components/TextInput";

// schema
import { OTPDetailsSchema } from "./OnboardingValidationSchemas";

export default class PhoneDetailsScreen extends Component<any, any> {
  handleSubmit = values => {
    this.props.navigation.navigate(CARD_DETAILS);
  };

  handleChange = values => {
    debugger
  }

  render() {
    return (
      <ScrollView>
        <Container>
          <Wrapper>
            <H1 style={{textAlign: 'center'}}>Enter 5 digit password you received via SMS</H1>
            <Formik
              initialValues={{ otp: "" }}
              onSubmit={this.handleSubmit}
              // validationSchema={OTPDetailsSchema}
            >
              {({ handleChange, handleSubmit, values, errors }) => (
                <FormWrapper>
                  <TextInput
                    style={{textAlign: 'center'}}
                    error={errors.otp}
                    onChangeText={handleChange("otp")}
                    value={values.otp}
                    placeholder=""
                    keyboardType="number-pad"
                    autoFocus
                  />
                  <Button style={{backgroundColor: 'transparent'}} onPress={handleSubmit}>
                    <Text style={{color: '#007AFF'}}>Next</Text>
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
