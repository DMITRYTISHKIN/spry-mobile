import React, { Component } from "react";
import styled from "styled-components/native";
import { Formik } from "formik";
import { ScrollView, View } from 'react-native';

// constants
import { APP_FLOW } from "src/screens/main/MainConstants";

// components
import { Container, Wrapper } from "src/components/Layout";
import { H1, Text } from "src/components/Typography";
import Button from "src/components/Button";
import { FormWrapper } from "src/components/Form";
import TextInput from "src/components/TextInput";

// schema
import { CardDetailsSchema } from "./OnboardingValidationSchemas";

const InputWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

const initialCardValues = { cardCVV: "", cardExpiry: "", cardNumber: "" };

export default class PhoneDetailsScreen extends Component<any, any> {
  handleSubmit = values => {
    this.props.navigation.navigate(APP_FLOW);
  };

  render() {
    return (
      <ScrollView>
        <Container>
          <Wrapper>
            <H1>Enter please your credit card details</H1>
            <Formik
              initialValues={initialCardValues}
              onSubmit={this.handleSubmit}
              // validationSchema={CardDetailsSchema}
            >
              {({ handleChange, handleSubmit, values, errors }) => (
                <FormWrapper>
                  <InputWrapper>
                    <TextInput
                      error={errors.cardNumber}
                      onChangeText={handleChange("cardNumber")}
                      value={values.cardNumber}
                      keyboardType="number-pad"
                      label="Card details"
                      multi
                      stackedLabel
                    />
                    <View style={{display: 'flex', flexDirection: 'row', alignContent: 'space-around', flexWrap: 'wrap'}}>
                      <TextInput
                        styleHolder={{width: '60%'}}
                        error={errors.cardExpiry}
                        onChangeText={handleChange("cardExpiry")}
                        value={values.cardExpiry}
                        label="Card expiry date"
                        keyboardType="number-pad"
                        stackedLabel
                      />
                      <TextInput
                        styleHolder={{width: '35%'}}
                        error={errors.cardExpiry}
                        onChangeText={handleChange("cardCVV")}
                        value={values.cardCVV}
                        label="CVV"
                        keyboardType="number-pad"
                        stackedLabel
                      />
                    </View>
                  </InputWrapper>
                  <Button onPress={handleSubmit} style={{backgroundColor: 'transparent'}}>
                    <Text style={{color: '#007AFF'}}> Next </Text>
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
