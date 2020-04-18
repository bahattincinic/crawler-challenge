import React from 'react';
import PropTypes from "prop-types";
import { Form } from 'semantic-ui-react'

const CompareForm = ({ products, onSubmit }) => {
  const options = products.map((item, idx) => {
    return {
      key: idx, text: item.name, value: item.id
    }
  });

  return (
    <Form>
      <Form.Select
        fluid
        label='From'
        options={options}
        placeholder='From'
      />
      <Form.Select
        fluid
        label='To'
        options={options}
        placeholder='To'
      />
      <Form.Button>Get Similarity</Form.Button>
    </Form>
  )
};

CompareForm.propTypes = {
  products: PropTypes.array,
  onSubmit: PropTypes.func
};

export default CompareForm;
